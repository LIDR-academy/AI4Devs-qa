# Prompts para Automatización de Pruebas E2E y Documentación

## 1. Crear pruebas E2E para la interfaz "position" usando Cypress

- Crea un archivo en `frontend/cypress/e2e/positions.cy.js`.
- Implementa los siguientes escenarios:

### Escenario 1: Carga de la Página de Position
- Verifica que el título de la posición se muestra correctamente.
- Verifica que se muestran las columnas correspondientes a cada fase del proceso de contratación.
- Verifica que las tarjetas de los candidatos se muestran en la columna correcta según su fase actual.

### Escenario 2: Cambio de Fase de un Candidato
- Simula el arrastre de una tarjeta de candidato de una columna a otra.
- Verifica que la tarjeta del candidato se mueve a la nueva columna.
- Verifica que la fase del candidato se actualiza correctamente en el backend mediante el endpoint PUT `/candidate/:id`.

## 2. Agregar instrucciones al README

- Añade una sección al archivo `frontend/README.md` con instrucciones en español para:
  - Instalar dependencias.
  - Ejecutar las pruebas E2E con Cypress (modo interactivo y headless).
  - Estructura de carpetas relevante.
  - Notas sobre la preparación de datos y endpoints.

## 3. Realizar Pull Request

- Realiza un pull request en el repositorio incluyendo los cambios en las páginas, lógica, pruebas y documentación en la carpeta `/frontend`.
- Asegúrate de que el PR incluya:
  - El archivo de pruebas E2E.
  - Las instrucciones en el README.
  - Cualquier ajuste necesario en la lógica o selectores para que los tests funcionen correctamente.

---

**Nota:**
- Todos los prompts y pasos deben estar en español.
- Guarda este archivo como `prompts-AAI.md` en la carpeta `prompts` en la raíz del proyecto. 