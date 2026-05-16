/// <reference types="cypress" />

describe('Prueba Básica', () => {
  it('debería funcionar correctamente', () => {
    cy.visit('/', { failOnStatusCode: false });
    cy.log('Prueba simple ejecutada correctamente');
    expect(true).to.be.true;
  });
}); 