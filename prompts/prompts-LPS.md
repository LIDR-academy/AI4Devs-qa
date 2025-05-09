#PROMPTS-LPS

**Prompt 1:**
```
Hola, vamos a realizar una tarea enfocada al testing de un nuevo desarrollo. Lo primero que quiero que hagas es estudiar el proyecto por completo. INdexalo si no lo está aún y haz un análisis del mismo. 
Ten en cuenta, durante toda la conversaión, la @rules.mdc 
```

**Prompt 2:**
```
@frontend Has revisado las tecnologías utilizadas, y las dependencias del @frontend ? Analiza los conceptos acerca del modelo de negocio. 
Llevamos ya una conversaión con varias preguntas, y te estás olvidando de @rules.mdc 
```

**Prompt 3:**
```
Quiero instalar y configurar Cypress porque vamos a realizar pruebas E2E apoyados en esta herramienta. 
```

**Prompt 4:**
```
hablame de la aqruitectura del @backend 
```

**Prompt 5:**
```
Antes de que sigas, tengo una pregunta: Me dices que vas a instalar Cypress en el frontend. Me puedes explicar por qué en el frontend?
```

**Prompt 6:**
```
OK, pues adelante con la instalación y configuración, pero aún no desarrolles las pruebas. No te olvides las @rules.mdc 
```

**Prompt 7:**
```
He parado el terminal. Hemos terminado la configuración necesaria para empezar a escribir las pruebas?
```

**Prompt 8:**
```
Vamos a crear primero la base de datos, no?
```

**Prompt 9:**
```
Vamos a realizar la tarea. Eres un experto QA, y necesitamos crear 2 pruebas E2E para la interfaz "position". 
Debes crear pruebas E2E para verificar los siguientes escenarios:

    Carga de la Página de Position:
        Verifica que el título de la posición se muestra correctamente.
        Verifica que se muestran las columnas correspondientes a cada fase del proceso de contratación.
        Verifica que las tarjetas de los candidatos se muestran en la columna correcta según su fase actual.
    Cambio de Fase de un Candidato:
        Simula el arrastre de una tarjeta de candidato de una columna a otra.
        Verifica que la tarjeta del candidato se mueve a la nueva columna.
        Verifica que la fase del candidato se actualiza correctamente en el backend mediante el endpoint PUT /candidate/:id.

Analiza si es mejor empezar por la primera prueba, y ver si ha habido exito, o bajo tu experiencia piensas que ya se pueden desarrollar las dos seguidas. 


 Crea un archivo de prueba position.spec.js en la carpeta /cypress/integration. Esto no se si entra en comnflicto con la carpeta que ya has creado E2E, o es compatible
    Escribe pruebas E2E para verificar la carga de la página y el cambio de fase de un candidato.

Hazlo fácil, no te compliques. Y obedece a las @rules.mdc 
```

**Prompt 10:**
```
guiame para seleccionar y ejecutar el archivo position.spec.js desde la interfaz de Cypress.
```

**Prompt 11:**
```
DevTools listening on ws://127.0.0.1:58416/devtools/browser/ca0aecfd-2562-4836-ab41-7e8e97dd8d04
Missing baseUrl in compilerOptions. tsconfig-paths will be skipped
```

**Prompt 12:**
```
no, no sale el archivo. Mi test está en la carpeta ingegration, y no en E2E. HAy que cambiar cypress.config.ts?
```

