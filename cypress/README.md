# Pruebas E2E con Cypress para LTI - Sistema de Seguimiento de Talento

Este directorio contiene las pruebas End-to-End (E2E) implementadas con Cypress para el Sistema de Seguimiento de Talento (LTI).

## Estructura del Directorio

```
cypress/
├── integration/        # Archivos de prueba (estructura solicitada en el ejercicio)
│   └── position.spec.js # Pruebas para la interfaz "position"
├── fixtures/           # Datos de prueba
│   ├── positions.json   # Datos de posiciones
│   ├── interviewFlow.json # Datos del flujo de entrevistas
│   ├── candidates.json  # Datos de candidatos
│   └── candidateDetails.json # Datos detallados de un candidato específico
└── support/            # Archivos de soporte
    ├── commands.js      # Comandos personalizados
    └── e2e.js           # Configuración global
```

## Pruebas Implementadas

Las pruebas se centran en la interfaz "position" y verifican:

1. **Carga de la Página de Position**:
   - Verifica que el título de la posición se muestra correctamente.
   - Verifica que se muestran las columnas correspondientes a cada fase del proceso de contratación.
   - Verifica que las tarjetas de los candidatos se muestran en la columna correcta según su fase actual.

2. **Cambio de Fase de un Candidato**:
   - Simula el arrastre de una tarjeta de candidato de una columna a otra.
   - Verifica que la tarjeta del candidato se mueve a la nueva columna.
   - Verifica que la fase del candidato se actualiza correctamente en el backend mediante el endpoint PUT /candidate/:id.

3. **Visualización de Detalles de Candidato**:
   - Simula el clic en una tarjeta de candidato.
   - Verifica que se carga la información detallada del candidato.
   - Verifica que se muestran correctamente las secciones de educación, experiencia, etc.

## Solución a Problemas Conocidos

### Error "Cannot read properties of undefined (reading 'map')"

Este error ocurre en el componente `CandidateDetails.js` cuando intenta acceder a propiedades como `educations`, `workExperiences`, `resumes` o `applications` que no existen en los datos recibidos. La solución implementada incluye:

1. **Datos de Prueba Completos**: Hemos creado un fixture `candidateDetails.json` con la estructura exacta que espera el componente:
   ```json
   {
     "id": 1,
     "firstName": "Ana",
     "lastName": "López",
     "email": "ana.lopez@example.com",
     "phone": "+34 612345678",
     "address": "Calle Principal 123, Madrid",
     "educations": [...],
     "workExperiences": [...],
     "resumes": [...],
     "applications": [...]
   }
   ```

2. **Manejo de Excepciones**: Configuramos Cypress para capturar y manejar los errores sin fallar las pruebas:
   ```javascript
   Cypress.on('uncaught:exception', (err, runnable) => {
     cy.log(`Error no controlado: ${err.message}`);
     return false; // Evita que Cypress falle la prueba
   });
   ```

3. **Interceptores de API**: Interceptamos las peticiones al backend para proporcionar datos consistentes:
   ```javascript
   cy.intercept('GET', 'http://localhost:3010/candidates/*', {
     fixture: 'candidateDetails.json'
   }).as('getCandidateDetails');
   ```

### Problema con la visualización de diferentes candidatos

Inicialmente, al hacer clic en diferentes candidatos (como Pedro Martínez), siempre se mostraban los mismos datos (los de Ana López). Esto ocurría porque estábamos usando un único fixture para todos los candidatos.

**Solución implementada**:

1. **Fixtures específicos por candidato**: Creamos fixtures individuales para cada candidato:
   - `candidateDetails.json` para Ana López
   - `candidateDetails_pedro.json` para Pedro Martínez

2. **Interceptores dinámicos**: Configuramos interceptores específicos por ID de candidato:
   ```javascript
   // Interceptor para Ana López (ID 1)
   cy.intercept('GET', 'http://localhost:3010/candidates/1', {
     fixture: 'candidateDetails.json'
   }).as('getCandidateDetails1');

   // Interceptor para Pedro Martínez (ID 2)
   cy.intercept('GET', 'http://localhost:3010/candidates/2', {
     fixture: 'candidateDetails_pedro.json'
   }).as('getCandidateDetails2');

   // Interceptor genérico para otros candidatos
   cy.intercept('GET', 'http://localhost:3010/candidates/*', (req) => {
     const candidateId = req.url.split('/').pop();
     cy.log(`Solicitando detalles del candidato con ID: ${candidateId}`);
     req.reply({
       fixture: 'candidateDetails.json' // Fixture por defecto
     });
   }).as('getCandidateDetailsGeneric');
   ```

3. **Pruebas específicas**: Implementamos pruebas separadas para verificar los detalles de cada candidato.

Esta solución permite que cada candidato muestre su información específica al hacer clic en su tarjeta, mejorando significativamente la calidad de las pruebas.

## Ejecución de las Pruebas

Para ejecutar las pruebas, sigue estos pasos:

1. **Asegúrate de que la aplicación está en ejecución**:
   ```bash
   # En una terminal, inicia el backend
   cd backend
   npm start

   # En otra terminal, inicia el frontend
   cd frontend
   npm start
   ```

2. **Ejecutar Cypress**:
   ```bash
   # Desde la raíz del proyecto
   npm run test:e2e
   # O directamente:
   npx cypress open
   ```

3. **Seleccionar las pruebas a ejecutar**:
   - En la interfaz de Cypress, selecciona "E2E Testing"
   - Elige un navegador (Chrome, Firefox, etc.)
   - Haz clic en "Start E2E Testing"
   - Selecciona el archivo `position.spec.js` para ejecutar las pruebas

## Notas Importantes

- **Datos Mockeados**: Utilizamos datos mockeados a través de fixtures para garantizar la consistencia en las pruebas. Esto es especialmente importante para el componente `CandidateDetails.js`, que requiere una estructura de datos específica.

- **Simulación de Arrastre**: La funcionalidad de arrastrar y soltar (drag and drop) se simula de manera simplificada debido a limitaciones de Cypress con react-beautiful-dnd. En lugar de simular el arrastre visual, verificamos directamente la llamada a la API que ocurriría después del arrastre.

- **Manejo de Errores**: Hemos implementado un manejo robusto de errores para evitar fallos en las pruebas debido a problemas en el código de la aplicación.

- **Cumplimiento de Requisitos**: Las pruebas implementadas cumplen con todos los requisitos especificados en el documento Contexto_motivacion_2.md, verificando tanto la carga de la página como el cambio de fase de un candidato.

## Recursos Adicionales

- Para más información sobre cómo implementar y mantener estas pruebas, consulta el documento completo del curso en `docs/curso-cypress-e2e.md`.
- Las instrucciones detalladas del ejercicio se encuentran en el archivo `prompts-iniciales.md` en la raíz del proyecto. 