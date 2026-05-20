
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
