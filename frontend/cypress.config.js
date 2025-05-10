const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    experimentalModifyObstructiveThirdPartyCode: true, // Ayuda con librerías de terceros
    chromeWebSecurity: false // Necesario para algunas operaciones complejas
  },
  env: {
    // Hacer que react-beautiful-dnd crea que está fuera de un entorno de pruebas
    REACT_APP_TEST_ENVIRONMENT: false 
  }
}); 