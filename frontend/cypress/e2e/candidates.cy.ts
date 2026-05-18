describe('Add Candidate Form test', () => {
  it('should navigate to add candidate form and verify form elements', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Añadir Nuevo Candidato').click();
    
    // Verify we are on the correct page
    cy.contains('Agregar Candidato');
    
    // Verify form fields exist
    cy.get('[name="firstName"]').should('be.visible');
    cy.get('[name="lastName"]').should('be.visible');
    cy.get('[name="email"]').should('be.visible');
    cy.get('[name="phone"]').should('be.visible');
    cy.get('[name="address"]').should('be.visible');
    
    // Verify buttons for adding education and work experience
    cy.contains('Añadir Educación').should('be.visible');
  });
}); 