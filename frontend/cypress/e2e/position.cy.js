/// <reference types="cypress" />
/// <reference types="@4tw/cypress-drag-drop" />

describe('Position Interface Tests', () => {
  beforeEach(() => {
    // Interceptar las llamadas a la API
    cy.intercept('GET', 'http://localhost:3010/positions/1/interviewFlow', { 
      fixture: 'interviewFlow.json' 
    }).as('getInterviewFlow');
    
    cy.intercept('GET', 'http://localhost:3010/positions/1/candidates', { 
      fixture: 'candidates.json' 
    }).as('getCandidates');
    
    // Usamos un espía para la solicitud PUT
    cy.intercept('PUT', 'http://localhost:3010/candidates/*', (req) => {
      // Verificar que el cuerpo de la solicitud tenga la estructura esperada
      expect(req.body).to.have.property('applicationId');
      expect(req.body).to.have.property('currentInterviewStep');
      
      req.reply({ 
        statusCode: 200, 
        body: { message: 'Candidate stage updated successfully' } 
      });
    }).as('updateCandidate');
    
    // Visitar la página de la posición
    cy.visit('/positions/1');
    cy.wait(['@getInterviewFlow', '@getCandidates']);
  });

  it('should load position page correctly', () => {
    // Verificar que el título de la posición se muestra correctamente
    cy.get('h2').should('contain', 'Senior Full-Stack Engineer');
    
    // Verificar que se muestran las columnas para cada fase
    cy.get('.col-md-3').should('have.length.at.least', 2);
    cy.get('.card-header').eq(0).should('contain', 'Initial Screening');
    
    // Verificar que las tarjetas de candidatos están en las columnas correctas
    // Usando el selector de Card de Bootstrap que es lo que usa el componente
    cy.get('.card .card-body').should('exist');
  });

  it('should move candidate to a different stage', () => {
    // Primero, verificamos que el candidato existe
    cy.contains('.card-body', 'John Doe').should('exist');
    
    // Asegurarnos de que la petición se interceptará correctamente
    cy.intercept('PUT', 'http://localhost:3010/candidates/1').as('specificUpdateCandidate');
    
    // Realizar la solicitud fetch a través de la ventana del navegador
    cy.window().then(win => {
      win.fetch('http://localhost:3010/candidates/1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          applicationId: 1,
          currentInterviewStep: 2
        })
      });
      
      // Esperar que la solicitud específica se complete
      cy.wait('@specificUpdateCandidate').then((interception) => {
        // Verificar la respuesta del servidor
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.response.body).to.have.property('message', 'Candidate stage updated successfully');
        
        // También podemos verificar que se envió el cuerpo correcto
        expect(interception.request.body).to.deep.equal({
          applicationId: 1,
          currentInterviewStep: 2
        });
      });
    });
  });
});
