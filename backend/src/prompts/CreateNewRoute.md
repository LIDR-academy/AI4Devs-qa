1. Prompt para arrancar: entender el repo
   Prompt
   Analiza este backend y resume:

1. arquitectura general
2. flujo principal desde rutas hasta servicios y modelos
3. dónde está la lógica de negocio más importante
4. dónde están los mayores riesgos de calidad


Limítate a estos archivos:
- backend/src/routes/candidateRoutes.ts
- backend/src/routes/positionRoutes.ts
- backend/src/presentation/controllers/candidateController.ts
- backend/src/presentation/controllers/positionController.ts
- backend/src/application/services/candidateService.ts
- backend/src/application/services/positionService.ts
- backend/src/application/validator.ts
- backend/src/domain/models/Candidate.ts
- backend/src/domain/models/Application.ts
- backend/jest.config.js















2. Prompt para comparar contrato vs implementación

Prompt
Compara estos dos artefactos del repositorio real:

- backend/src/application/validator.ts
- backend/api-spec.yaml

Quiero que identifiques inconsistencias entre:
1. lo que el contrato API permite
2. lo que validator.ts realmente acepta o rechaza

Enfócate especialmente en:
- firstName
- lastName
- email
- phone
- educations
- workExperiences
- cv

Devuélveme:
- diferencias encontradas
- riesgos funcionales
- qué pruebas deberían existir para documentar esas diferencias antes de corregir el código












3. Prompt para generar characterization tests sobre legacy
   Prompt
   Actúa como un ingeniero senior experto en TDD y código legacy.

Trabaja sobre backend/src/application/validator.ts del repositorio actual.

Objetivo:
Antes de corregir bugs, quiero crear characterization tests que documenten exactamente el comportamiento actual del validador, aunque ese comportamiento sea incorrecto.

Instrucciones:
1. Analiza el código actual del validador.
2. Identifica los comportamientos actuales más importantes.
3. Genera tests que capturen ese comportamiento tal como está hoy.
4. No corrijas todavía la implementación.
5. Marca cuáles de esos comportamientos parecen legacy, incorrectos o riesgosos.
6. Separa claramente:
    - comportamiento actual documentado
    - posibles comportamientos a corregir después

Entrega:
- archivo backend/src/application/validator.characterization.spec.ts
- lista breve de comportamientos actuales a capturar
- comentarios dentro de los tests indicando cuáles son characterization tests de comportamiento legacy
- observaciones sobre qué tests probablemente cambiarán cuando corrijamos el código

Reglas:
- no inventes reglas nuevas
- no asumas comportamiento esperado futuro
- trabaja solo con el comportamiento real observado en el código actual
- usa el estilo y estructura del repositorio

5. Prompt para diseñar la nueva funcionalidad con TDD
   Prompt
   Vamos a construir una nueva funcionalidad en este repositorio real siguiendo TDD.

Contexto del dominio:
- existe lógica para obtener interview flow por posición en backend/src/application/services/positionService.ts
- existe lógica para actualizar currentInterviewStep en backend/src/application/services/candidateService.ts
- la entidad Application está en backend/src/domain/models/Application.ts

Nueva funcionalidad a crear:
advanceCandidateToNextInterviewStep(candidateId: number, applicationId: number)

Comportamiento esperado:
1. buscar la aplicación del candidato
2. identificar la posición asociada
3. obtener el flujo de entrevistas de esa posición
4. encontrar el step actual
5. calcular el siguiente step según orderIndex
6. actualizar currentInterviewStep
7. si ya está en el último paso, devolver un error controlado
8. si el step actual no pertenece al flujo, devolver error

Quiero que trabajes con el repositorio real y me propongas:
- ubicación del nuevo servicio
- nombre de archivo
- lista de casos de prueba
- estrategia de mocks
- archivo de test inicial con Jest

No implementes todavía la solución.


6. Prompt para generar el spec inicial del nuevo servicio
   Prompt
   Con base en el diseño anterior, genera el archivo de test inicial para Jest del nuevo servicio advanceCandidateToNextInterviewStep.

Condiciones:
- trabaja con el estilo actual del backend
- usa mocks para dependencias
- no uses base de datos real
- incluye describe y casos bien nombrados
- separa claramente arrange, act y assert
- enfócate primero en los 5 casos más importantes



















7. Prompt para implementación mínima
   Prompt
   Ahora implementa el nuevo servicio advanceCandidateToNextInterviewStep con el cambio mínimo necesario para hacer pasar los tests.

Condiciones:
- respeta la estructura del repositorio
- reutiliza lo que ya existe cuando tenga sentido
- si necesitas helpers puros para navegación del flujo, créalos
- no metas lógica innecesaria
- explica qué dependencias estás usando
- explica cualquier decisión de diseño

Además:
- sugiere si conviene crear un helper puro tipo findNextInterviewStep
- mantén el código lo más simple y testeable posible





















8. Prompt para refactor del nuevo servicio

Prompt
Revisa la implementación del nuevo servicio advanceCandidateToNextInterviewStep y propón un refactor pequeño y seguro.

Objetivo:
- mejorar legibilidad
- mantener responsabilidad única
- no cambiar comportamiento
- no romper los tests existentes

Indica:
- qué extraerías a helpers
- qué nombres mejorarías
- qué dejarías igual por ahora























9. Prompt para mutation testing sobre el nuevo servicio
   Prompt
   Actúa como experto en mutation testing sobre la nueva funcionalidad advanceCandidateToNextInterviewStep.

