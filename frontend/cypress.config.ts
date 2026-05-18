import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implementar la detección de variables de entorno
      config.env = {
        ...config.env,
        // Valores por defecto que pueden ser sobreescritos por variables de entorno
        FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
        BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:3010',
      };
      
      return config;
    },
    baseUrl: 'http://localhost:3000', // URL base por defecto para el frontend
  },
});
