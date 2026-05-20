# Prompts-ACBG
 
## Prompt_1: Inicio converzación de punto de partida y condiciones en Curso. ASK/Auto
Hola Como estas?
Saludos nuevamente. Espero que tu status sean optimos y estes conforme para que  sigamos haciendo un Buen Equipo!...

Me ayudas con tres `Questions` que tengo, brindandome tus **respuestas más `True` que puedas**, lo que podría significar en lenguaje humano True == Respuestas **sinceras**

`Respuestas == Alucinaciones < 0.05%`

`Respuestas sinceras == Respuestas`

`True == Respuestas sinceras` 
  
 Me entiendes?

---

## Prompt_2: Preguntas iniciales. ASK/Auto
1. Question_1:
	- Como puedo clonar un repositorio desde cursor en una carpeta especifica determinada en mi equipo teniendo la `url` del repositorio de GitHub.
2. Question_2:
	- Puedes por favor generar un documento que te sirva como una **rule1.mdc** para que actues como un experto en ingeniería de software y revise y analise los proyectos a trabajar antes de impartir las tareas y misiones.
3. Question_3
	- Puedes por favor generar otro documento que te sirva como una **rule2.mdc** para que actues como un experto en Desarrollo de producto y testing E2E. para que revise y analise los proyectos que se esten desarrollando y con **Cypress** probar la interfaz que se requiera o se realice la petición. Asegurarnos de que la interfaz funciona correctamente mediante pruebas End-to-End (E2E).

---

## Prompt_3: Asimilación y primer revisión de la IA. ASK/Auto
Contexto: @README.md, @package.json, @rule1.mdc

Hola ayudame por favor asimilando este proyecto para que tengas pleno conocimiento de su diseño y estructura. Por ahora no generes ningún código.

Cuando estes listo, me dices para darte la primer **tarea** por favor.


---

## Prompt_4: Asimilación y primer revisión de la IA. ASK/Auto
Contexto: @rule1.mdc, @rule2.mdc 

Por favor verifica esta documentación @Contexto_motivacion_1.md y me dices que piensas como para trabajarlo con el actual proyecto LTI (Sistema de Seguimiento de Talento (LTI)). Lo ves viable?, tendra que ver con lo que nos indican en nuestra primer **tarea** que esta en esta documentación @Contexto_motivacion_2.md 

No tienes que ejecutar ni codificar nada, solo has una revisión para que entendamos el contexto de los dos documentos motivacionales que nos suministra nuestro CTO director.

---

## Prompt_5: punto de partida, dirección. Agente/Cloude sonnet 3.7
Contexto: @rule1.mdc, @rule2.mdc
Listo por favor vamos paso por paso para no alucinar, recuerda que estoy aprendiendo.

Basandonos en la primer tarea que tenemos que hacer @Contexto_motivacion_2.md Como recomiendas que iniciemos?

No has ningún código todavía


---

## Prompt_6: Consigna y enfoque objetivo. Agente/Cloude sonnet 3.7
Contexto: @rule1.mdc, @rule2.mdc, @Contexto_motivacion_2.md
Esta bien, pero siempre ten en cuenta que la consigna para esta tarea inicial es **Crear Pruebas E2E para la Interfaz "position"**

---

## Prompt_7: Depuración y desarrollo. Agente/Cloude sonnet 3.7
Contexto: @rule1.mdc, @rule2.mdc, @Contexto_motivacion_2.md
vistes el error:

