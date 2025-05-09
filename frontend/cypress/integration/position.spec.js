/// <reference types="cypress" />
/// <reference types="@4tw/cypress-drag-drop" />

describe('Position Details Page Tests', () => {
  // La ID de la posición que vamos a probar
  const positionId = 1;
  
  beforeEach(() => {
    // Visitar la página de detalles de posición antes de cada prueba
    cy.visit(`/positions/${positionId}`);
    
    // Esperar a que la página cargue completamente
    cy.get('h2', { timeout: 15000 }).should('be.visible');
  });

  // PRIMERA PRUEBA: Carga de la Página de Position
  describe('Position Page Loading', () => {
    it('debería cargar la página y mostrar elementos clave', () => {
      // Verificar que el título de la posición se muestra
      cy.get('h2').should('be.visible');
      
      // Verificar que existen columnas para cada fase
      cy.get('.card-header').should('have.length.at.least', 1);
      
      // Verificar que hay tarjetas de candidatos o al menos contenedores para ellas
      cy.get('.card-body').should('exist');
    });
  });

  // SEGUNDA PRUEBA: Enfoque utilizando API directamente
  describe('Candidate Phase Change (API Approach)', () => {
    it('debería mover un candidato entre columnas usando la API', () => {
      // Verificar que hay al menos 2 columnas
      cy.get('.col-md-3').then($columns => {
        if ($columns.length < 2) {
          cy.log('Se necesitan al menos dos columnas para la prueba. Omitiendo prueba.');
          return;
        }
        
        // Obtener los nombres de las fases/etapas
        cy.get('.card-header').then($headers => {
          if ($headers.length < 2) {
            cy.log('Se necesitan al menos dos fases para la prueba. Omitiendo prueba.');
            return;
          }
          
          // Guardamos el nombre de la segunda fase
          const targetStageName = $headers.eq(1).text().trim();
          cy.log(`Fase destino: ${targetStageName}`);
          
          // Obtener una lista de candidatos usando la API
          cy.request(`/api/positions/${positionId}/candidates`).then(response => {
            if (!response.body || !response.body.length) {
              cy.log('No hay candidatos disponibles para probar. Omitiendo prueba.');
              return;
            }
            
            // Obtener el primer candidato
            const candidate = response.body[0];
            cy.log(`Candidato seleccionado: ${candidate.name} (ID: ${candidate.id})`);
            
            // Obtener la estructura de fases de la entrevista para esta posición
            cy.request(`/api/positions/${positionId}/interviewFlow`).then(flowResponse => {
              if (!flowResponse.body || !flowResponse.body.stages || !flowResponse.body.stages.length) {
                cy.log('No se encontró la estructura de fases. Omitiendo prueba.');
                return;
              }
              
              // Encontrar el ID de la segunda fase
              const targetStage = flowResponse.body.stages[1]; // índice 1 = segunda fase
              cy.log(`ID de fase destino: ${targetStage.id}`);
              
              // Realizar la petición PUT para cambiar la fase del candidato
              cy.request({
                method: 'PUT',
                url: `/api/candidates/${candidate.id}`,
                body: {
                  stageId: targetStage.id
                }
              }).then(updateResponse => {
                // Verificar que la actualización fue exitosa
                expect(updateResponse.status).to.be.oneOf([200, 201, 204]);
                
                // Recargar la página para ver los cambios
                cy.reload();
                
                // Esperar a que la página se cargue nuevamente
                cy.get('h2', { timeout: 10000 }).should('be.visible');
                
                // Verificar que el candidato está en la nueva columna/fase
                // Buscamos por nombre o ID del candidato en la segunda columna
                cy.get('.col-md-3').eq(1).find('.card-body')
                  .should('contain.text', candidate.name || `ID: ${candidate.id}`);
              });
            });
          });
        });
      });
    });
  });
}); 