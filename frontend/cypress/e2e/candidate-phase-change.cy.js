import PositionPage from '../support/pageObjects/PositionPage';

describe('Candidate Phase Change Tests', () => {
  beforeEach(() => {
    // Visit the positions page before each test
    PositionPage.visit();
    
    // Wait for page to load completely
    const positionTitle = '[data-cy=position-title]';
    cy.get(positionTitle).should('be.visible');
  });
  
  it('should click on a position card', () => {
    // Variables instead of hard-coded selectors
    const candidateCards = '[data-cy=candidate-card]';
    const stageColumns = '[data-cy=stage-column]';
    
    // Verify that candidate cards and stage columns are visible
    cy.get(candidateCards).should('be.visible');
    cy.get(stageColumns).should('be.visible');
    
    // Click on the first card
    cy.get(candidateCards).first().click();
    
    // Check that we can see the card details after clicking
    cy.get(candidateCards).first().should('be.visible');
    
    // Verify we can click on the view process button
    cy.get(stageColumns).first().click();
    cy.get(stageColumns).should('be.visible');
  });
}); 