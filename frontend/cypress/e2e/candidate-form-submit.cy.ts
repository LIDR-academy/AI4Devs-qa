describe('Candidate form submission test', () => {
  beforeEach(() => {
    // Mock the API endpoint for submitting a candidate
    cy.intercept('POST', 'http://localhost:3010/candidates', {
      statusCode: 201,
      body: { id: 123, message: 'Candidate created successfully' }
    }).as('submitCandidate');
  });

  it('should fill out and submit the candidate form', () => {
    // Navigate to the add candidate form
    cy.visit('http://localhost:3000/add-candidate');
    
    // Esperar a que el formulario esté visible
    cy.get('form').should('be.visible');
    
    // Fill in the basic form fields
    cy.get('[name="firstName"]').should('be.visible').type('Juan');
    cy.get('[name="lastName"]').should('be.visible').type('Pérez');
    cy.get('[name="email"]').should('be.visible').type('juan.perez@example.com');
    cy.get('[name="phone"]').should('be.visible').type('612345678');
    cy.get('[name="address"]').should('be.visible').type('Calle Mayor 123, Madrid');
    
    // Add education
    cy.contains('button', 'Añadir Educación').click();
    cy.get('[name="institution"]').first().should('be.visible').type('Universidad Complutense');
    cy.get('[name="title"]').first().should('be.visible').type('Ingeniería Informática');
    
    // Submit the form
    cy.get('form').submit();
    
    // Wait for the API call and verify it happened
    cy.wait('@submitCandidate');
    
    // Verify success message appears
    cy.contains('Candidato añadido con éxito');
  });
}); 