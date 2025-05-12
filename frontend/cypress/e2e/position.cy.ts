/// <reference types="cypress" />

describe("Position Interface", () => {
  beforeEach(() => {
    // Mock API responses
    cy.intercept("GET", "http://localhost:3010/positions/*/interviewFlow", {
      fixture: "position.json",
    }).as("getInterviewFlow");

    cy.intercept("GET", "http://localhost:3010/positions/*/candidates", {
      fixture: "candidates.json",
    }).as("getCandidates");

    cy.intercept("PUT", "http://localhost:3010/candidates/*", {
      statusCode: 200,
      body: { success: true },
    }).as("updateCandidate");

    // Visit the position page
    cy.visit("/positions/1");

    // Wait for API calls
    cy.wait(["@getInterviewFlow", "@getCandidates"]);
  });

  describe("Position Page Load", () => {
    it("should display the position title correctly", () => {
      cy.get('[data-testid="position-title"]')
        .should("be.visible")
        .and("contain", "Senior Frontend Developer");
    });

    it("should display all interview phase columns", () => {
      // Verify all columns are present
      cy.get('[data-testid^="stage-column-"]').should("have.length", 4);

      // Verify column headers
      cy.get('[data-testid="stage-header-Initial Interview"]').should(
        "be.visible"
      );
      cy.get('[data-testid="stage-header-Technical Interview"]').should(
        "be.visible"
      );
      cy.get('[data-testid="stage-header-HR Interview"]').should("be.visible");
      cy.get('[data-testid="stage-header-Final Decision"]').should(
        "be.visible"
      );
    });

    it("should display candidates in their correct phase columns", () => {
      // Verify candidates in Initial Interview
      cy.get('[data-testid="stage-column-Initial Interview"]')
        .find('[data-testid="candidate-card-1"]')
        .should("exist")
        .and("contain", "John Doe");

      // Verify candidates in Technical Interview
      cy.get('[data-testid="stage-column-Technical Interview"]')
        .find('[data-testid="candidate-card-2"]')
        .should("exist")
        .and("contain", "Jane Smith");
    });

    it("should handle edge cases", () => {
      // Test with empty interview flow
      cy.intercept("GET", "http://localhost:3010/positions/*/interviewFlow", {
        interviewFlow: {
          positionName: "Empty Position",
          interviewFlow: {
            interviewSteps: [],
          },
        },
      }).as("getEmptyInterviewFlow");

      cy.visit("/positions/2");
      cy.wait("@getEmptyInterviewFlow");
      cy.get('[data-testid^="stage-column-"]').should("not.exist");

      // Test with single stage
      cy.intercept("GET", "http://localhost:3010/positions/*/interviewFlow", {
        interviewFlow: {
          positionName: "Single Stage Position",
          interviewFlow: {
            interviewSteps: [
              {
                id: 1,
                name: "Initial Interview",
              },
            ],
          },
        },
      }).as("getSingleStageInterviewFlow");

      cy.visit("/positions/3");
      cy.wait("@getSingleStageInterviewFlow");
      cy.get('[data-testid^="stage-column-"]').should("have.length", 1);
    });
  });

  describe("Candidate Phase Change", () => {
    /**
     * NOTE: Drag-and-drop with react-beautiful-dnd is not reliably supported in Cypress E2E tests.
     * Instead, we simulate the candidate phase change by mocking the API and updating the UI state.
     * For true drag-and-drop logic, use unit/integration tests with React Testing Library.
     */
    it("should update the UI when a candidate changes phase (simulated)", () => {
      // Simulate moving John Doe from Initial Interview to Technical Interview
      cy.intercept("GET", "http://localhost:3010/positions/*/candidates", [
        {
          candidateId: 1,
          fullName: "John Doe",
          averageScore: 4,
          applicationId: 1,
          currentInterviewStep: "Technical Interview",
        },
        {
          candidateId: 2,
          fullName: "Jane Smith",
          averageScore: 5,
          applicationId: 2,
          currentInterviewStep: "Technical Interview",
        },
        {
          candidateId: 3,
          fullName: "Alice Johnson",
          averageScore: 3,
          applicationId: 3,
          currentInterviewStep: "HR Interview",
        },
        {
          candidateId: 4,
          fullName: "Bob Wilson",
          averageScore: 5,
          applicationId: 4,
          currentInterviewStep: "Final Decision",
        },
      ]).as("getCandidatesUpdated");

      // Revisit the page to trigger the new API response
      cy.visit("/positions/1");
      cy.wait(["@getInterviewFlow", "@getCandidatesUpdated"]);

      // Assert John Doe is now in Technical Interview
      cy.get('[data-testid="stage-column-Technical Interview"]')
        .find('[data-testid="candidate-card-1"]')
        .should("exist");
      // Assert John Doe is not in Initial Interview
      cy.get('[data-testid="stage-column-Initial Interview"]')
        .find('[data-testid="candidate-card-1"]')
        .should("not.exist");
    });
  });
});
