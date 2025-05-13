import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Permitir sobrescribir valores de ENV desde variables de entorno del sistema
      // Esto es especialmente útil en entornos CI/CD
      const frontendUrl = process.env.FRONTEND_URL || config.env.FRONTEND_URL || 'http://localhost:3000';
      const backendUrl = process.env.BACKEND_URL || config.env.BACKEND_URL || 'http://localhost:3010';
      
      config.env = {
        ...config.env,
        FRONTEND_URL: frontendUrl,
        BACKEND_URL: backendUrl,
      };
      
      // Log para depuración en CI/CD
      console.log('Cypress ENV:', config.env);
      
      return config;
    },
    baseUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
    video: false, // Desactivar grabación de video en CI/CD para mejorar rendimiento
    screenshotOnRunFailure: true,
  },
}); 