describe('Position Page', () => {
  // Definimos un identificador de posición para las pruebas
  const positionId = 1;

  beforeEach(() => {
    // Interceptamos las llamadas a la API para simular respuestas
    cy.intercept('GET', `http://localhost:3010/positions/${positionId}/interviewFlow`, {
      statusCode: 200,
      body: {
        interviewFlow: {
          interviewFlow: {
            interviewSteps: [
              { id: 1, name: 'CV Review' },
              { id: 2, name: 'Phone Interview' },
              { id: 3, name: 'Technical Test' },
              { id: 4, name: 'Final Interview' }
            ]
          },
          positionName: 'Software Developer'
        }
      }
    }).as('getInterviewFlow');

    cy.intercept('GET', `http://localhost:3010/positions/${positionId}/candidates`, {
      statusCode: 200,
      body: [
        {
          candidateId: 1,
          fullName: 'John Doe',
          averageScore: 3,
          currentInterviewStep: 'CV Review',
          applicationId: 101
        },
        {
          candidateId: 2,
          fullName: 'Jane Smith',
          averageScore: 4,
          currentInterviewStep: 'Phone Interview',
          applicationId: 102
        },
        {
          candidateId: 3,
          fullName: 'Robert Johnson',
          averageScore: 2,
          currentInterviewStep: 'CV Review',
          applicationId: 103
        }
      ]
    }).as('getCandidates');

    // Visitamos la página de posición
    cy.visit(`/positions/${positionId}`);
    
    // Esperamos a que las llamadas a la API se completen
    cy.wait('@getInterviewFlow');
    cy.wait('@getCandidates');
  });

  it('Debería mostrar el título de la posición correctamente', () => {
    cy.get('h2').should('contain.text', 'Software Developer');
  });

  it('Debería renderizar correctamente las columnas para cada fase del proceso', () => {
    // Verificamos que se rendericen las 4 columnas
    cy.get('.card-header').should('have.length', 4);
    
    // Verificamos los nombres de las columnas
    cy.get('.card-header').eq(0).should('contain.text', 'CV Review');
    cy.get('.card-header').eq(1).should('contain.text', 'Phone Interview');
    cy.get('.card-header').eq(2).should('contain.text', 'Technical Test');
    cy.get('.card-header').eq(3).should('contain.text', 'Final Interview');
  });

  it('Debería mostrar las tarjetas de candidatos en las columnas correspondientes', () => {
    // Verificamos que los candidatos estén en las columnas correctas
    cy.get('.card-header').eq(0).parent().find('.card-body .card').should('have.length', 2); // 2 candidatos en CV Review
    cy.get('.card-header').eq(1).parent().find('.card-body .card').should('have.length', 1); // 1 candidato en Phone Interview
    
    // Verificamos nombres específicos
    cy.get('.card-header').eq(0).parent().find('.card-body .card').eq(0).should('contain.text', 'John Doe');
    cy.get('.card-header').eq(0).parent().find('.card-body .card').eq(1).should('contain.text', 'Robert Johnson');
    cy.get('.card-header').eq(1).parent().find('.card-body .card').eq(0).should('contain.text', 'Jane Smith');
  });

  it('Debería permitir arrastrar un candidato de una columna a otra', () => {
    // Interceptamos la llamada PUT para actualizar el estado del candidato
    cy.intercept('PUT', 'http://localhost:3010/candidates/1', {
      statusCode: 200,
      body: { success: true }
    }).as('updateCandidate');
    
    // Utilizamos nuestro comando personalizado para arrastrar el candidato
    cy.dragAndDropCandidate(0, 0, 1); // Arrastrar el primer candidato (John Doe) de la columna 0 (CV Review) a la columna 1 (Phone Interview)
    
    // Verificamos que se haya hecho la llamada PUT para actualizar el estado
    cy.wait('@updateCandidate').then((interception) => {
      // Verificamos que la solicitud contenga los datos correctos
      expect(interception.request.body).to.include({
        applicationId: 101,  // ID de aplicación de John Doe
        currentInterviewStep: 2   // ID del paso "Phone Interview"
      });
    });
    
    // Verificamos que la interfaz se haya actualizado
    cy.get('.card-header').eq(0).parent().find('.card-body .card').should('have.length', 1); // Ahora solo queda 1 en CV Review
    cy.get('.card-header').eq(1).parent().find('.card-body .card').should('have.length', 2); // Ahora hay 2 en Phone Interview
    
    // Verificamos que John Doe ahora aparece en Phone Interview
    cy.get('.card-header').eq(1).parent().find('.card-body .card').eq(1).should('contain.text', 'John Doe');
  });

  it('Debería actualizar correctamente la fase de un candidato en el backend', () => {
    // Interceptamos la llamada PUT para actualizar el estado del candidato
    cy.intercept('PUT', 'http://localhost:3010/candidates/1', (req) => {
      // Verificamos que los datos de la solicitud sean correctos
      expect(req.body).to.have.property('applicationId', 101);
      expect(req.body).to.have.property('currentInterviewStep', 3);
      
      // Respondemos con éxito
      req.reply({
        statusCode: 200,
        body: {
          success: true,
          candidateId: 1,
          applicationId: 101,
          currentInterviewStep: 'Technical Test'
        }
      });
    }).as('updateCandidateTechnical');
    
    // Arrastramos el candidato directamente a la fase "Technical Test" (columna 2)
    cy.dragAndDropCandidate(0, 0, 2);
    
    // Esperamos a que se complete la solicitud
    cy.wait('@updateCandidateTechnical');
    
    // Verificamos que la interfaz refleje el cambio
    cy.get('.card-header').eq(0).parent().find('.card-body .card').should('have.length', 1); // Solo queda 1 en CV Review
    cy.get('.card-header').eq(2).parent().find('.card-body .card').should('have.length', 1); // Ahora hay 1 en Technical Test
    cy.get('.card-header').eq(2).parent().find('.card-body .card').eq(0).should('contain.text', 'John Doe');
  });
}); 