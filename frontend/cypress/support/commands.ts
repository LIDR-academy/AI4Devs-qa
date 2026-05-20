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

// Comando personalizado para simular drag and drop
Cypress.Commands.add('dragAndDrop', (sourceSelector, targetSelector) => {
  // Get the source element
  cy.get(sourceSelector).first().then($source => {
    const sourcePosition = $source[0].getBoundingClientRect();
    const sourceX = sourcePosition.left + sourcePosition.width / 2;
    const sourceY = sourcePosition.top + sourcePosition.height / 2;

    // Get the target element
    cy.get(targetSelector).first().then($target => {
      const targetPosition = $target[0].getBoundingClientRect();
      const targetX = targetPosition.left + targetPosition.width / 2;
      const targetY = targetPosition.top + targetPosition.height / 2;

      // Simulate mousedown event on source
      cy.get(sourceSelector).first()
        .trigger('mousedown', { which: 1, button: 0, clientX: sourceX, clientY: sourceY, force: true })
        .trigger('mousemove', { which: 1, button: 0, clientX: sourceX + 10, clientY: sourceY + 10, force: true })
        .wait(500); // Give time for the drag to be recognized

      // Simulate mouse movement to the target
      cy.get('body')
        .trigger('mousemove', { which: 1, button: 0, clientX: targetX, clientY: targetY, force: true })
        .wait(500);

      // Simulate mouseup event on target
      cy.get(targetSelector).first()
        .trigger('mouseup', { which: 1, button: 0, clientX: targetX, clientY: targetY, force: true });
    });
  });
});

declare global {
  namespace Cypress {
    interface Chainable {
      dragAndDrop(sourceSelector: string, targetSelector: string): Chainable<Element>
    }
  }
}