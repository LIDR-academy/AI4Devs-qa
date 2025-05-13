describe('Página de Posición', () => {
  beforeEach(() => {
    // Visitar la página de posición con un ID válido
    cy.visit('/positions/1');
  });

  describe('Carga inicial de la página', () => {
    it('debería mostrar el título de la posición correctamente', () => {
      // Verificar que el título existe y no está vacío
      cy.get('h2.text-center.mb-4')
        .should('exist')
        .and('not.be.empty');
    });

    it('debería mostrar las columnas de fases del proceso', () => {
      // Verificar que existen las columnas principales
      cy.get('.card-header.text-center')
        .should('have.length.at.least', 1);
      
      // Verificar que cada columna tiene un título
      cy.get('.card-header.text-center').each(($header) => {
        expect($header.text()).to.not.be.empty;
      });
    });

    it('debería mostrar los candidatos en sus columnas correspondientes', () => {
      cy.get('.card-header.text-center').then(($headers) => {
        const columnTitles = Array.from($headers).map(header => header.textContent.trim());

        cy.request('http://localhost:3010/positions/1/candidates').then((response) => {
          const allCandidates = response.body;

          cy.get('.mb-4.card > .card-body').each(($column, columnIndex) => {
            const expectedPhase = columnTitles[columnIndex];
            console.log(`Chequeando columna: ${expectedPhase} (índice: ${columnIndex})`);
            // Usar jQuery directamente para buscar las tarjetas
            const $cards = Cypress.$($column).find('.mb-2.card');
            console.log(`Fase: ${expectedPhase} - Número de tarjetas:`, $cards.length);
            if ($cards.length === 0) {
              return;
            }
            $cards.each((i, card) => {
              const candidateName = Cypress.$(card).find('.card-title').text().trim();
              const candidate = allCandidates.find(c => c.fullName === candidateName);
              const realPhase = candidate ? candidate.currentInterviewStep : 'NO ENCONTRADO';
              console.log(`Candidato: ${candidateName} | Fase esperada: ${expectedPhase} | Fase real: ${realPhase}`);
              expect(candidate, `Candidato con nombre ${candidateName} encontrado en la API`).to.exist;
              expect(realPhase).to.equal(expectedPhase);
            });
          });
        });
      });
    });

    it('debería permitir arrastrar la tarjeta de Carlos García a otra columna (prueba visual)', () => {
      cy.visit('/positions/1');
      cy.get('.col-md-3').eq(1).find('.card-body').first().then($target => {
        cy.contains('.mb-2.card', 'Carlos García').should('be.visible')
          .dragAndDropNative($target);
      });
      cy.wait(1000);
    });

    it('debería reflejar el cambio de fase de Carlos García en el backend y frontend', () => {
      // Cambia la fase de Carlos García a 'Technical Interview' mediante la API
      cy.request('PUT', 'http://localhost:3010/candidates/3', {
        applicationId: 4,
        currentInterviewStep: 2 // id de "Technical Interview"
      }).then((response) => {
        expect(response.status).to.eq(200);
      });

      // Recarga la página para reflejar el cambio
      cy.visit('/positions/1');

      // Verifica que Carlos García aparece en la columna 'Technical Interview'
      cy.get('.col-md-3').eq(1).find('.mb-2.card .card-title').should('contain', 'Carlos García');
      // Verifica que Carlos García ya no está en 'Initial Screening'
      cy.get('.col-md-3').eq(0).find('.mb-2.card .card-title').should('not.exist');
    });
  });
}); 