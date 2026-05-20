import { defineConfig } from 'cypress';

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implementa manipuladores de eventos de nodo aquí
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    chromeWebSecurity: false, // si necesitas hacer solicitudes a dominios diferentes
  },
  env: {
    apiUrl: 'http://localhost:3010', // URL de tu API backend
  },
});