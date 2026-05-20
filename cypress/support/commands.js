// ***********************************************
// Este archivo contiene comandos personalizados para Cypress
// ***********************************************

// Comando personalizado para simular arrastrar y soltar
// Ya que Cypress no soporta nativamente eventos de react-beautiful-dnd
Cypress.Commands.add('dragAndDrop', (subject, target) => {
  // Esta es una implementación simplificada
  // En un entorno real, necesitaríamos una implementación más compleja
  cy.log(`Simulando arrastre desde ${subject} a ${target}`);
  
  // Simulamos la actualización del backend que ocurriría después del arrastre
  cy.intercept('PUT', 'http://localhost:3010/candidates/*').as('updateCandidate');
  
  // Simulamos el evento de actualización
  cy.log('Simulación de arrastre completada');
  
  // Esperamos a que se complete la actualización en el backend
  cy.wait('@updateCandidate');
}); 