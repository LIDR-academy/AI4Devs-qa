// ***********************************************
// Custom commands for Cypress tests
// ***********************************************

// Login command as suggested in the instructions
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  
  // Use variables for selectors
  const emailField = '[data-cy=email]';
  const passwordField = '[data-cy=password]';
  const submitButton = '[data-cy=submit-button]';
  
  cy.get(emailField).type(email);
  cy.get(passwordField).type(password);
  cy.get(submitButton).click();
});

// Navigate to positions page
Cypress.Commands.add('navigateToPositions', () => {
  cy.visit('/positions');
});

// Drag and drop a candidate card from one column to another
Cypress.Commands.add('dragCandidateToColumn', (candidateId, targetColumnId) => {
  // Use data-cy attribute for selecting elements
  const candidateCard = `[data-cy=candidate-card][data-candidate-id="${candidateId}"]`;
  const targetColumn = `[data-cy=stage-column][data-stage-id="${targetColumnId}"]`;
  
  cy.get(candidateCard).drag(targetColumn);
}); 