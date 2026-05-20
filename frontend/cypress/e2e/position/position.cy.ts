/// <reference types="cypress" />
/// <reference types="chai" />
/// <reference types="mocha" />

import { expect } from 'chai';
import { mockResponses } from '../../support/utils/api';

describe('Position Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/positions/1', mockResponses.positions.success).as('getPosition');
    cy.intercept('GET', '/positions/1/candidates', mockResponses.candidates.success).as('getCandidates');
    cy.intercept('GET', '/positions/1/interviewflow', mockResponses.interviewFlow.success).as('getInterviewFlow');
    cy.visit('/positions/1');
    cy.wait(['@getPosition', '@getCandidates', '@getInterviewFlow']);
  });

  describe('Carga de la Página', () => {
    it('debería mostrar el título de la posición correctamente', () => {
      cy.get('h2').should('contain', mockResponses.positions.success.title);
    });

    it('debería mostrar las columnas de las fases del proceso', () => {
      mockResponses.interviewFlow.success.forEach((stage, index) => {
        cy.get(`[data-testid="stage-column-${index}"]`).should('contain', stage.name);
      });
    });

    it('debería mostrar las tarjetas de candidatos en las columnas correctas', () => {
      mockResponses.candidates.success.forEach((candidate) => {
        cy.get(`[data-testid="candidate-card-${candidate.id}"]`).should('contain', candidate.name);
      });
    });
  });

  describe('Cambio de Fase de Candidatos', () => {
    beforeEach(() => {
      // Interceptar la llamada PUT para actualizar la fase
      cy.intercept('PUT', '/candidates/1', {
        statusCode: 200,
        body: {
          message: 'Fase actualizada correctamente',
          data: {
            ...mockResponses.candidates.success[0],
            currentPhase: 2
          }
        }
      }).as('updatePhase');
    });

    it('debería actualizar la fase del candidato en el backend', () => {
      cy.request({
        method: 'PUT',
        url: '/candidates/1',
        body: {
          applicationId: 1,
          currentInterviewStep: 2
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.equal('Fase actualizada correctamente');
      });
    });

    it('debería manejar errores en la actualización de fase', () => {
      // Interceptar la llamada PUT con un error
      cy.intercept('PUT', '/candidates/1', {
        statusCode: 500,
        body: {
          message: 'Error al actualizar la fase'
        }
      }).as('updatePhaseError');

      cy.request({
        method: 'PUT',
        url: '/candidates/1',
        body: {
          applicationId: 1,
          currentInterviewStep: 2
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(500);
        expect(response.body.message).to.equal('Error al actualizar la fase');
      });
    });
  });
}); 