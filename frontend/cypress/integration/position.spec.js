/// <reference types="cypress" />

describe('Position Page Tests', () => {
  // Mock data for our tests
  const mockPosition = {
    id: 1,
    title: 'Frontend Developer',
    interviewFlow: {
      positionName: 'Frontend Developer',
      interviewFlow: {
        interviewSteps: [
          { id: 1, name: 'Application Review' },
          { id: 2, name: 'Phone Screening' },
          { id: 3, name: 'Technical Interview' },
          { id: 4, name: 'Final Interview' }
        ]
      }
    }
  };

  const mockCandidates = [
    { candidateId: 1, fullName: 'John Doe', currentInterviewStep: 'Application Review', applicationId: 101, averageScore: 4.5 },
    { candidateId: 2, fullName: 'Jane Smith', currentInterviewStep: 'Phone Screening', applicationId: 102, averageScore: 4.2 },
    { candidateId: 3, fullName: 'Bob Johnson', currentInterviewStep: 'Technical Interview', applicationId: 103, averageScore: 3.8 }
  ];

  beforeEach(() => {
    // Intercept API calls and return mock data
    cy.intercept('GET', 'http://localhost:3010/positions/1/interviewFlow', {
      statusCode: 200,
      body: { interviewFlow: mockPosition.interviewFlow }
    }).as('getInterviewFlow');

    cy.intercept('GET', 'http://localhost:3010/positions/1/candidates', {
      statusCode: 200,
      body: mockCandidates
    }).as('getCandidates');

    // Intercept PUT requests for candidate updates
    cy.intercept('PUT', 'http://localhost:3010/candidates/*', {
      statusCode: 200,
      body: { message: 'Candidate stage updated successfully' }
    }).as('updateCandidate');

    // Visit the position details page
    cy.visit('/positions/1');
    
    // Wait for API calls to complete
    cy.wait('@getInterviewFlow');
    cy.wait('@getCandidates');
  });

  describe('Page Load: Position Page', () => {
    it('should display the position title correctly', () => {
      cy.get('[data-cy="position-title"]')
        .should('be.visible')
        .and('contain', mockPosition.interviewFlow.positionName);
    });

    it('should display all phases of the hiring process as columns', () => {
      // Check that we have the correct number of columns
      cy.get('[data-cy^="stage-column-"]').should('have.length', 4);
      
      // Check each column title
      cy.get('[data-cy="stage-title-0"]').should('contain', 'Application Review');
      cy.get('[data-cy="stage-title-1"]').should('contain', 'Phone Screening');
      cy.get('[data-cy="stage-title-2"]').should('contain', 'Technical Interview');
      cy.get('[data-cy="stage-title-3"]').should('contain', 'Final Interview');
    });

    it('should display candidate cards in the appropriate column according to their current phase', () => {
      // Check that candidates are in the correct columns
      cy.get('[data-cy="stage-column-0"]').should('contain', 'John Doe');
      cy.get('[data-cy="stage-column-1"]').should('contain', 'Jane Smith');
      cy.get('[data-cy="stage-column-2"]').should('contain', 'Bob Johnson');
    });
  });

  describe('Candidate Phase Change (Drag and Drop)', () => {
    it('should move a candidate card from one phase column to another', () => {
      // Get the first candidate card
      cy.get('[data-cy="candidate-1"]').as('candidateCard');
      
      // Get the destination column (Phone Screening)
      cy.get('[data-cy="droppable-area-1"]').as('destinationColumn');
      
      // Perform drag and drop using our custom command for react-beautiful-dnd
      cy.dragAndDrop('[data-cy="candidate-1"]', '[data-cy="droppable-area-1"]');
      
      // Verify the card is visually moved to the new column
      cy.get('[data-cy="stage-column-1"]').should('contain', 'John Doe');
      
      // Verify that a PUT request was sent with the correct data
      cy.wait('@updateCandidate').then((interception) => {
        expect(interception.request.url).to.include('/candidates/1');
        expect(interception.request.method).to.equal('PUT');
        // Use deep.equal for comparing objects
        expect(interception.request.body).to.deep.equal({
          applicationId: 101,
          currentInterviewStep: 2
        });
      });
    });
  });
});