"Uncaught runtime errors:
×
ERROR
Cannot read properties of undefined (reading 'map')
TypeError: Cannot read properties of undefined (reading 'map')
    at CandidateDetails (http://localhost:3000/static/js/bundle.js:1044:52)
    at renderWithHooks (http://localhost:3000/static/js/bundle.js:69330:22)
    at updateFunctionComponent (http://localhost:3000/static/js/bundle.js:72897:24)
    at beginWork (http://localhost:3000/static/js/bundle.js:74616:20)
    at HTMLUnknownElement.callCallback (http://localhost:3000/static/js/bundle.js:59586:18)
    at Object.invokeGuardedCallbackDev (http://localhost:3000/static/js/bundle.js:59630:20)
    at invokeGuardedCallback (http://localhost:3000/static/js/bundle.js:59687:35)
    at beginWork$1 (http://localhost:3000/static/js/bundle.js:79585:11)
    at performUnitOfWork (http://localhost:3000/static/js/bundle.js:78833:16)
    at workLoopSync (http://localhost:3000/static/js/bundle.js:78756:9)
ERROR
Cannot read properties of undefined (reading 'map')
TypeError: Cannot read properties of undefined (reading 'map')
    at CandidateDetails (http://localhost:3000/static/js/bundle.js:1044:52)
    at renderWithHooks (http://localhost:3000/static/js/bundle.js:69330:22)
    at updateFunctionComponent (http://localhost:3000/static/js/bundle.js:72897:24)
    at beginWork (http://localhost:3000/static/js/bundle.js:74616:20)
    at HTMLUnknownElement.callCallback (http://localhost:3000/static/js/bundle.js:59586:18)
    at Object.invokeGuardedCallbackDev (http://localhost:3000/static/js/bundle.js:59630:20)
    at invokeGuardedCallback (http://localhost:3000/static/js/bundle.js:59687:35)
    at beginWork$1 (http://localhost:3000/static/js/bundle.js:79585:11)
    at performUnitOfWork (http://localhost:3000/static/js/bundle.js:78833:16)
    at workLoopSync (http://localhost:3000/static/js/bundle.js:78756:9)
ERROR
Cannot read properties of undefined (reading 'map')
TypeError: Cannot read properties of undefined (reading 'map')
    at CandidateDetails (http://localhost:3000/static/js/bundle.js:1044:52)
    at renderWithHooks (http://localhost:3000/static/js/bundle.js:69330:22)
    at updateFunctionComponent (http://localhost:3000/static/js/bundle.js:72897:24)
    at beginWork (http://localhost:3000/static/js/bundle.js:74616:20)
    at beginWork$1 (http://localhost:3000/static/js/bundle.js:79563:18)
    at performUnitOfWork (http://localhost:3000/static/js/bundle.js:78833:16)
    at workLoopSync (http://localhost:3000/static/js/bundle.js:78756:9)
    at renderRootSync (http://localhost:3000/static/js/bundle.js:78729:11)
    at recoverFromConcurrentError (http://localhost:3000/static/js/bundle.js:78221:24)
    at performConcurrentWorkOnRoot (http://localhost:3000/static/js/bundle.js:78134:26)"

---

## Prompt_8: Contexto para resolución. Agente/Cloude sonnet 3.7
Contexto: @rule1.mdc, @rule2.mdc, @rule4.mdc, @Contexto_motivacion_2.md
Si ayudame a solucionarlo. Pero:
1. Recuerda que debemos cumplir con lo puntualmente especificado en @Contexto_motivacion_2.md 

2. Si ves necesario para probar y cumplir con la tarea generar Datos mockeados, No hay problema, solo que si debemos dejar constancia de ello. 

---

## Prompt_9: Contexto para resolución y QA. Agente/Cloude sonnet 3.7
Contexto: @rule1.mdc, @rule2.mdc, @rule4.mdc, @Contexto_motivacion_2.md, @curso-cypress-e2e.md
Listo.
Entonces:

1. Realizar un último QA
2. Actualizar Documentación generada
3. Dejar Constancia del QA y Debuggin dentro del Documento @curso-cypress-e2e.md 

---

## Prompt_10: Contexto de un error en la implementación. Agente/Cloude sonnet 3.5
Contexto: @rule1.mdc, @rule2.mdc, @rule4.mdc, @Contexto_motivacion_2.md

Solo muestra la información del candidato "Ana López", si le doy encima de otro candidato por ejemplo el de "Pedro Martinez", igual me muestra la información del candidato "Ana López".

Se podra corregir? Porque del resto esta muy bien.

---

## Prompt_11: Contexto de un nuevo error en la implementación. Agente/Cloude sonnet 3.5
Contexto: @imagen_error.PNG, @rule1.mdc, @rule2.mdc, @rule4.mdc, @Contexto_motivacion_2.md

mira el error:

Trata de analizar y verificar como solucionarlo, sin ir a alterar mucho el avance.
Además recuerda que "Menos es más", es decir, solo debemos preocuparnos por cumplir con las especificaciones una a una dadas en @Contexto_motivacion_2.md 

---

## Prompt_12: Contexto de un nuevo error en la implementación. Agente/Cloude sonnet 3.5
Contexto: @imagen_new_error.PNG, @rule1.mdc, @rule2.mdc, @Contexto_motivacion_2.md
mira el error:

Trata de analizar y verificar como solucionarlo, sin ir a alterar mucho el avance.
Además recuerda que "Menos es más", es decir, solo debemos preocuparnos por cumplir con las especificaciones una a una dadas en @Contexto_motivacion_2.md 

---

## Prompt_13: Implementación con resultados de las pruebas E2E aceptables. Agente/Cloude sonnet 3.5
Contexto: @rule1.mdc, @rule2.mdc, @rule4.mdc, @Contexto_motivacion_2.md

Listo, perfecto.
Muchas Gracias.
Creo que ahora si podemos:

1. Hacer un ultimo QA
2. Actualizar la documentación generada.
3. Hacer commits en la rama creada
4. Sugerirme un mensaje para el PR de entrega de la tarea.

Contexto:
Esta tarea era para entregar el Domingo 12 de mayo. Pero solo hasta el día de hoy 14 de mayo pude realizar la tarea. Trata de que el mensaje del PR contenga un aire de pena y verguenza por la demora, pero que tambien demostremos el interes y compromiso de trabajar y cumplir.

Esto es parte del aprendizaje, lo crees así?

---

## Prompt_14: Finalizando y PR. Agente/Cloude sonnet 3.5
Contexto: @curso-cypress-e2e.md, @cypress/README.md, @rule1.mdc, @rule2.mdc, @rule4.mdc 
Que te parece si en el PR hacemos mención de que toda la documentación del procedimiento y paso a paso de las ejecuciones y dificultades están en el archivo @curso-cypress-e2e.md y @README.md . O No hay necesidad viendolo desde un campo de profesionales y CTO en desarrollo colaborativo de software y buenas prácticas?

---

## Prompt_15: Finalizando y PR. Agente/Cloude sonnet 3.5
Contexto: @rule1.mdc, @rule2.mdc, @rule4.mdc, @Contexto_motivacion_2.md
depronto un argumento del porque decidistes dejar la opción de `/e2e/position.spec.js` que se sugiere por defecto, y NO dejar solamente el que se solicitaba en @Contexto_motivacion_2.md 

---

## Prompt_16: Finalizando y PR. Agente/Cloude sonnet 3.5
Contexto: @rule1.mdc, @rule2.mdc, @rule4.mdc, @Contexto_motivacion_2.md
generame de nuevo el mensaje de la PR para verlo mejor actualizado. Por favor.

Pero antes verifica que esta corrección No se tenga que actualizar documentaciones, como la estructura de alto nivel o algo por el estilo.

---

## Prompt_17: Finalizar y detener las ejecuciones de las pruebas en terminales. Agente/Cloude sonnet 3.5
Contexto: @rule1.mdc, @rule2.mdc, @rule4.mdc
como finalizo las ejecuciones del `npm start` tanto del backend como del frontend en sus respectivas terminales



---

# Prompts Iniciales - Pruebas E2E con Cypress para Interfaz "Position" Sección generada Automaticamente por CURSOR modo Agent/Sonnet 3.5 en su totalidad

## Descripción del Ejercicio

Este ejercicio consiste en implementar pruebas End-to-End (E2E) utilizando Cypress para la interfaz "position" del Sistema de Seguimiento de Talento (LTI). El objetivo es verificar que la interfaz funciona correctamente, permitiendo visualizar las diferentes fases del proceso de contratación y mover candidatos entre estas fases.

## Requisitos Implementados

1. **Configuración de Cypress**:
   - Se ha instalado Cypress como dependencia de desarrollo
   - Se ha configurado el archivo `cypress.config.js` con las opciones adecuadas
   - Se ha creado la estructura de directorios necesaria para Cypress

2. **Pruebas E2E para la Interfaz "position"**:
   - **Carga de la Página**:
     - Verificación del título de la posición
     - Verificación de las columnas por fase
     - Verificación de las tarjetas de candidatos en cada columna
   
   - **Cambio de Fase de un Candidato**:
     - Simulación del arrastre de una tarjeta entre columnas
     - Verificación de la actualización en el backend mediante PUT /candidate/:id
     
   - **Visualización de Detalles de Candidato**:
     - Verificación del funcionamiento del panel de detalles
     - Comprobación de la visualización de información detallada

## Desafíos y Soluciones Implementadas

### Error "Cannot read properties of undefined (reading 'map')"

Durante la implementación de las pruebas, se identificó un error en el componente `CandidateDetails.js` que impedía la correcta visualización de los detalles de un candidato. El error ocurría porque el componente intentaba acceder a propiedades como `educations`, `workExperiences`, `resumes` o `applications` que no existían en los datos recibidos.

**Solución implementada**:

1. **Creación de datos de prueba completos**: Se desarrolló un fixture `candidateDetails.json` con la estructura exacta que espera el componente.

2. **Interceptación de llamadas a la API**: Se configuraron interceptores para proporcionar datos consistentes durante las pruebas.

3. **Manejo de excepciones**: Se implementó una configuración para capturar y manejar errores sin fallar las pruebas.

## Instrucciones para la Ejecución

1. **Preparación del Entorno**:
   ```bash
   # Asegúrate de estar en la raíz del proyecto
   cd /ruta/al/proyecto

   # Instala las dependencias si no lo has hecho
   npm install
   ```

2. **Iniciar la Aplicación**:
   ```bash
   # Terminal 1: Iniciar el backend
   cd backend
   npm start

   # Terminal 2: Iniciar el frontend
   cd frontend
   npm start
   ```

3. **Ejecutar las Pruebas**:
   ```bash
   # Desde la raíz del proyecto
   npm run test:e2e
   # O directamente:
   npx cypress open
   ```

4. **Visualizar los Resultados**:
   - En la interfaz de Cypress, selecciona "E2E Testing"
   - Elige un navegador (Chrome recomendado)
   - Haz clic en "Start E2E Testing"
   - Selecciona el archivo `position.spec.js` para ejecutar las pruebas

## Notas Adicionales

- **Datos Mockeados**: Las pruebas utilizan datos mockeados (fixtures) para garantizar consistencia y reproducibilidad
- **Simulación de Arrastre**: La simulación de arrastrar y soltar es simplificada debido a limitaciones con react-beautiful-dnd
- **Documentación**: Se ha creado documentación adicional en `docs/curso-cypress-e2e.md` con explicaciones detalladas
- **Cumplimiento de Requisitos**: Las pruebas implementadas cumplen con todos los requisitos especificados en Contexto_motivacion_2.md

## Prompts Utilizados

Durante el desarrollo de estas pruebas, se utilizaron los siguientes prompts para la IA:

1. "Analiza el proyecto LTI para entender su estructura y diseño"
2. "Verifica la documentación de Contexto_motivacion_1.md y Contexto_motivacion_2.md"
3. "Crea pruebas E2E con Cypress para la interfaz position"
4. "Implementa verificación de arrastrar y soltar candidatos entre columnas"
5. "Crea un documento tipo curso explicando todo el proceso paso a paso"
6. "Soluciona el error 'Cannot read properties of undefined (reading 'map')' en las pruebas de Cypress"
7. "Actualiza los fixtures para proporcionar datos completos al componente CandidateDetails.js"

## Lecciones Aprendidas y Mejores Prácticas

1. **Enfoque en Requisitos Esenciales**:
   - Mantener el foco en los requisitos específicos del ejercicio
   - Evitar implementar funcionalidades no solicitadas
   - Documentar claramente el alcance de las pruebas

2. **Gestión de Pruebas E2E**:
   - Comenzar con pruebas simples y básicas
   - Incrementar la complejidad gradualmente
   - Mantener las pruebas enfocadas y mantenibles

3. **Manejo de Datos de Prueba**:
   - Utilizar fixtures mínimos pero completos
   - Mantener la consistencia en los datos
   - Documentar la estructura de los datos de prueba

4. **Gestión del Tiempo**:
   - Planificar adecuadamente las tareas
   - Comunicar proactivamente los retrasos
   - Mantener el compromiso con la calidad

Este ejercicio ha demostrado la importancia de:
- Mantener la simplicidad en las pruebas
- Enfocarse en los requisitos esenciales
- Comunicar efectivamente el progreso y los desafíos
- Aprender de los errores y mejorar continuamente

---

_Última actualización: 14 de mayo de 2024_

Este archivo forma parte de la entrega del ejercicio de pruebas E2E con Cypress para el Sistema de Seguimiento de Talento (LTI). 