**Prompt 13:**
```
 Print to console
    at cypressErr (http://localhost:3000/__cypress/runner/cypress_runner.js:76205:18)
    at Object.errByPath (http://localhost:3000/__cypress/runner/cypress_runner.js:76259:10)
    at checkForXhr (http://localhost:3000/__cypress/runner/cypress_runner.js:137464:84)
    at <unknown> (http://localhost:3000/__cypress/runner/cypress_runner.js:137490:28)
    at tryCatcher (http://localhost:3000/__cypress/runner/cypress_runner.js:1777:23)
    at Promise.attempt.Promise.try (http://localhost:3000/__cypress/runner/cypress_runner.js:4285:29)
From previous event:
    at Promise.longStackTracesCaptureStackTrace [as _captureStackTrace] (http://localhost:3000/__cypress/runner/cypress_runner.js:3456:19)
    at Promise._then (http://localhost:3000/__cypress/runner/cypress_runner.js:1209:17)
    at Promise._passThrough (http://localhost:3000/__cypress/runner/cypress_runner.js:4080:17)
    at Promise.lastly.Promise.finally (http://localhost:3000/__cypress/runner/cypress_runner.js:4089:17)
    at Object.onRunnableRun (http://localhost:3000/__cypress/runner/cypress_runner.js:165560:53)
    at $Cypress.action (http://localhost:3000/__cypress/runner/cypress_runner.js:41560:28)
    at Runnable.run (http://localhost:3000/__cypress/runner/cypress_runner.js:147522:13)
    at next (http://localhost:3000/__cypress/runner/cypress_runner.js:157785:10)
    at <unknown> (http://localhost:3000/__cypress/runner/cypress_runner.js:157829:5)
    at timeslice (http://localhost:3000/__cypress/runner/cypress_runner.js:147873:27)
From Your Spec Code:
    at Context.eval (webpack://frontend/./cypress/integration/position.spec.js:17:7)
Candidate Phase Change
debería permitir arrastrar un candidato a otra columnaprocessing
```

**Prompt 14:**
```
 Print to console
    at cypressErr (http://localhost:3000/__cypress/runner/cypress_runner.js:76205:18)
    at Object.errByPath (http://localhost:3000/__cypress/runner/cypress_runner.js:76259:10)
    at checkForXhr (http://localhost:3000/__cypress/runner/cypress_runner.js:137464:84)
    at <unknown> (http://localhost:3000/__cypress/runner/cypress_runner.js:137490:28)
    at tryCatcher (http://localhost:3000/__cypress/runner/cypress_runner.js:1777:23)
    at Promise.attempt.Promise.try (http://localhost:3000/__cypress/runner/cypress_runner.js:4285:29)
From previous event:
    at Promise.longStackTracesCaptureStackTrace [as _captureStackTrace] (http://localhost:3000/__cypress/runner/cypress_runner.js:3456:19)
    at Promise._then (http://localhost:3000/__cypress/runner/cypress_runner.js:1209:17)
    at Promise._passThrough (http://localhost:3000/__cypress/runner/cypress_runner.js:4080:17)
    at Promise.lastly.Promise.finally (http://localhost:3000/__cypress/runner/cypress_runner.js:4089:17)
    at Object.onRunnableRun (http://localhost:3000/__cypress/runner/cypress_runner.js:165560:53)
    at $Cypress.action (http://localhost:3000/__cypress/runner/cypress_runner.js:41560:28)
    at Runnable.run (http://localhost:3000/__cypress/runner/cypress_runner.js:147522:13)
    at next (http://localhost:3000/__cypress/runner/cypress_runner.js:157785:10)
    at <unknown> (http://localhost:3000/__cypress/runner/cypress_runner.js:157829:5)
    at timeslice (http://localhost:3000/__cypress/runner/cypress_runner.js:147873:27)
From Your Spec Code:
    at Context.eval (webpack://frontend/./cypress/integration/position.spec.js:17:7)
```

**Prompt 15:**
```
at Context.eval (webpack://frontend/./cypress/integration/position.spec.js:81:40)
at getRet (http://localhost:3000/__cypress/runner/cypress_runner.js:119616:20)
at tryCatcher (http://localhost:3000/__cypress/runner/cypress_runner.js:1777:23)
at Promise.attempt.Promise.try (http://localhost:3000/__cypress/runner/cypress_runner.js:4285:29)
at Context.thenFn (http://localhost:3000/__cypress/runner/cypress_runner.js:119627:66)
at Context.then (http://localhost:3000/__cypress/runner/cypress_runner.js:119878:21)
```

