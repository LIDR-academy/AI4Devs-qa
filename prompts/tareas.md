Como un desarrollador frontend, con experiencia en React, Cypress y pruebas E2E con Typescript y javascript, has sido asignado a una nueva tarea en el proyecto de gestión de entrevistas.

Tu misión es aplicar la filosofía Mantente Simple (Keep It Simple, Stupid! aka KISS) y las buenas prácticas para pruebas E2E con Cypress para probar la interfaz "position" que has creado anteriormente. Vamos a asegurarnos de que la interfaz funciona correctamente mediante pruebas End-to-End (E2E).

* Crear Pruebas E2E para la Interfaz "position":

Debes crear pruebas E2E para verificar los siguientes escenarios:

Carga de la Página de Position:
Verifica que el título de la posición se muestra correctamente.
Verifica que se muestran las columnas correspondientes a cada fase del proceso de contratación.
Verifica que las tarjetas de los candidatos se muestran en la columna correcta según su fase actual.
Cambio de Fase de un Candidato:
Simula el arrastre de una tarjeta de candidato de una columna a otra.
Verifica que la tarjeta del candidato se mueve a la nueva columna.
Verifica que la fase del candidato se actualiza correctamente en el backend mediante el endpoint PUT /candidate/:id.

* Crear Pruebas E2E:

Crea un archivo de prueba position.spec.js en la carpeta /cypress/integration.
Escribe pruebas E2E para verificar la carga de la página y el cambio de fase de un candidato.
Añade un comando de ejecución de las pruebas en el package.json del proyecto con el siguiente comando 'npx cypress open'

Objetivos:
- Los cambios en las páginas, lógica, etc. en la carpeta /frontend.
- Un archivo prompts-DCA.md en la carpeta prompts con la descripción del ejercicio y las instrucciones necesarias para la ejecución de las pruebas E2E.