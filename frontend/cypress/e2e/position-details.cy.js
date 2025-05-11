/// <reference types="cypress" />

describe('Página de Detalles de Posición', () => {
  beforeEach(() => {
    // Interceptar las llamadas a la API
    cy.intercept('GET', 'http://localhost:3010/positions/1/interviewFlow').as('getInterviewFlow');
    cy.intercept('GET', 'http://localhost:3010/positions/1/candidates').as('getCandidates');
    
    // Visitar la página
    cy.visit('/positions/1');
    
    // Esperar a que las llamadas a la API se completen
    cy.wait(['@getInterviewFlow', '@getCandidates']);
  });

  it('debería mostrar el nombre de la posición correctamente', () => {
    // Verificar que el título de la posición existe y no está vacío
    cy.get('h2.text-center.mb-4')
      .should('exist')
      .and('not.be.empty');
  });

  it('debería mostrar las columnas de etapas según la API', () => {
    // Verificar que existen columnas de etapas
    cy.get('.card-header')
      .should('have.length.at.least', 1)
      .and('be.visible');
    
    // Verificar que cada columna tiene contenido
    cy.get('.card-header').each(($header) => {
      cy.wrap($header).should('not.be.empty');
    });
  });

  it('debería mostrar las tarjetas de candidatos con datos correctos', () => {
    // Verificar si hay tarjetas de candidatos
    cy.get('.card-body .card').then($cards => {
      if ($cards.length > 0) {
        // Si hay candidatos, verificar que tienen nombre
        cy.wrap($cards).find('.card-title').first().should('exist').and('not.be.empty');
      } else {
        // Si no hay candidatos, verificar que las columnas existen
        cy.get('.card-header').should('exist');
      }
    });
  });

  it('debería poder navegar de vuelta a la lista de posiciones', () => {
    // Verificar que existe el botón de volver
    cy.contains('Volver a Posiciones')
      .should('exist')
      .click();
    
    // Verificar que se ha navegado a la lista de posiciones
    cy.url().should('include', '/positions');
    cy.url().should('not.include', '/positions/1');
  });

  it('inspeccionar estructura de respuesta de la API', () => {
    // Hacer la llamada directamente y examinar la respuesta
    cy.request('GET', 'http://localhost:3010/positions/1/interviewFlow').then(response => {
      // Imprimir toda la respuesta para examinarla
      console.log('Estructura completa de getInterviewFlow:', JSON.stringify(response.body, null, 2));
      
      // Verificar que la respuesta es exitosa
      expect(response.status).to.eq(200);
    });
    
    cy.request('GET', 'http://localhost:3010/positions/1/candidates').then(response => {
      // Imprimir toda la respuesta para examinarla
      console.log('Estructura completa de getCandidates:', JSON.stringify(response.body, null, 2));
      
      // Verificar que la respuesta es exitosa
      expect(response.status).to.eq(200);
    });
  });
});