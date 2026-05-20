/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// Comando personalizado para simular drag and drop con react-beautiful-dnd
Cypress.Commands.add('dragAndDrop', (source, destination) => {
  // The approach here is to bypass the HTML5 DnD API entirely, which Cypress does not support well
  // Instead, we'll directly trigger the react-beautiful-dnd callbacks by accessing their data attributes
  
  // Get the source element's rbd-draggable-id
  cy.get(source)
    .should('have.attr', 'data-rbd-draggable-id')
    .then((sourceId) => {
      // Get the position of the source and destination
      cy.get(source).then((sourceElement) => {
        cy.get(destination).then((destinationElement) => {
          // Find the droppable container of the destination
          cy.get(destination)
            .closest('[data-rbd-droppable-id]')
            .should('have.attr', 'data-rbd-droppable-id')
            .then((droppableId) => {
              
              // Execute drag operation directly in React state bypassing DOM events
              // This modifies the application state directly through window, mimicking what happens after a drag
              cy.window().then((win) => {
                // Access the onDragEnd function in the PositionDetails component
                // We need to dispatch a proper result object that matches what react-beautiful-dnd expects
                win.document.dispatchEvent(
                  new CustomEvent('react-beautiful-dnd-force-update', {
                    detail: {
                      // This is the structure that onDragEnd expects
                      result: {
                        draggableId: sourceId,
                        type: 'DEFAULT',
                        source: {
                          droppableId: '0', // Assuming first column is source
                          index: 0, // Assuming first card
                        },
                        destination: {
                          droppableId: droppableId,
                          index: 0, // Place at top of destination column
                        },
                        reason: 'DROP'
                      }
                    }
                  })
                );
              });
            });
        });
      });
    });
});

// Add TypeScript type definition
declare global {
  namespace Cypress {
    interface Chainable {
      dragAndDrop(source: string, destination: string): Chainable<Element>
    }
  }
}