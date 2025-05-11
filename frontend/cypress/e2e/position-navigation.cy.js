/// <reference types="cypress" />

describe('Position Navigation', () => {
  it('should navigate from positions list to position details', () => {
    // Iniciar en la lista de posiciones
    cy.visit('/positions');
    
    // Interceptar las llamadas API que se harán al navegar (usando una ruta más genérica)
    cy.intercept('GET', 'http://localhost:3010/positions/*/interviewFlow').as('getInterviewFlow');
    cy.intercept('GET', 'http://localhost:3010/positions/*/candidates').as('getCandidates');
    
    // Hacer clic en el primer botón "Ver proceso"
    cy.contains('Ver proceso').click();  // Selector más simple
    
    // Verificar que la URL cambió a una página de detalle
    cy.url().should('match', /\/positions\/\d+$/);
    
    // Esperar a que se carguen los datos
    cy.wait(['@getInterviewFlow', '@getCandidates']);
    
    // Verificar que se muestra el detalle de la posición
    cy.get('h2.text-center.mb-4').should('exist');
    cy.get('.card-header').should('have.length.at.least', 1);
  });
});