Analiza el servicio y sus tests actuales.

Quiero que propongas mutaciones realistas como:
- no avanzar de step
- avanzar dos steps en lugar de uno
- ignorar el caso de último step
- aceptar un step actual que no pertenece al flujo
- usar mal el orderIndex
- no persistir el cambio
- devolver éxito aunque no exista siguiente step

Para cada mutación:
1. explica el error introducido
2. indica si la suite actual la detectaría o no
3. explica por qué
4. propone el test faltante si sobrevive
















10. Prompt instalar plugging mutation testing
    Prompt
    Configura StrykerJS en este repo para mutation testing del backend.

Usa la configuración oficial adecuada para:
- Jest como test runner
- TypeScript como lenguaje principal
- checker de TypeScript si aporta valor

Quiero que:
1. revises backend/jest.config.js y la estructura del backend
2. generes la configuración mínima correcta de Stryker para este repo
3. propongas exactamente:
    - dependencias dev a instalar
    - archivo stryker.config.mjs o stryker.config.json
    - script "test:mutation" en package.json
4. limites la mutación a src del backend
5. excluyas tests, mocks, coverage, dist y configs
6. expliques si usarías:
    - @stryker-mutator/jest-runner
    - @stryker-mutator/typescript-checker
    - coverageAnalysis: "perTest"

No implementes frontend.
No toques más carpetas de las necesarias.
Trabaja con el repo real, no con ejemplos genéricos.







11. Prompt para PBT del nuevo servicio

Prompt
Actúa como experto en Property-Based Testing sobre la nueva funcionalidad advanceCandidateToNextInterviewStep.

Quiero definir propiedades reales del dominio, no ejemplos genéricos.

Considera un interviewFlow con interviewSteps ordenados por orderIndex.

Define propiedades como:
- el siguiente step siempre debe pertenecer al mismo flujo
- el siguiente step debe tener orderIndex mayor al actual
- nunca debe devolver un step inexistente
- si el actual es el último, no debe avanzar
- dado el mismo flujo y el mismo step actual, el resultado siempre debe ser el mismo

Devuélveme:
1. lista de propiedades
2. cuáles aportan valor real
3. propuesta de tests con fast-check
4. cómo integrar fast-check con Jest en este backend











12. Prompt para PBT sobre validator.ts

Prompt
Actúa como experto en Property-Based Testing sobre backend/src/application/validator.ts.

Quiero propiedades reales para:
- validateName
- validateEmail
- validatePhone
- validateDate
- validateCandidateData

No inventes reglas nuevas; usa las que realmente están en el archivo.

Devuélveme:
1. propiedades útiles
2. ejemplos de generadores con fast-check
3. qué propiedades detectarían mejor inconsistencias entre validator.ts y backend/api-spec.yaml
4. cuáles propiedades evitarías porque no aportan valor











AGENTE

1-PROMPT CONTRACT CHECKER
contract-checker.md

Eres un subagente especializado en contract checking para backend TypeScript.

Tu trabajo es comparar contrato vs implementación en este repositorio.

Archivos foco:
- backend/api-spec.yaml
- backend/src/application/validator.ts
- backend/src/presentation/controllers/candidateController.ts
- backend/src/routes/candidateRoutes.ts

Objetivo:
1. identificar inconsistencias entre el contrato OpenAPI y la validación real
2. detectar si el controller o la route alteran la forma prometida por el contrato
3. clasificar hallazgos en:
    - defecto probable
    - ambigüedad
    - decisión de negocio no documentada
4. proponer pruebas prioritarias antes de modificar el código

No corrijas código.
No propongas refactors todavía.
Primero reduce incertidumbre.



















2-PROMPT TDD-SERVICE BUILDER
tdd-service-builder.md

Eres un subagente especializado en TDD para servicios backend TypeScript.

Repositorio:
AI4Devs-qa

Archivos relevantes:
- backend/src/application/services/positionService.ts
- backend/src/application/services/candidateService.ts
- backend/src/domain/models/Application.ts

Nueva capacidad:
advanceCandidateToNextInterviewStep(candidateId, applicationId)

Tu secuencia obligatoria es:
1. definir comportamiento esperado
2. proponer casos de prueba
3. generar primero el spec
4. solo después, si se te pide, implementar el cambio mínimo para pasar

Reglas:
- no uses base de datos real
- usa mocks
- no sobre-implementes
- si detectas ambigüedad de dominio, detente y explícitala
- prioriza seam de testabilidad y responsabilidad única




3-PROMPT ANALYZE-RISK
analyze-risk.md

Analiza los cambios actuales del repo y responde:

1. qué archivos concentran la lógica crítica
2. qué contratos o validadores podrían estar afectados
3. qué pruebas deberían tocarse primero
4. qué NO cambiaría sin protección previa

Enfócate en backend.
No toques frontend.


4-PROMPT DESIGN-TEST
design-tests.md

Diseña la suite mínima necesaria para cubrir el cambio actual.

Quiero:
- characterization tests si el cambio toca legacy
- unit tests si el cambio agrega lógica nueva
- mocks necesarios
- separación clara entre happy path, bordes y errores

No implementes todavía.


5-PROMPT MUTATION-REVIEW
mutation-review.md
Actúa como crítico de la suite actual.

Para la lógica cambiada:
1. propón mutaciones realistas
2. indica cuáles sobrevivirían
3. señala la falsa confianza potencial
4. propone el test faltante más valioso












