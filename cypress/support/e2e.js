// ***********************************************************
// Este archivo de soporte se carga automáticamente antes de las pruebas
// ***********************************************************

// Importar comandos
import './commands';

// Ocultar errores de la consola del navegador en los logs de Cypress
Cypress.on('uncaught:exception', (err, runnable) => {
  // Devolver false para evitar que Cypress falle la prueba
  return false;
}); 