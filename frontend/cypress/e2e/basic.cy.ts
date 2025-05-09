/// <reference types="cypress" />

describe('Prueba básica', () => {
  it('Visita la página principal', () => {
    cy.visit('/');
    cy.contains('Recruiter Dashboard');
  });
}); 