// position-api.cy.js
// Archivo de pruebas E2E para probar las API del backend

/// <reference types="cypress" />

describe('API Backend Tests', () => {
  it('debería obtener la lista de posiciones', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3010/positions',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 304]);
      expect(response.body).to.be.an('array');
      cy.log(`Se encontraron ${response.body.length} posiciones`);
      
      // Guardar el ID de la primera posición si existe para usarlo en otras pruebas
      if (response.body.length > 0) {
        cy.wrap(response.body[0].id).as('positionId');
      }
    });
  });

  it('debería obtener el flujo de entrevista de una posición', () => {
    // Primero obtenemos todas las posiciones para conseguir un ID válido
    cy.request({
      method: 'GET',
      url: 'http://localhost:3010/positions',
      failOnStatusCode: false
    }).then((response) => {
      if (response.body.length > 0) {
        const positionId = response.body[0].id;
        
        // Ahora obtenemos el flujo de entrevista para esa posición
        cy.request({
          method: 'GET',
          url: `http://localhost:3010/positions/${positionId}/interviewFlow`,
          failOnStatusCode: false
        }).then((flowResponse) => {
          expect(flowResponse.status).to.be.oneOf([200, 304]);
          cy.log('Flujo de entrevista obtenido correctamente');
          cy.log(JSON.stringify(flowResponse.body, null, 2));
        });
      } else {
        cy.log('No se encontraron posiciones para probar');
      }
    });
  });

  it('debería obtener los candidatos de una posición', () => {
    // Primero obtenemos todas las posiciones para conseguir un ID válido
    cy.request({
      method: 'GET',
      url: 'http://localhost:3010/positions',
      failOnStatusCode: false
    }).then((response) => {
      if (response.body.length > 0) {
        const positionId = response.body[0].id;
        
        // Ahora obtenemos los candidatos para esa posición
        cy.request({
          method: 'GET',
          url: `http://localhost:3010/positions/${positionId}/candidates`,
          failOnStatusCode: false
        }).then((candidatesResponse) => {
          expect(candidatesResponse.status).to.be.oneOf([200, 304]);
          cy.log(`Se encontraron ${candidatesResponse.body.length} candidatos`);
          cy.log(JSON.stringify(candidatesResponse.body, null, 2));
        });
      } else {
        cy.log('No se encontraron posiciones para probar');
      }
    });
  });
}); 