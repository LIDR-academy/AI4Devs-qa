describe('Position Interface', () => {
  beforeEach(() => {
    // Visitar la página de position específica y esperar a que cargue
    cy.visit('/positions/1', { timeout: 10000 });
    // Esperar a que la página esté completamente cargada
    cy.get('body').should('be.visible');
  });

  describe('Carga de la Página de Position', () => {
    it('debería mostrar el título de la posición correctamente', () => {
      // Verificar que el elemento existe y es visible
      cy.get('h1, h2, [class*="title"], [class*="header"]')
        .should('be.visible')
        .and('contain.text', 'Senior Full-Stack Engineer');
    });

    it('debería mostrar las columnas correspondientes a cada fase del proceso de contratación', () => {
      // Aumentar el timeout y esperar a que las columnas estén presentes
      cy.get('.col-md-3, .column, .phase-column', { timeout: 10000 })
        .should('have.length.at.least', 3)
        .then(($columns) => {
          // Verificar que existen las tres columnas específicas
          const fases = ['Initial Screening', 'Technical Interview', 'Manager Interview'];
          
          fases.forEach((fase, index) => {
            cy.wrap($columns)
              .eq(index)
              .should('be.visible')
              .and('contain.text', fase);
          });
        });
    });

    it('debería mostrar las tarjetas de los candidatos en la columna correcta según su fase actual', () => {
      // Verificar que existen tarjetas de candidatos
      cy.get('.card, .candidate-card', { timeout: 10000 })
        .should('exist');

      // Verificar que los candidatos están en las columnas correctas
      cy.get('.col-md-3').eq(0).should('contain.text', 'Carlos García');
      cy.get('.col-md-3').eq(1).should('contain.text', 'Jane Smith');
      cy.get('.col-md-3').eq(1).should('contain.text', 'John Doe');
    });
  });

  describe('Cambio de Fase de un Candidato', () => {
    it('debería permitir arrastrar una tarjeta de candidato entre columnas y actualizar su fase', () => {
      // Interceptar la llamada PUT al backend con la ruta correcta
      cy.intercept({
        method: 'PUT',
        url: 'http://localhost:3010/candidates/*',
        times: 1
      }).as('updateCandidate');

      // Esperar a que las columnas estén cargadas
      cy.get('.col-md-3', { timeout: 10000 }).should('have.length.at.least', 3);

      // Obtener la tarjeta de candidato y la columna destino
      cy.get('[data-rbd-draggable-id]').first().as('candidateCard');
      cy.get('[data-rbd-droppable-id="1"]').as('targetColumn');

      // Realizar el arrastre usando react-beautiful-dnd
      cy.get('@candidateCard')
        .trigger('mousedown', { which: 1, force: true })
        .trigger('mousemove', { clientX: 500, clientY: 300, force: true })
        .trigger('mouseup', { force: true });

      // Esperar la llamada al backend con un timeout más largo
      cy.wait('@updateCandidate', { timeout: 10000 })
        .its('request.body')
        .should('include', {
          applicationId: 1,
          currentInterviewStep: 1
        });

      // Verificar que la tarjeta se movió a la nueva columna
      cy.get('@targetColumn')
        .find('[data-rbd-draggable-id]')
        .should('contain', cy.get('@candidateCard').invoke('text'));
    });
  });
}); 