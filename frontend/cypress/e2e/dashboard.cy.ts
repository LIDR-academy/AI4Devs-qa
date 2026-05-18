describe('Dashboard test', () => {
  it('should visit the dashboard and verify main elements', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Dashboard del Reclutador');
    cy.contains('Añadir Nuevo Candidato');
    cy.contains('Ir a Posiciones');
  });
}); 