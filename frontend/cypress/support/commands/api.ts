/// <reference types="cypress" />

Cypress.Commands.add('updateCandidatePhase', (candidateId: number, applicationId: number, newPhase: number) => {
  return cy.request({
    method: 'PUT',
    url: `/candidates/${candidateId}`,
    body: {
      applicationId,
      currentInterviewStep: newPhase
    }
  });
});

declare global {
  namespace Cypress {
    interface Chainable {
      updateCandidatePhase(candidateId: number, applicationId: number, newPhase: number): Chainable<Cypress.Response<any>>
    }
  }
} 