// Escenario 1: Carga de la Página de Position
// Escenario 2: Cambio de Fase de un Candidato
describe('Interfaz de Posiciones', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/positions/1');
    // Interceptar la llamada GET inicial para cargar los datos
    cy.intercept('GET', '/positions/*').as('getPosition');
    cy.wait('@getPosition');
  });

  it('Debe mostrar el título de la posición y las columnas de fases', () => {
    cy.contains('h2', 'Posiciones').should('exist');
    cy.get('[data-cy="stage-column"]').should('have.length.at.least', 1);
  });

  it('Debe mostrar las tarjetas de candidatos en la columna correcta', () => {
    cy.get('[data-cy="candidate-card"]').each(($card) => {
      cy.wrap($card)
        .invoke('attr', 'data-cy-stage')
        .then((stage) => {
          cy.wrap($card).parents('[data-cy="stage-column"]').should('have.attr', 'data-cy-stage', stage);
        });
    });
  });

  describe('Cambio de Fase de un Candidato', () => {
    beforeEach(() => {
      // Interceptar la llamada PUT para actualizar el candidato
      cy.intercept('PUT', '/candidate/*').as('updateCandidate');
    });

    it('Debe permitir arrastrar y soltar una tarjeta de candidato entre columnas', () => {
      // Obtener el primer candidato y su fase actual
      cy.get('[data-cy="candidate-card"]').first().as('candidato');
      cy.get('@candidato')
        .invoke('attr', 'data-cy-stage')
        .as('faseInicial');

      // Obtener la columna destino
      cy.get('[data-cy="stage-column"]').eq(1).as('columnaDestino');
      cy.get('@columnaDestino')
        .invoke('attr', 'data-cy-stage')
        .as('faseDestino');

      // Simular el drag & drop
      cy.get('@candidato')
        .trigger('mousedown', { which: 1 })
        .trigger('dragstart');

      cy.get('@columnaDestino')
        .trigger('dragover')
        .trigger('drop');

      cy.get('@candidato')
        .trigger('dragend');

      // Verificar que la tarjeta se movió a la nueva columna
      cy.get('@candidato')
        .parents('[data-cy="stage-column"]')
        .should('have.attr', 'data-cy-stage', '{faseDestino}');

      // Verificar que se realizó la llamada al backend
      cy.wait('@updateCandidate').then((interception) => {
        expect(interception.request.method).to.equal('PUT');
        expect(interception.request.body).to.include({
          stage: '{faseDestino}'
        });
        expect(interception.response.statusCode).to.equal(200);
      });

      // Verificar que la UI se actualizó correctamente
      cy.get('@candidato')
        .should('have.attr', 'data-cy-stage', '{faseDestino}');
    });

    it('Debe manejar errores al actualizar la fase del candidato', () => {
      // Simular un error en la llamada al backend
      cy.intercept('PUT', '/candidate/*', {
        statusCode: 500,
        body: { error: 'Error al actualizar la fase' }
      }).as('updateCandidateError');

      // Intentar mover el candidato
      cy.get('[data-cy="candidate-card"]').first().as('candidato');
      cy.get('[data-cy="stage-column"]').eq(1).as('columnaDestino');

      cy.get('@candidato')
        .trigger('mousedown', { which: 1 })
        .trigger('dragstart');

      cy.get('@columnaDestino')
        .trigger('dragover')
        .trigger('drop');

      // Verificar que se muestra un mensaje de error
      cy.get('[data-cy="error-message"]')
        .should('be.visible')
        .and('contain', 'Error al actualizar la fase');

      // Verificar que la tarjeta regresa a su posición original
      cy.get('@candidato')
        .parents('[data-cy="stage-column"]')
        .should('have.attr', 'data-cy-stage', '{faseInicial}');
    });
  });
}); 