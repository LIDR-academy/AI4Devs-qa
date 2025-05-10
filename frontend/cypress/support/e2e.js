// Import commands.js using ES2015 syntax:
import '@testing-library/cypress/add-commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Hide fetch/XHR requests from command log
const app = window.top;
if (app) {
  app.document.addEventListener('DOMContentLoaded', () => {
    const style = app.document.createElement('style');
    style.innerHTML = '.command-name-request, .command-name-xhr { display: none }';
    app.document.head.appendChild(style);
  });
}

// Add custom commands here
Cypress.Commands.add('dragAndDrop', (subject, target) => {
  cy.wrap(subject)
    .trigger('dragstart')
    .trigger('drag');
  
  cy.wrap(target)
    .trigger('dragover')
    .trigger('drop');
  
  cy.wrap(subject)
    .trigger('dragend');
}); 