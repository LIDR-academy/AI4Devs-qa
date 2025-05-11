/// <reference types="cypress" />

describe('Position Details Page', () => {
    beforeEach(() => {
      // Usar el comando personalizado
      cy.loadPositionDetails('1');
    });
  
    it('should display the position name correctly', () => {
      // Verificar que el título de la posición existe y no está vacío
      cy.get('h2.text-center.mb-4')
        .should('exist')
        .and('not.be.empty');
    });
  
    it('should display stage columns correctly', () => {
      // Verificar que existen las columnas de fases
      cy.get('.card-header')  // Simplificado el selector
        .should('have.length.at.least', 1)
        .and('be.visible');
      
      // Verificar que cada columna tiene un título
      cy.get('.card-header').each(($header) => {
        cy.wrap($header).should('not.be.empty');
      });
    });
  
    it('should display candidate cards when available', () => {
      // Verificar si hay tarjetas de candidatos
      cy.get('.card-body .card').then($cards => {  // Simplificado el selector
        if ($cards.length > 0) {
          // Si hay candidatos, verificar que tienen nombre
          cy.wrap($cards).find('.card-title').should('exist');
        } else {
          // Si no hay candidatos, verificar que las columnas existen
          cy.get('.card-header').should('exist');
        }
      });
    });
  
    it('should be able to navigate back to positions list', () => {
      // Verificar que existe el botón de volver
      cy.contains('Volver a Posiciones')  // Selector más simple y robusto
        .should('exist')
        .click();
      
      // Verificar que se ha navegado a la lista de posiciones
      cy.url().should('include', '/positions');
      cy.url().should('not.include', '/positions/1');
    });
  
    it('should have a working drag and drop interface', () => {
      // Usar el comando personalizado para verificar elementos de drag & drop
      cy.verifyDragAndDropElements();
    });
});