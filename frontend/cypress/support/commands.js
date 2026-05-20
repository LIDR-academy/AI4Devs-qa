// ***********************************************
// Custom commands for Cypress
// ***********************************************

/**
 * Comando personalizado para simular arrastrar y soltar un elemento
 * @param {string} sourceSelector - Selector del elemento que se va a arrastrar
 * @param {string} targetSelector - Selector del elemento donde se va a soltar
 */
Cypress.Commands.add('dragAndDrop', (sourceSelector, targetSelector) => {
  // Obtenemos los elementos de origen y destino
  cy.get(sourceSelector).should('exist');
  cy.get(targetSelector).should('exist');

  // Creamos un objeto DataTransfer para simular el arrastre
  const dataTransfer = new DataTransfer();

  // Simulamos el evento de inicio de arrastre en el elemento de origen
  cy.get(sourceSelector)
    .trigger('mousedown', { which: 1, button: 0 })
    .trigger('dragstart', { dataTransfer })
    .trigger('dragleave');

  // Simulamos el evento de soltar en el elemento de destino
  cy.get(targetSelector)
    .trigger('dragover', { dataTransfer })
    .trigger('drop', { dataTransfer })
    .trigger('dragend');

  // Completamos el arrastre
  cy.get(sourceSelector)
    .trigger('mouseup', { which: 1, button: 0 });
});

/**
 * Comando personalizado para simular arrastrar y soltar un candidato entre columnas
 * @param {number} candidateIndex - Índice del candidato dentro de su columna actual
 * @param {number} sourceColumnIndex - Índice de la columna de origen (0-based)
 * @param {number} targetColumnIndex - Índice de la columna de destino (0-based)
 */
Cypress.Commands.add('dragAndDropCandidate', (candidateIndex, sourceColumnIndex, targetColumnIndex) => {
  // Selector para la tarjeta del candidato en la columna de origen
  const sourceSelector = `.card-header:eq(${sourceColumnIndex}).parent().find('.card-body .card:eq(${candidateIndex})`;
  
  // Selector para el contenedor en la columna de destino donde se soltará el candidato
  const targetSelector = `.card-header:eq(${targetColumnIndex}).parent().find('.card-body')`;
  
  // Usamos el comando dragAndDrop
  cy.dragAndDrop(sourceSelector, targetSelector);
}); 