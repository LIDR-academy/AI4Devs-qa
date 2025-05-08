**Prompt 1: Cursor + GPT-4.1**
````
Lee el archivo @README.md del proyecto para obtener contexto y stack tecnologico.
````

**Prompt 2: Cursor + GPT-4.1**
````
Actua como desarrollador QA profesional. Lee el archivo del ejercio adjunto y traza un plan para resolverlo.
````

**Prompt 3: Cursor + GPT-4.1**
````
Comienza a resolver el ejericio.
````

**Prompt 4: Cursor + GPT-4.1**
````
Procede a probar con cypress la prueba creada de position. Para ello quiero que en el proyecto frontend haya un nuevo script que ejecute lo siguiente: npx cypress open. Ve paso por paso explicando todo y no olvides actualizar el archivo de prompts.
````

**Prompt 5: Cursor + GPT-4.1**
```
El ultimo test tiene un fallo en Cypress, te adjunto el error de la consola:
index-DkiLHQJA.js:5316 TypeError: Cannot read properties of undefined (reading 'id')
    at Context.eval (webpack://frontend/./cypress/e2e/position.cy.js:123:42)
    at getRet (http://localhost:3000/__cypress/runner/cypress_runner.js:119616:20)
    at tryCatcher (http://localhost:3000/__cypress/runner/cypress_runner.js:1777:23)
    at Promise.<anonymous> (http://localhost:3000/__cypress/runner/cypress_runner.js:4285:29)
From previous event:
    at Promise.longStackTracesCaptureStackTrace [as _captureStackTrace] (http://localhost:3000/__cypress/runner/cypress_runner.js:3456:19)
    at Promise._then (http://localhost:3000/__cypress/runner/cypress_runner.js:1209:17)
    at Promise._passThrough (http://localhost:3000/__cypress/runner/cypress_runner.js:4080:17)
    at Promise.<anonymous> (http://localhost:3000/__cypress/runner/cypress_runner.js:4089:17)
    at Object.onRunnableRun (http://localhost:3000/__cypress/runner/cypress_runner.js:165560:53)
    at $Cypress.action (http://localhost:3000/__cypress/runner/cypress_runner.js:41560:28)
    at Test.run (http://localhost:3000/__cypress/runner/cypress_runner.js:147522:13)
    at Runner.runTest (http://localhost:3000/__cypress/runner/cypress_runner.js:157934:10)
    at <unknown> (http://localhost:3000/__cypress/runner/cypress_runner.js:158060:12)
    at next (http://localhost:3000/__cypress/runner/cypress_runner.js:157851:14)
    at <unknown> (http://localhost:3000/__cypress/runner/cypress_runner.js:157861:7)
    at next (http://localhost:3000/__cypress/runner/cypress_runner.js:157763:14)
    at <unknown> (http://localhost:3000/__cypress/runner/cypress_runner.js:157829:5)
    at timeslice (http://localhost:3000/__cypress/runner/cypress_runner.js:147873:27)
```

**Prompt 6: Cursor + GPT-4.1**
Implementa un test más robusto para probar el cambio de fase del candidato, que en lugar de depender del drag & drop visual (que puede fallar con react-beautiful-dnd), realice el cambio de fase mediante petición PUT directa al backend y luego verifique el cambio visualmente. 

El test debe:
1. Identificar un candidato en una columna.
2. Obtener sus datos (candidateId, applicationId) a través de las API.
3. Identificar la fase destino (siguiente o anterior).
4. Ejecutar la petición PUT directamente.
5. Recargar la página y verificar que la tarjeta aparece en la columna correcta.
6. Manejar casos límite como candidatos en la última fase.






