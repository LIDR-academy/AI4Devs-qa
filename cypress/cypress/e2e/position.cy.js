describe('Página de Posición', () => {
  beforeEach(() => {
    // Visitar la página de posición con un ID válido
    cy.visit('/positions/1');
  });

  describe('Carga inicial de la página', () => {
    it('debería mostrar el título de la posición correctamente', () => {
      // Verificar que el título existe y no está vacío
      cy.get('h2.text-center')
        .should('exist')
        .and('not.be.empty');
    });

    it('debería mostrar las columnas de fases del proceso', () => {
      // Verificar que existen las columnas principales
      cy.get('.card-header')
        .should('have.length.at.least', 1);
      
      // Verificar que cada columna tiene un título
      cy.get('.card-header').each(($header) => {
        expect($header.text()).to.not.be.empty;
      });
    });

    it('debería mostrar los candidatos en sus columnas correspondientes', () => {
      // Primero obtenemos todas las columnas y sus títulos
      cy.get('.card-header').then(($headers) => {
        const columnTitles = Array.from($headers).map(header => header.textContent.trim());
        
        // Para cada columna, verificamos que los candidatos tienen la fase correcta
        cy.get('.card-body').each(($column, columnIndex) => {
          const expectedPhase = columnTitles[columnIndex];
          
          // Verificamos cada candidato en la columna
          cy.wrap($column).find('.mb-2').each(($candidateCard) => {
            // Obtenemos el ID del candidato de la tarjeta
            const candidateId = $candidateCard.attr('data-candidate-id');
            
            // Hacemos una petición para obtener los detalles del candidato
            cy.request(`http://localhost:3010/candidates/${candidateId}`).then((response) => {
              const candidateData = response.body;
              
              // Verificamos que la fase actual del candidato coincide con la columna
              expect(candidateData.currentInterviewStep).to.equal(expectedPhase);
            });
          });
        });
      });
    });
  });
}); 