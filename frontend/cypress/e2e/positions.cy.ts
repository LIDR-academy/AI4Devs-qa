describe('Positions list test', () => {
  beforeEach(() => {
    // Mocking the API response for positions
    cy.intercept('GET', 'http://localhost:3010/positions', {
      fixture: 'positions.json'
    }).as('getPositions');
  });

  it('should navigate to positions page and verify elements', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Ir a Posiciones').click();
    
    // Verify we are on the correct page
    cy.contains('Posiciones');
    
    // Verify search filters exist
    cy.get('input[placeholder="Buscar por título"]').should('be.visible');
    cy.get('select').should('have.length.at.least', 2); // At least Estado and Manager dropdowns
    
    // Wait for the positions to load
    cy.wait('@getPositions');
  });
}); 