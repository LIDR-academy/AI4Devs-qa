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

// Comando personalizado para cargar la página de posición y esperar las respuestas de API
Cypress.Commands.add('loadPositionDetails', (positionId: string) => {
  // Aquí dentro sí puedes usar comandos cy.*
  cy.intercept('GET', `http://localhost:3010/positions/${positionId}/interviewFlow`).as('getInterviewFlow');
  cy.intercept('GET', `http://localhost:3010/positions/${positionId}/candidates`).as('getCandidates');
  
  cy.visit(`/positions/${positionId}`);
  
  cy.wait(['@getInterviewFlow', '@getCandidates']);
});

// Comando personalizado para verificar elementos drag and drop de react-beautiful-dnd
Cypress.Commands.add('verifyDragAndDropElements', () => {
  // Aquí dentro sí puedes usar comandos cy.*
  cy.get('[data-rbd-droppable-id]').should('exist');
  cy.get('[data-rbd-draggable-id]').then($elements => {
    if ($elements.length > 0) {
      cy.wrap($elements).should('have.attr', 'data-rbd-draggable-context-id');
    }
  });
});

// Tipo para TypeScript
declare global {
  namespace Cypress {
    interface Chainable {
      loadPositionDetails(positionId: string): Chainable<void>
      verifyDragAndDropElements(): Chainable<void>
    }
  }
}