**Prompt 16:**
```
 Print to console
    at isAttached (http://localhost:3000/__cypress/runner/cypress_runner.js:147042:58)
    at validateType (http://localhost:3000/__cypress/runner/cypress_runner.js:146912:9)
    at Object.isType (http://localhost:3000/__cypress/runner/cypress_runner.js:146947:7)
    at $Cy.pushSubject (http://localhost:3000/__cypress/runner/cypress_runner.js:140615:22)
    at wrapped (http://localhost:3000/__cypress/runner/cypress_runner.js:140172:19)
    at <unknown> (http://localhost:3000/__cypress/runner/cypress_runner.js:146118:15)
    at tryCatcher (http://localhost:3000/__cypress/runner/cypress_runner.js:1777:23)
    at Promise._settlePromiseFromHandler (http://localhost:3000/__cypress/runner/cypress_runner.js:1489:31)
    at Promise._settlePromise (http://localhost:3000/__cypress/runner/cypress_runner.js:1546:18)
    at Promise._settlePromiseCtx (http://localhost:3000/__cypress/runner/cypress_runner.js:1583:10)
    at <unknown> (http://localhost:3000/__cypress/runner/cypress_runner.js:2352:20)
From previous event:
    at Promise.longStackTracesCaptureStackTrace [as _captureStackTrace] (http://localhost:3000/__cypress/runner/cypress_runner.js:3456:19)
    at Promise._then (http://localhost:3000/__cypress/runner/cypress_runner.js:1209:17)
    at Promise.then (http://localhost:3000/__cypress/runner/cypress_runner.js:1102:17)
    at next (http://localhost:3000/__cypress/runner/cypress_runner.js:146284:64)
    at <unknown> (http://localhost:3000/__cypress/runner/cypress_runner.js:146305:16)
    at tryCatcher (http://localhost:3000/__cypress/runner/cypress_runner.js:1777:23)
    at Promise._settlePromiseFromHandler (http://localhost:3000/__cypress/runner/cypress_runner.js:1489:31)
    at Promise._settlePromise (http://localhost:3000/__cypress/runner/cypress_runner.js:1546:18)
    at Promise._settlePromise0 (http://localhost:3000/__cypress/runner/cypress_runner.js:1591:10)
    at Promise._settlePromises (http://localhost:3000/__cypress/runner/cypress_runner.js:1671:18)
    at <unknown> (http://localhost:3000/__cypress/runner/cypress_runner.js:2362:25)
```

**Prompt 17:**
```
findbutton, a, .dropdown-toggle
0
AssertionError
Timed out retrying after 4000ms: Expected to find element: button, a, .dropdown-toggle, but never found it. Queried from:

> cy.get(@candidateCard)
cypress/integration/position.spec.js:62:38
  60 |             
  61 |             // Opción 1: Buscar un botón o enlace en la tarjeta del candidato
> 62 |             cy.get('@candidateCard').find('button, a, .dropdown-toggle').first().then($btn => {
     |                                      ^
  63 |               if ($btn.length > 0) {
  64 |                 // Hacer clic en el botón/enlace que muestra las opciones
  65 |                 cy.get('@candidateCard').find('button, a, .dropdown-toggle').first().click(); 
View stack trace
 Print to console
at Context.eval (webpack://frontend/./cypress/integration/position.spec.js:62:37)
at getRet (http://localhost:3000/__cypress/runner/cypress_runner.js:119616:20)
at tryCatcher (http://localhost:3000/__cypress/runner/cypress_runner.js:1777:23)
at Promise.attempt.Promise.try (http://localhost:3000/__cypress/runner/cypress_runner.js:4285:29)
at Context.thenFn (http://localhost:3000/__cypress/runner/cypress_runner.js:119627:66)
at Context.then (http://localhost:3000/__cypress/runner/cypress_runner.js:119878:21)
at wrapped (http://localhost:3000/__cypress/runner/cypress_runner.js:140173:19)
```

**Prompt 18:**
```
Quieres probar los tests desde aqui?