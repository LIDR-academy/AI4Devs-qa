/// <reference types="cypress" />

Cypress.Commands.add('dragCard', { prevSubject: 'element' }, (subject, targetSelector) => {
  const dataTransfer = new DataTransfer();
  
  cy.wrap(subject)
    .trigger('mousedown', { which: 1 })
    .trigger('dragstart', { dataTransfer })
    .trigger('drag', { dataTransfer });

  cy.get(targetSelector)
    .trigger('dragenter', { dataTransfer })
    .trigger('dragover', { dataTransfer })
    .trigger('drop', { dataTransfer })
    .trigger('dragend', { dataTransfer })
    .trigger('mouseup', { which: 1 });
});

declare global {
  namespace Cypress {
    interface Chainable {
      dragCard(targetSelector: string): Chainable<Element>
    }
  }
} 