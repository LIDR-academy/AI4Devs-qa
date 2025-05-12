// position.cy.js
// Archivo de pruebas E2E para la interfaz de posiciones

/// <reference types="cypress" />

// Solución para errores de lint
/* global cy, describe, it, beforeEach, expect */

describe('Position Interface Tests', () => {
  beforeEach(() => {
    // Visitar la página de posiciones
    cy.visit('/position/1'); // Asumimos que existe una posición con ID 1
    
    // Interceptar la petición para obtener las posiciones
    cy.intercept('GET', 'http://localhost:3010/positions/*/interviewFlow', {
      statusCode: 200,
      body: {
        interviewFlow: {
          positionName: 'Desarrollador Frontend',
          interviewFlow: {
            interviewSteps: [
              { id: 1, name: 'Aplicación' },
              { id: 2, name: 'Entrevista Técnica' },
              { id: 3, name: 'Entrevista RRHH' },
              { id: 4, name: 'Oferta' }
            ]
          }
        }
      }
    }).as('getInterviewFlow');

    // Interceptar la petición para obtener los candidatos
    cy.intercept('GET', 'http://localhost:3010/positions/*/candidates', {
      statusCode: 200,
      body: [
        {
          candidateId: 1,
          fullName: 'Juan Pérez',
          averageScore: 3,
          currentInterviewStep: 'Aplicación',
          applicationId: 101
        },
        {
          candidateId: 2,
          fullName: 'María García',
          averageScore: 4,
          currentInterviewStep: 'Entrevista Técnica',
          applicationId: 102
        },
        {
          candidateId: 3,
          fullName: 'Carlos López',
          averageScore: 2,
          currentInterviewStep: 'Entrevista RRHH',
          applicationId: 103
        }
      ]
    }).as('getCandidates');
    
    // Esperar a que se completen las peticiones antes de continuar
    cy.wait(['@getInterviewFlow', '@getCandidates']);
  });

  it('should load the position page correctly', () => {
    // Verificar que el título de la posición se muestre correctamente
    cy.contains('h2', 'Desarrollador Frontend').should('be.visible');
    
    // Verificar que las columnas correspondientes a las fases estén presentes
    cy.get('.card-header').should('have.length.at.least', 3);
    cy.contains('.card-header', 'Aplicación').should('be.visible');
    cy.contains('.card-header', 'Entrevista Técnica').should('be.visible');
    cy.contains('.card-header', 'Entrevista RRHH').should('be.visible');
    cy.contains('.card-header', 'Oferta').should('be.visible');
    
    // Verificar que los candidatos aparezcan en la fase correcta
    cy.contains('.card-title', 'Juan Pérez').should('be.visible');
    cy.contains('.card-title', 'María García').should('be.visible');
    cy.contains('.card-title', 'Carlos López').should('be.visible');
  });

  it('should drag and drop a candidate card between stages', () => {
    // Identificar el candidato que queremos mover
    cy.contains('.card-title', 'Juan Pérez')
      .parents('.card')
      .as('juanCard');
    
    // Identificar la columna destino
    cy.contains('.card-header', 'Entrevista Técnica')
      .parents('.card')
      .find('.card-body')
      .as('targetColumn');
    
    // Preparar intercepción para la petición PUT
    cy.intercept('PUT', 'http://localhost:3010/candidates/*', {
      statusCode: 200,
      body: {
        message: 'Candidate stage updated successfully',
        data: { /* ... datos de respuesta ... */ }
      }
    }).as('updateCandidate');
    
    // Realizar la operación de arrastre
    cy.get('@juanCard').drag('@targetColumn', { force: true });
    
    // Verificar que el candidato ya no está en la columna original
    cy.contains('.card-header', 'Aplicación')
      .parents('.card')
      .find('.card-body')
      .should('not.contain', 'Juan Pérez');
    
    // Verificar que el candidato ahora está en la columna destino
    cy.get('@targetColumn')
      .should('contain', 'Juan Pérez');
  });

  it('should verify backend update when moving a candidate', () => {
    // Interceptar la petición PUT
    cy.intercept('PUT', 'http://localhost:3010/candidates/*', {
      statusCode: 200,
      body: {
        message: 'Candidate stage updated successfully',
        data: {
          id: 1,
          positionId: 1,
          candidateId: 1,
          currentInterviewStep: 2
        }
      }
    }).as('updateCandidate');
    
    // Identificar el candidato y la columna destino
    cy.contains('.card-title', 'Juan Pérez')
      .parents('.card')
      .as('juanCard');
    
    cy.contains('.card-header', 'Entrevista Técnica')
      .parents('.card')
      .find('.card-body')
      .as('targetColumn');
    
    // Realizar la operación de arrastre
    cy.get('@juanCard').drag('@targetColumn', { force: true });
    
    // Verificar la petición PUT
    cy.wait('@updateCandidate').then((interception) => {
      // Verificar que la petición contiene los datos correctos
      expect(interception.request.method).to.equal('PUT');
      // Verificar el body según la estructura de nuestra aplicación
      cy.wrap(interception.response.statusCode).should('equal', 200);
      cy.wrap(interception.response.body).should('have.property', 'message');
    });
  });

  it('should complete full workflow from load to candidate stage change', () => {
    // 1. Verificar carga inicial
    cy.contains('h2', 'Desarrollador Frontend').should('be.visible');
    cy.contains('.card-header', 'Aplicación').should('be.visible');
    cy.contains('.card-header', 'Entrevista Técnica').should('be.visible');
    
    // 2. Preparar interceptación
    cy.intercept('PUT', 'http://localhost:3010/candidates/*', {
      statusCode: 200,
      body: {
        message: 'Candidate stage updated successfully',
        data: { /* ... datos de respuesta ... */ }
      }
    }).as('updateCandidate');
    
    // 3. Identificar elementos y realizar arrastre
    cy.contains('.card-title', 'Juan Pérez')
      .parents('.card')
      .as('candidateCard');
    
    cy.contains('.card-header', 'Entrevista Técnica')
      .parents('.card')
      .find('.card-body')
      .as('targetColumn');
    
    cy.get('@candidateCard').drag('@targetColumn', { force: true });
    
    // 4. Verificar petición backend
    cy.wait('@updateCandidate');
    
    // 5. Verificar cambios en la UI
    cy.contains('.card-header', 'Aplicación')
      .parents('.card')
      .find('.card-body')
      .should('not.contain', 'Juan Pérez');
    
    cy.contains('.card-header', 'Entrevista Técnica')
      .parents('.card')
      .find('.card-body')
      .should('contain', 'Juan Pérez');
  });
}); 