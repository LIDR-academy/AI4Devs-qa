const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Setting up Cypress for end-to-end testing...');

// Initialize Cypress if it hasn't been initialized before
if (!fs.existsSync(path.join(__dirname, 'cypress'))) {
  console.log('Initializing Cypress...');
  execSync('npx cypress open', { stdio: 'inherit' });
}

// Create necessary directories if they don't exist
const directories = [
  path.join(__dirname, 'cypress/fixtures'),
  path.join(__dirname, 'cypress/e2e'),
  path.join(__dirname, 'cypress/support')
];

directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Create and configure cypress.config.js
const cypressConfig = `
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
`;

fs.writeFileSync(path.join(__dirname, 'cypress.config.js'), cypressConfig);
console.log('Created cypress.config.js');

// Create commands.js in support directory
const commandsJs = `
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Add Testing Library commands
import '@testing-library/cypress/add-commands';

// Custom command for dragging and dropping using react-beautiful-dnd
Cypress.Commands.add('dragAndDrop', (draggableSelector, droppableSelector) => {
  // Get required elements
  cy.get(draggableSelector).first().as('draggable');
  cy.get(droppableSelector).as('droppable');

  // Get the center position of both elements
  cy.get('@draggable').then($draggable => {
    const draggableRect = $draggable[0].getBoundingClientRect();
    const draggableX = draggableRect.left + draggableRect.width / 2;
    const draggableY = draggableRect.top + draggableRect.height / 2;

    cy.get('@droppable').then($droppable => {
      const droppableRect = $droppable[0].getBoundingClientRect();
      const droppableX = droppableRect.left + droppableRect.width / 2;
      const droppableY = droppableRect.top + droppableRect.height / 2;

      // Simulate the drag and drop operation
      cy.get('@draggable')
        .trigger('mousedown', { which: 1, pageX: draggableX, pageY: draggableY })
        .trigger('mousemove', { which: 1, pageX: droppableX, pageY: droppableY })
        .trigger('mouseup', { force: true });
    });
  });
});
`;

fs.writeFileSync(path.join(__dirname, 'cypress/support/commands.js'), commandsJs);
console.log('Created cypress/support/commands.js');

// Create e2e.js in support directory
const e2eJs = `
// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
`;

fs.writeFileSync(path.join(__dirname, 'cypress/support/e2e.js'), e2eJs);
console.log('Created cypress/support/e2e.js');

// Create mock data for backend
const positionFixture = {
  id: 1,
  title: "Senior Software Engineer",
  contactInfo: "John Doe",
  applicationDeadline: "2023-12-31",
  status: "Open"
};

fs.writeFileSync(path.join(__dirname, 'cypress/fixtures/position.json'), JSON.stringify(positionFixture, null, 2));
console.log('Created position.json fixture');

const interviewFlowFixture = {
  interviewFlow: {
    positionName: "Senior Software Engineer",
    interviewFlow: {
      interviewSteps: [
        { id: 1, name: "CV Review" },
        { id: 2, name: "Phone Interview" },
        { id: 3, name: "Technical Test" },
        { id: 4, name: "Final Interview" }
      ]
    }
  }
};

fs.writeFileSync(path.join(__dirname, 'cypress/fixtures/interviewFlow.json'), JSON.stringify(interviewFlowFixture, null, 2));
console.log('Created interviewFlow.json fixture');

const candidatesFixture = [
  {
    candidateId: 1,
    fullName: "Alice Smith",
    averageScore: 3,
    currentInterviewStep: "CV Review",
    applicationId: 101
  },
  {
    candidateId: 2,
    fullName: "Bob Johnson",
    averageScore: 4,
    currentInterviewStep: "Phone Interview",
    applicationId: 102
  },
  {
    candidateId: 3,
    fullName: "Charlie Brown",
    averageScore: 2,
    currentInterviewStep: "Technical Test",
    applicationId: 103
  },
  {
    candidateId: 4,
    fullName: "Diana Prince",
    averageScore: 5,
    currentInterviewStep: "Final Interview",
    applicationId: 104
  }
];

fs.writeFileSync(path.join(__dirname, 'cypress/fixtures/candidates.json'), JSON.stringify(candidatesFixture, null, 2));
console.log('Created candidates.json fixture');

console.log('Cypress setup complete! You can now run cypress with npm run cypress:open or npm run cypress:run'); 