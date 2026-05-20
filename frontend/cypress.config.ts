import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 800,
    specPattern: [
      'cypress/e2e/**/*.{js,jsx,ts,tsx}',
      'cypress/integration/**/*.{js,jsx,ts,tsx}'
    ],
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
  },
});
