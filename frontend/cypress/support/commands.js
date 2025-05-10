// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Importar la biblioteca de drag and drop
import '@4tw/cypress-drag-drop';

// Comando personalizado para arrastrar y soltar elementos
Cypress.Commands.add('dragAndDrop', (subject, target) => {
  cy.get(subject).trigger('mousedown', { which: 1 });
  cy.get(target).trigger('mousemove').trigger('mouseup', { force: true });
});

// Comando alternativo para simular drag and drop sin la biblioteca externa
Cypress.Commands.add('dragTo', { prevSubject: 'element' }, (subject, targetSelector) => {
  const BUTTON_INDEX = 0;
  const SLOPPY_CLICK_THRESHOLD = 10;
  
  cy.wrap(subject)
    .trigger('mousedown', { which: BUTTON_INDEX, force: true })
    .trigger('mousemove', { clientX: SLOPPY_CLICK_THRESHOLD, clientY: SLOPPY_CLICK_THRESHOLD, force: true });
  
  cy.get(targetSelector)
    .trigger('mousemove', { clientX: SLOPPY_CLICK_THRESHOLD, clientY: SLOPPY_CLICK_THRESHOLD, force: true })
    .trigger('mouseup', { force: true });
});

// Comando específico para react-beautiful-dnd
Cypress.Commands.add('moveCard', { prevSubject: false }, (sourceSelector, destinationSelector) => {
  // Forzar react-beautiful-dnd a usar la API de eventos nativos en lugar de la API de arrastrar y soltar de HTML5
  cy.window().then((win) => {
    // Primero, encontrar el elemento de origen y destino
    cy.get(sourceSelector).first().then($source => {
      const sourceCoords = $source[0].getBoundingClientRect();
      
      cy.get(destinationSelector).then($destination => {
        const destCoords = $destination[0].getBoundingClientRect();
        
        // Iniciar arrastre en el centro del elemento de origen
        cy.get(sourceSelector)
          .first()
          .trigger('mousedown', { 
            button: 0, 
            clientX: sourceCoords.left + sourceCoords.width / 2, 
            clientY: sourceCoords.top + sourceCoords.height / 2,
            force: true
          })
          .trigger('mousemove', { 
            button: 0, 
            clientX: sourceCoords.left + sourceCoords.width / 2 + 5, 
            clientY: sourceCoords.top + sourceCoords.height / 2 + 5,
            force: true
          });
        
        // Mover hacia el destino
        cy.get('body')
          .trigger('mousemove', { 
            button: 0, 
            clientX: destCoords.left + destCoords.width / 2, 
            clientY: destCoords.top + destCoords.height / 2,
            force: true
          });
        
        // Soltar en el destino
        cy.get(destinationSelector)
          .trigger('mouseup', { 
            button: 0, 
            clientX: destCoords.left + destCoords.width / 2, 
            clientY: destCoords.top + destCoords.height / 2,
            force: true
          });
      });
    });
  });
}); 