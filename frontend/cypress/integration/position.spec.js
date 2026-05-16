// position.spec.js
// Archivo de pruebas E2E para la interfaz de posiciones

/// <reference types="cypress" />

// Solución para errores de lint
/* global cy, describe, it, beforeEach, expect */

describe('Position Interface Tests', () => {
  beforeEach(() => {
    // Visitar la página de posiciones antes de cada prueba
    // Asumimos que la URL base está configurada en cypress.config.ts
    // y que la ruta para acceder a las posiciones es '/position'
    cy.visit('/position');
    
    // Interceptar la petición para obtener las posiciones
    cy.intercept('GET', 'http://localhost:3010/positions/*', (req) => {
      // Mock de respuesta para pruebas
      req.reply({
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
      });
    });

    // Interceptar la petición para obtener los candidatos
    cy.intercept('GET', 'http://localhost:3010/positions/*/candidates', (req) => {
      // Mock de respuesta para pruebas
      req.reply({
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
      });
    });
  });

  it('should load the position page correctly', () => {
    // Verificar que el título de la posición se muestre correctamente
    cy.get('h2').should('contain', 'Desarrollador Frontend');
    
    // Verificar que las columnas correspondientes a las fases estén presentes
    cy.get('.card-header').should('have.length', 4);
    cy.get('.card-header').eq(0).should('contain', 'Aplicación');
    cy.get('.card-header').eq(1).should('contain', 'Entrevista Técnica');
    cy.get('.card-header').eq(2).should('contain', 'Entrevista RRHH');
    cy.get('.card-header').eq(3).should('contain', 'Oferta');
    
    // Verificar que los candidatos aparezcan en la fase correcta
    cy.get('.card-body').eq(0).find('.card').should('have.length', 1); // Fase Aplicación con 1 candidato
    cy.get('.card-body').eq(0).find('.card-title').should('contain', 'Juan Pérez');
    
    cy.get('.card-body').eq(1).find('.card').should('have.length', 1); // Fase Entrevista Técnica con 1 candidato
    cy.get('.card-body').eq(1).find('.card-title').should('contain', 'María García');
    
    cy.get('.card-body').eq(2).find('.card').should('have.length', 1); // Fase Entrevista RRHH con 1 candidato
    cy.get('.card-body').eq(2).find('.card-title').should('contain', 'Carlos López');
    
    cy.get('.card-body').eq(3).find('.card').should('have.length', 0); // Fase Oferta sin candidatos
  });

  it('should drag and drop a candidate card between stages', () => {
    // Verificamos que el candidato esté inicialmente en la columna "Aplicación"
    cy.get('.card-body').eq(0).find('.card').should('have.length', 1);
    cy.get('.card-body').eq(0).find('.card-title').should('contain', 'Juan Pérez');
    
    // Obtenemos la tarjeta del candidato "Juan Pérez" de la columna "Aplicación"
    cy.get('.card-body').eq(0).find('.card').first()
      .should('be.visible')
      .as('sourceCard');
    
    // Obtenemos la columna destino "Entrevista Técnica"
    cy.get('.card-body').eq(1)
      .should('be.visible')
      .as('targetColumn');
    
    // Realizamos la operación de arrastrar y soltar usando la biblioteca @4tw/cypress-drag-drop
    cy.get('@sourceCard').drag('@targetColumn');
    
    // Verificamos que la tarjeta ya no está en la columna "Aplicación"
    cy.get('.card-body').eq(0).find('.card').should('have.length', 0);
    
    // Verificamos que la tarjeta ahora está en la columna "Entrevista Técnica"
    cy.get('.card-body').eq(1).find('.card').should('have.length', 2);
    cy.get('.card-body').eq(1).find('.card-title').first().should('contain', 'Juan Pérez');
    cy.get('.card-body').eq(1).find('.card-title').last().should('contain', 'María García');
    
    // Verificamos visualmente que la tarjeta se ha movido correctamente
    cy.get('.card-body').eq(1).find('.card').first().should('be.visible');
  });

  it('should verify backend update (PUT) after moving a candidate card', () => {
    // Interceptamos la solicitud PUT que se realizará al mover el candidato
    cy.intercept('PUT', 'http://localhost:3010/candidates/1', {
      statusCode: 200,
      body: {
        message: 'Candidate stage updated successfully',
        data: {
          id: 1,
          positionId: 1,
          candidateId: 1,
          applicationDate: '2023-05-10T10:30:00.000Z',
          currentInterviewStep: 2
        }
      }
    }).as('updateCandidateRequest');
    
    // Verificamos que el candidato esté inicialmente en la columna "Aplicación"
    cy.get('.card-body').eq(0).find('.card').should('have.length', 1);
    cy.get('.card-body').eq(0).find('.card-title').should('contain', 'Juan Pérez');
    
    // Obtenemos la tarjeta del candidato "Juan Pérez" de la columna "Aplicación"
    cy.get('.card-body').eq(0).find('.card').first()
      .should('be.visible')
      .as('sourceCard');
    
    // Obtenemos la columna destino "Entrevista Técnica"
    cy.get('.card-body').eq(1)
      .should('be.visible')
      .as('targetColumn');
    
    // Realizamos la operación de arrastrar y soltar
    cy.get('@sourceCard').drag('@targetColumn');
    
    // Verificamos que se ha realizado la solicitud PUT al backend
    cy.wait('@updateCandidateRequest').then((interception) => {
      // Verificamos que la solicitud contiene los datos correctos
      cy.wrap(interception.request.body).should('deep.equal', {
        applicationId: 101,
        currentInterviewStep: 2
      });
      
      // Verificamos la respuesta del servidor
      cy.wrap(interception.response.statusCode).should('equal', 200);
      cy.wrap(interception.response.body.message).should('equal', 'Candidate stage updated successfully');
      
      // Verificamos los datos específicos de la respuesta
      const responseData = interception.response.body.data;
      cy.wrap(responseData.id).should('equal', 1);
      cy.wrap(responseData.candidateId).should('equal', 1);
      cy.wrap(responseData.currentInterviewStep).should('equal', 2);
    });
    
    // Verificamos que la tarjeta se ha movido correctamente en la interfaz
    cy.get('.card-body').eq(0).find('.card').should('have.length', 0);
    cy.get('.card-body').eq(1).find('.card').should('have.length', 2);
    cy.get('.card-body').eq(1).find('.card-title').first().should('contain', 'Juan Pérez');
  });

  // PASO 6: Flujo completo que combina carga, movimiento y verificación del PUT
  it('should complete full workflow from page load to candidate stage change with backend validation', () => {
    // 1. VERIFICACIÓN DE CARGA INICIAL
    // Verificar que el título de la posición se muestre correctamente
    cy.get('h2')
      .should('be.visible')
      .and('contain', 'Desarrollador Frontend');
    
    // Verificar que las columnas de fases estén presentes
    // Usamos should('exist') para ser más resilientes a cambios en la UI
    cy.get('.card-header').should('have.length.at.least', 3);
    
    // Buscar la columna "Aplicación" por su texto en lugar de índice para mayor resiliencia
    cy.contains('.card-header', 'Aplicación')
      .should('be.visible')
      .parents('.card')
      .as('aplicacionColumn');

    // Buscar la columna "Entrevista Técnica" por su texto
    cy.contains('.card-header', 'Entrevista Técnica')
      .should('be.visible')
      .parents('.card')
      .as('entrevistaTecnicaColumn');
      
    // Verificar que el candidato "Juan Pérez" esté en la fase "Aplicación"
    cy.get('@aplicacionColumn')
      .find('.card-body .card')
      .should('have.length.at.least', 1)
      .find('.card-title')
      .should('contain', 'Juan Pérez')
      .parents('.card')
      .as('candidatoCard');
      
    // 2. INTERCEPTACIÓN DE LA SOLICITUD PUT
    // Configurar la interceptación antes de realizar la acción de arrastre
    cy.intercept('PUT', 'http://localhost:3010/candidates/*', {
      statusCode: 200,
      body: {
        message: 'Candidate stage updated successfully',
        data: {
          id: 1,
          positionId: 1,
          candidateId: 1,
          applicationDate: '2023-05-10T10:30:00.000Z',
          currentInterviewStep: 2
        }
      }
    }).as('updateCandidateRequest');
    
    // 3. SIMULACIÓN DEL ARRASTRE ENTRE FASES
    // Verificar que la tarjeta del candidato y la columna destino son visibles
    cy.get('@candidatoCard').should('be.visible');
    cy.get('@entrevistaTecnicaColumn').should('be.visible');
    
    // Realizar la operación de arrastre
    // Agregamos una espera corta para asegurar que la UI esté lista
    cy.wait(500).then(() => {
      // Continuamos con la operación de arrastrar después de la espera
      cy.get('@candidatoCard').drag('@entrevistaTecnicaColumn', {force: true});
    });
    
    // 4. VERIFICACIÓN DE LA SOLICITUD PUT Y LA RESPUESTA
    cy.wait('@updateCandidateRequest').then((interception) => {
      // Verificar que la solicitud contiene los datos correctos
      // Usamos una verificación más flexible para ser resilientes a cambios
      cy.wrap(interception.request.body).should('have.property', 'applicationId');
      cy.wrap(interception.request.body).should('have.property', 'currentInterviewStep');
      
      // Verificar que la respuesta es correcta
      cy.wrap(interception.response.statusCode).should('equal', 200);
      cy.wrap(interception.response.body).should('have.property', 'message');
      cy.wrap(interception.response.body).should('have.property', 'data');
    });
    
    // 5. VERIFICACIÓN DE LA UI DESPUÉS DEL CAMBIO
    // Verificar que el candidato ya no está en la columna "Aplicación"
    cy.get('@aplicacionColumn')
      .find('.card-body .card-title')
      .should('not.contain', 'Juan Pérez');
      
    // Verificar que el candidato ahora está en la columna "Entrevista Técnica"
    cy.get('@entrevistaTecnicaColumn')
      .find('.card-body .card-title')
      .should('contain', 'Juan Pérez');
      
    // 6. VALIDACIÓN FINAL - VERIFICAR QUE LA UI SE HA ACTUALIZADO CORRECTAMENTE
    // Comprobar que la cantidad de candidatos es la esperada en cada columna
    // Esto nos ayuda a confirmar que no hay duplicados o elementos fantasma
    cy.get('@aplicacionColumn')
      .find('.card-body .card')
      .should('have.length', 0);
      
    cy.get('@entrevistaTecnicaColumn')
      .find('.card-body .card')
      .should('have.length', 2); // María + Juan = 2 candidatos
  });
}); 