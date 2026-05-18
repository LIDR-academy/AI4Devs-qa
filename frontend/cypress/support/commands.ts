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

// Declaramos los tipos primero
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Comando personalizado para simular drag and drop en react-beautiful-dnd
       * @example cy.dragAndDrop('.source-element', '.target-element')
       */
      dragAndDrop(sourceSelector: string, targetSelector: string): Chainable<Element>
    }
  }
}

// Comando personalizado para simular drag and drop para react-beautiful-dnd
Cypress.Commands.add('dragAndDrop', (sourceSelector, targetSelector) => {
  // Obtenemos el elemento de origen
  cy.get(sourceSelector).then($source => {
    const source = $source[0];
    const sourceRect = source.getBoundingClientRect();
    
    // Obtenemos el elemento de destino
    cy.get(targetSelector).then($target => {
      const target = $target[0];
      const targetRect = target.getBoundingClientRect();
      
      // Simular eventos para el drag and drop
      cy.wrap(source)
        .trigger('mousedown', { 
          button: 0,
          clientX: sourceRect.left + 10,
          clientY: sourceRect.top + 10,
          force: true
        })
        .trigger('mousemove', {
          button: 0,
          clientX: sourceRect.left + 10,
          clientY: sourceRect.top + 20,
          force: true
        });
        
      cy.wrap(target)
        .trigger('mousemove', {
          button: 0, 
          clientX: targetRect.left + 10,
          clientY: targetRect.top + 10,
          force: true
        })
        .trigger('mouseup', {
          force: true
        });
    });
  });
});