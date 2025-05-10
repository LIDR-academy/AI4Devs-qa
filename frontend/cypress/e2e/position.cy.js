describe('Position Interface', () => {
  beforeEach(() => {
    // Mock the interview flow API response
    cy.intercept('GET', 'http://localhost:3010/positions/1/interviewFlow', {
      statusCode: 200,
      body: {
        interviewFlow: {
          interviewFlow: {
            interviewSteps: [
              { id: 1, name: 'Applied' },
              { id: 2, name: 'Interview' },
              { id: 3, name: 'Offer' },
              { id: 4, name: 'Hired' }
            ]
          },
          positionName: 'Software Engineer'
        }
      }
    }).as('getInterviewFlow');

    // Mock the candidates API response
    cy.intercept('GET', 'http://localhost:3010/positions/1/candidates', {
      statusCode: 200,
      body: [
        {
          candidateId: 1,
          fullName: 'John Doe',
          currentInterviewStep: 'Applied',
          applicationId: 101,
          averageScore: 4.5
        },
        {
          candidateId: 2,
          fullName: 'Jane Smith',
          currentInterviewStep: 'Interview',
          applicationId: 102,
          averageScore: 4.8
        }
      ]
    }).as('getCandidates');

    // Mock the candidate update endpoint
    cy.intercept('PUT', 'http://localhost:3010/candidates/*', {
      statusCode: 200,
      body: {
        success: true
      }
    }).as('updateCandidate');

    // Visit the position page
    cy.visit('/positions/1');
    cy.wait('@getInterviewFlow');
    cy.wait('@getCandidates');
  });

  describe('Page Load', () => {
    it('should display the position title correctly', () => {
      cy.get('h2')
        .should('be.visible')
        .and('contain', 'Software Engineer');
    });

    it('should display all hiring phases as columns', () => {
      const phases = ['Applied', 'Interview', 'Offer', 'Hired'];
      phases.forEach(phase => {
        cy.get('.card-header')
          .should('contain', phase);
      });
    });

    it('should display candidates in their correct phase columns', () => {
      // Check Applied phase
      cy.get('.card-header')
        .contains('Applied')
        .parent()
        .find('.card-body')
        .find('.card')
        .should('contain', 'John Doe');

      // Check Interview phase
      cy.get('.card-header')
        .contains('Interview')
        .parent()
        .find('.card-body')
        .find('.card')
        .should('contain', 'Jane Smith');
    });
  });

  describe('Candidate Phase Changes', () => {
    it('should allow dragging a candidate card to a different phase', () => {
      // Find the Applied column and its first candidate card
      cy.get('[data-rbd-draggable-id="1"]')
        .as('sourceCard');

      // Find the Interview column's drop zone
      cy.get('.card-header')
        .contains('Interview')
        .parent()
        .find('.card-body')
        .first()
        .as('targetDropZone');

      // Start drag
      cy.get('@sourceCard')
        .trigger('mousedown', { button: 0, force: true })
        .trigger('dragstart', { force: true });

      // Handle drop
      cy.get('@targetDropZone')
        .trigger('dragenter', { force: true })
        .trigger('dragover', { force: true })
        .trigger('drop', { force: true });

      // End drag
      cy.get('@sourceCard')
        .trigger('dragend', { force: true })
        .trigger('mouseup', { button: 0, force: true });

      // Verify the API call was made
      cy.wait('@updateCandidate', { timeout: 10000 }).its('request.body').should('deep.include', {
        currentInterviewStep: 2
      });

      // Verify the card moved visually
      cy.get('.card-header')
        .contains('Interview')
        .parent()
        .find('.card-body')
        .find('.card')
        .should('contain', 'John Doe');
    });

    it('should handle failed phase updates gracefully', () => {
      // Mock a failed API response
      cy.intercept('PUT', 'http://localhost:3010/candidates/*', {
        statusCode: 500,
        body: {
          error: 'Failed to update candidate step'
        }
      }).as('failedUpdate');

      // Find the Applied column and its first candidate card
      cy.get('[data-rbd-draggable-id="1"]')
        .as('sourceCard');

      // Find the Interview column's drop zone
      cy.get('.card-header')
        .contains('Interview')
        .parent()
        .find('.card-body')
        .first()
        .as('targetDropZone');

      // Start drag
      cy.get('@sourceCard')
        .trigger('mousedown', { button: 0, force: true })
        .trigger('dragstart', { force: true });

      // Handle drop
      cy.get('@targetDropZone')
        .trigger('dragenter', { force: true })
        .trigger('dragover', { force: true })
        .trigger('drop', { force: true });

      // End drag
      cy.get('@sourceCard')
        .trigger('dragend', { force: true })
        .trigger('mouseup', { button: 0, force: true });

      // Verify error message is displayed
      cy.get('.alert-danger')
        .should('be.visible')
        .and('contain', 'Error updating candidate step');

      // Verify the card remains in its original position
      cy.get('.card-header')
        .contains('Applied')
        .parent()
        .find('.card-body')
        .find('.card')
        .should('contain', 'John Doe');
    });
  });
}); 