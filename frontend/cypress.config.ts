import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // URL base del frontend
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalRunAllSpecs: true,
    experimentalStudio: true,
    testIsolation: true,
    // No verificar que el servidor esté disponible
    experimentalSourceRewriting: false,
  },
});
