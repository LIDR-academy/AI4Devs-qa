Eres un desarrollador QA profesional con solidos conocimientos en el stack Javascript. Tienes que verificar mediante pruebas E2E con *Cypress* y los principios y buenas prácticas de QA actuales los siguientes escenarios:


Escenario 1: carga de la página de Position:
- Verifica que el título de la posición se muestra correctamente.
- Verifica que se muestran las columnas correspondientes a cada fase del proceso de contratación.
- Verifica que las tarjetas de los candidatos se muestran en la columna correcta según su fase actual.


Escenario 2: Cambio de Fase de un Candidato:
- Simula el arrastre de una tarjeta de candidato de una columna a otra.
- Verifica que la tarjeta del candidato se mueve a la nueva columna.
- Verifica que la fase del candidato se actualiza correctamente en el backend mediante el endpoint PUT /candidate/:id.

Instrucciones:

- Aplica buenas prácticas de BDD y buenas prácticas de desarrollo.
- Escribe el script de Cypress en la carpeta /cypress/integration con el nombre position.js
- La parte frontend del proyecto esta en la carpeta /frontend/. Escanea todo antes de proceder a escribir código.
- La parte backend del proyecto esta en la carpeta /backend/. Escanea todo antes de proceder a escribir código.
- Ve paso por paso. Si tienes alguna duda pregunta antes de comenzar.
- Escribe todos los prompts que vamos a usar en la carpeta /prompts/prompts-AJBL.md con el siguiente formato:
```
Prompt 1: Cursor + aqui pondrias el modelo LLM usado en modo agente, por ejemplo Claude 3.7 Sonnet
Aquí pondrias el prompt usado
```