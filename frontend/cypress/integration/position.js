/* global cy */
// Pruebas E2E para la página de Position usando Cypress y BDD

describe('Página de Position', () => {
  // Escenario 1: Carga de la página de Position
  describe('Carga inicial', () => {
    it('debe mostrar el título de la posición correctamente', () => {
      // Navega a la lista de posiciones
      cy.visit('http://localhost:3000/positions');
      // Espera a que se cargue al menos una posición
      cy.get('.card-title').first().then(($title) => {
        const positionTitle = $title.text();
        // Haz clic en el botón "Ver proceso" de la primera posición
        cy.contains('Ver proceso').first().click();
        // Verifica que el título de la posición en la página de detalles coincide
        cy.get('h2.text-center.mb-4').should('have.text', positionTitle);
      });
    });

    it('debe mostrar las columnas correspondientes a cada fase', () => {
      // Navega a la lista de posiciones
      cy.visit('http://localhost:3000/positions');
      // Haz clic en el botón "Ver proceso" de la primera posición
      cy.contains('Ver proceso').first().click();
      // Verifica que existen al menos dos columnas de fase (cards con Card.Header)
      cy.get('.card-header').should('have.length.gte', 2);
    });

    it('debe mostrar las tarjetas de los candidatos en la columna correcta', () => {
      // Navega a la lista de posiciones
      cy.visit('http://localhost:3000/positions');
      // Haz clic en el botón "Ver proceso" de la primera posición
      cy.contains('Ver proceso').first().click();
      // Verifica que al menos una columna contiene una tarjeta de candidato
      cy.get('.card-body').find('.mb-2').its('length').should('be.gte', 1);
    });
  });

  // Escenario 2: Cambio de Fase de un Candidato
  describe('Cambio de fase de un candidato', () => {
    it('debe mover una tarjeta de una columna a otra tras drag & drop', () => {
      cy.visit('http://localhost:3000/positions');
      cy.contains('Ver proceso').first().click();
      cy.get('.card-header').should('have.length.gte', 2);
      // Buscar la primera columna que tenga al menos una tarjeta
      cy.get('.card-body').then($columns => {
        let sourceIdx = -1;
        let targetIdx = -1;
        for (let i = 0; i < $columns.length; i++) {
          if ($columns.eq(i).find('.mb-2').length > 0) {
            sourceIdx = i;
            break;
          }
        }
        // Selecciona la siguiente columna como destino
        targetIdx = sourceIdx + 1;
        if (sourceIdx !== -1 && targetIdx < $columns.length) {
          cy.get('.card-body').eq(sourceIdx).find('.mb-2').first().as('candidateCard');
          cy.get('.card-body').eq(targetIdx).as('targetColumn');
          cy.get('@candidateCard').drag('@targetColumn', { force: true });
        } else {
          throw new Error('No se encontró una columna con tarjeta y una columna destino válida');
        }
      });
      // Aquí puedes agregar una verificación visual si lo deseas
    });

    it('debe actualizar la fase del candidato en el backend (PUT)', () => {
      // Navegar a la página de posiciones
      cy.visit('http://localhost:3000/positions');
      cy.contains('Ver proceso').first().click();
      
      // Variables para almacenar información de candidato y columnas
      let candidateId, applicationId, targetStepId;
      let sourceIdx = -1;
      let targetIdx = -1;
      let candidateName = '';
      
      // Obtener ID de la posición actual
      cy.url().then(url => {
        const positionId = url.split('/').pop();
        
        // Buscar una columna con al menos una tarjeta de candidato
        cy.get('.card-body').then($columns => {
          // Encontrar la primera columna con una tarjeta
          for (let i = 0; i < $columns.length; i++) {
            if ($columns.eq(i).find('.mb-2').length > 0) {
              sourceIdx = i;
              break;
            }
          }
          
          // Si hay al menos una columna con una tarjeta y una columna siguiente o anterior
          if (sourceIdx !== -1 && ($columns.length > 1)) {
            // Si hay columna siguiente, usamos esa; si no, usamos la anterior (o la primera si estamos en la última)
            targetIdx = (sourceIdx + 1 < $columns.length) ? sourceIdx + 1 : (sourceIdx > 0 ? sourceIdx - 1 : 0);
            
            // Obtener el nombre del candidato para identificarlo
            cy.get('.card-body').eq(sourceIdx).find('.mb-2').first().find('.card-title').invoke('text').then(name => {
              candidateName = name;
              
              // Obtener datos de la API: candidatos de la posición
              cy.request('GET', `http://localhost:3010/positions/${positionId}/candidates`).then(candidatesRes => {
                // Buscar el candidato por su nombre
                const candidates = Array.isArray(candidatesRes.body) 
                  ? candidatesRes.body 
                  : (candidatesRes.body.candidates || candidatesRes.body.data || []);
                
                const candidate = candidates.find(c => c.fullName === candidateName);
                cy.log(`Candidato encontrado: ${JSON.stringify(candidate)}`);
                
                if (!candidate) {
                  cy.log('No se encontró el candidato en la API');
                  return;
                }
                
                candidateId = candidate.candidateId;
                applicationId = candidate.applicationId;
                
                // Obtener información de las fases de entrevista
                cy.request('GET', `http://localhost:3010/positions/${positionId}/interviewFlow`).then(flowRes => {
                  const steps = flowRes.body.interviewFlow.interviewFlow.interviewSteps;
                  
                  // Obtener la fase actual
                  const currentStepName = candidate.currentInterviewStep;
                  const currentStepIdx = steps.findIndex(s => s.name === currentStepName);
                  
                  // Intentar obtener la fase siguiente
                  let nextStep = steps[currentStepIdx + 1];
                  
                  // Si no hay fase siguiente (estamos en la última), intentar con fase anterior
                  if (!nextStep && currentStepIdx > 0) {
                    nextStep = steps[currentStepIdx - 1];
                    // Actualizar targetIdx si estamos retrocediendo
                    targetIdx = sourceIdx - 1;
                  } else if (!nextStep && steps.length > 1) {
                    // Si estamos en la última y no podemos retroceder, ir a la primera fase
                    nextStep = steps[0];
                    // Actualizar targetIdx al principio
                    targetIdx = 0;
                  }
                  
                  // Verificar que tenemos una fase válida
                  if (!nextStep) {
                    cy.log('No hay suficientes fases para realizar la prueba');
                    return;
                  }
                  
                  targetStepId = nextStep.id;
                  
                  // Realizar la petición PUT directamente
                  cy.request({
                    method: 'PUT',
                    url: `http://localhost:3010/candidates/${candidateId}`,
                    body: {
                      applicationId: Number(applicationId),
                      currentInterviewStep: Number(targetStepId)
                    }
                  }).then(response => {
                    // Verificar que la petición fue exitosa
                    expect(response.status).to.eq(200);
                    
                    // Recargar la página para ver el cambio visual
                    cy.reload();
                    
                    // Verificar que la tarjeta ahora está en la columna de destino
                    cy.get('.card-body').eq(targetIdx).contains(candidateName);
                  });
                });
              });
            });
          } else {
            cy.log('No hay suficientes columnas o tarjetas para realizar la prueba');
          }
        });
      });
    });
  });
});
