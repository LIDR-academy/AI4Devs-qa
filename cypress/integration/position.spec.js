// Pruebas E2E para la interfaz "position" usando Cypress

describe('Interfaz Position', () => {
  beforeEach(() => {
    // Ajusta la URL según la ruta real de la página de posición
    cy.visit('http://localhost:3000/position/1');
  });

  it('Debe mostrar el título de la posición correctamente', () => {
    cy.get('[data-cy=position-title]').should('be.visible');
  });

  it('Debe mostrar las columnas de fases del proceso', () => {
    const fases = ['Aplicación', 'Entrevista', 'Oferta', 'Contratado']; // Ajusta según tus fases reales
    fases.forEach(fase => {
      cy.get(`[data-cy=column-${fase}]`).should('exist');
    });
  });

  it('Debe mostrar las tarjetas de candidatos en la columna correcta', () => {
    // Suponiendo que cada tarjeta tiene un data-cy con el id de candidato y la columna tiene data-cy=column-Fase
    cy.get('[data-cy=candidate-card]').each(($el) => {
      const fase = $el.attr('data-fase');
      cy.wrap($el).parents(`[data-cy=column-${fase}]`).should('exist');
    });
  });

  it('Debe permitir cambiar de fase a un candidato (drag & drop simulado)', () => {
    // Suponiendo que hay al menos un candidato en la primera fase
    cy.get('[data-cy=column-Aplicación] [data-cy=candidate-card]').first().as('candidato');
    cy.get('@candidato').invoke('attr', 'data-id').then((id) => {
      // Usar el comando drag del plugin
      cy.get('@candidato').drag('[data-cy=column-Entrevista]');
      // Verifica que la tarjeta ahora está en la nueva columna
      cy.get('[data-cy=column-Entrevista]').find(`[data-cy=candidate-card][data-id="${id}"]`).should('exist');
      // Verifica que el backend fue llamado correctamente
      cy.intercept('PUT', `/candidate/${id}`).as('updateCandidate');
      cy.wait('@updateCandidate').its('response.statusCode').should('eq', 200);
    });
  });
});