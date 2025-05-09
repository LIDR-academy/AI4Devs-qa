// ***********************************************
// This example commands.js shows you how to
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
// Comando personalizado para arrastrar una tarjeta
Cypress.Commands.add('dragCard', { prevSubject: 'element' }, (subject, targetSelector) => {
  const target = cy.get(targetSelector);
  
  cy.wrap(subject)
    .trigger('mousedown', { which: 1 })
    .trigger('mousemove', { clientX: 500, clientY: 300 })
    .trigger('mouseup');

  return cy.wrap(subject);
});

declare global {
  namespace Cypress {
    interface Chainable {
      dragCard(targetSelector: string): Chainable<Element>
    }
  }
} 