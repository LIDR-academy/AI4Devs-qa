/// <reference types="cypress" />

describe('Position Page E2E Tests', () => {
  beforeEach(() => {
    // Intercept API calls and provide mock data
    cy.intercept('GET', 'http://localhost:3010/positions/1/interviewFlow', {
      fixture: 'interviewFlow.json'
    }).as('getInterviewFlow');

    cy.intercept('GET', 'http://localhost:3010/positions/1/candidates', {
      fixture: 'candidates.json'
    }).as('getCandidates');

    cy.intercept('PUT', 'http://localhost:3010/candidates/*', (req) => {
      // Return a successful response for the PUT request
      req.reply({
        statusCode: 200,
        body: { success: true }
      });
    }).as('updateCandidate');

    // Visit the position details page
    cy.visit('/positions/1');

    // Wait for API responses
    cy.wait('@getInterviewFlow');
    cy.wait('@getCandidates');
  });

  it('should display the position title correctly', () => {
    // Check that the position title is displayed
    cy.contains('h2', 'Senior Software Engineer').should('be.visible');
  });

  it('should display all phases (columns) for the position', () => {
    // Check that all the phases from the interview flow are displayed as columns
    cy.contains('.card-header', 'CV Review').should('be.visible');
    cy.contains('.card-header', 'Phone Interview').should('be.visible');
    cy.contains('.card-header', 'Technical Test').should('be.visible');
    cy.contains('.card-header', 'Final Interview').should('be.visible');
  });

  it('should display candidates in the correct columns based on their stage', () => {
    // Check CV Review column has Alice Smith
    cy.get('.card-header').contains('CV Review')
      .parents('.card')
      .find('.card-body')
      .contains('Alice Smith')
      .should('be.visible');

    // Check Phone Interview column has Bob Johnson
    cy.get('.card-header').contains('Phone Interview')
      .parents('.card')
      .find('.card-body')
      .contains('Bob Johnson')
      .should('be.visible');

    // Check Technical Test column has Charlie Brown
    cy.get('.card-header').contains('Technical Test')
      .parents('.card')
      .find('.card-body')
      .contains('Charlie Brown')
      .should('be.visible');

    // Check Final Interview column has Diana Prince
    cy.get('.card-header').contains('Final Interview')
      .parents('.card')
      .find('.card-body')
      .contains('Diana Prince')
      .should('be.visible');

    // Verify the candidates are in their correct columns
    cy.get('.card').eq(0).contains('Alice Smith').should('exist');
    cy.get('.card').eq(1).contains('Bob Johnson').should('exist');
    cy.get('.card').eq(2).contains('Charlie Brown').should('exist');
    cy.get('.card').eq(3).contains('Diana Prince').should('exist');
  });

  it('should move a candidate card to a different column via drag and drop', () => {
    // Get the first candidate (Alice Smith)
    cy.contains('.card', 'Alice Smith').as('aliceCard');
    
    // Get the destination column (Phone Interview)
    cy.get('.card-header').contains('Phone Interview').parents('.card').as('phoneColumn');
    
    // Performing drag and drop using our custom command from commands.js
    cy.get('@aliceCard').then($card => {
      const rect = $card[0].getBoundingClientRect();
      cy.get('@aliceCard')
        .trigger('mousedown', { 
          button: 0, 
          clientX: rect.x + rect.width / 2, 
          clientY: rect.y + rect.height / 2 
        })
        .trigger('mousemove', { 
          button: 0, 
          clientX: rect.x + rect.width / 2 + 50, 
          clientY: rect.y + rect.height / 2 
        });
      
      cy.get('@phoneColumn').then($column => {
        const colRect = $column[0].getBoundingClientRect();
        cy.get('@aliceCard')
          .trigger('mousemove', { 
            button: 0, 
            clientX: colRect.x + colRect.width / 2, 
            clientY: colRect.y + colRect.height / 2 
          })
          .trigger('mouseup');
      });
    });

    // Verify that the API was called with correct parameters
    cy.wait('@updateCandidate').then((interception) => {
      // Check if the request body contains the expected values
      expect(interception.request.body).to.have.property('applicationId', 101);
      expect(interception.request.body).to.have.property('currentInterviewStep', 2); // ID for Phone Interview
    });
    
    // Verify the card moved to the Phone Interview column
    cy.get('.card-header').contains('Phone Interview')
      .parents('.card')
      .find('.card-body')
      .contains('Alice Smith')
      .should('be.visible');
      
    // Verify the card is no longer in CV Review column
    cy.get('.card-header').contains('CV Review')
      .parents('.card')
      .find('.card-body')
      .contains('Alice Smith')
      .should('not.exist');
  });
}); 