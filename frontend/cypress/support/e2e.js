// ***********************************************************
// This file is processed and loaded automatically before your test files.
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Configure drag-and-drop support
import '@4tw/cypress-drag-drop';

// Prevent Cypress from failing tests when an uncaught exception occurs
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
}); 