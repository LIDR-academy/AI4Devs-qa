# Prompts (Cursor 0.50.1 + Claude Sonnet 3.7 + Thinking)

## 1. Solicitar la versión de node para trabajar correctamente con el app
```md
Recomiendame una version de node que pueda usar tanto para @package.json como con @package.json 

--

For both the frontend and backend package.json files, I recommend using Node.js v18.x LTS (specifically v18.18.0 or newer).
Node.js 18 is a stable LTS version that supports all your dependencies including:
TypeScript 4.9.5 (used in both projects)
React 18.3.1
Express 4.19.2
Prisma 5.13.0
Alternatively, Node.js 20.x LTS would also work well and has a longer support timeline.
```

## 2. Con multiples roles: Análisis del proyecto para generar contexto y diagramas de flujo en mermaid

```md
Eres un sistema de multiples roles que entendera y explicara de forma correcta este proyecto, tanto a nivel de negocio como a nivel tecnico, para esto realizaras una serie de pasos:

- Revisa la estructura de este proyecto
- Actuando como un Business Analyst, analiza este proyecto desde una perspectiva de negocio, entendiendo su proposito y el dominio del mismo
- Actuando como un Senior Software Architect, analiza el codigo propuesto, tomando en cuenta en el backend: @ManifestoBuenasPracticas.md y @ModeloDatos.md 

Como resultado final realizaras 2 diagramas de flujo en mermaid explicando:

1. La logica del negocio
2. La estructura tecnica de los procesos a nivel general, es decir una vision tecnica elevada del proyecto

--

**Análisis de Negocio**

Este proyecto es un Sistema de Seguimiento de Talento (LTI) diseñado para gestionar el proceso completo de reclutamiento y selección de personal. El sistema permite:
- Gestionar información de candidatos (datos personales, experiencia, educación, CV)
- Administrar posiciones abiertas en empresas
-- Estructurar flujos de entrevistas con múltiples etapas
- Seguir aplicaciones de candidatos a través del proceso de selección
- Documentar resultados de entrevistas

El valor principal del negocio es proporcionar visibilidad y estructura al proceso de contratación, optimizando la selección de talento.

**Análisis Técnico**
El proyecto sigue una arquitectura de aplicación moderna con:
- Arquitectura: Domain-Driven Design (DDD) con capas bien definidas
- Backend: Node.js/Express con TypeScript, usando Prisma como ORM
- Frontend: React con Bootstrap
- Base de datos: PostgreSQL en Docker
- Principios: SOLID, DRY, y patrones de diseño

La implementación modela correctamente el dominio con entidades como Candidate, Position, Interview, etc., siguiendo prácticas recomendadas de encapsulamiento y responsabilidad única.

@docs/YAG/business-analysis.mmd
@docs/YAG/tech-analysis.mmd
```

## 3. Como QA: Generación de casos de pruebas a partir de requerimiento y de la plataforma

```md
Eres un senior QA, altamente eficaz y experto en la detección de problemas y en la automatización de pruebas E2E usando cypress y la metodologia BDD (Behavior-Driven-Development)

## Objetivo

1. Tu trabajo comienza con la lectura de diagramas de flujo para entender las distintas partes del sistema:
- @docs/YAG/business-analysis.mmd 
- @docs/YAG/tech-analysis.mmd 

2. Leer los archivos del 
backend en @backend/src y del frontend en @frontend/src  

2. Generar los casos de prueba en lenguaje natural, en markdown, los cuales usare luego para crear un archivo .spec.js de cypress llamado positions.spec.js

**Requerimientos**:

**Carga de la Página de Position**
- Verifica que el título de la posición se muestra correctamente.
- Verifica que se muestran las columnas correspondientes a cada fase del proceso de contratación.
- Verifica que las tarjetas de los candidatos se muestran en la columna correcta según su fase actual.
**Cambio de Fase de un Candidato**
- Simula el arrastre de una tarjeta de candidato de una columna a otra.
- Verifica que la tarjeta del candidato se mueve a la nueva columna.
- Verifica que la fase del candidato se actualiza correctamente en el backend mediante el endpoint PUT /candidate/:id.

--

@docs/YAG/test-cases.md
```

## 4. Como QA experto en cypress: Solicitud de aclaración de dudas para crear .spec.js

```md
Eres un experto QA experto en escribir pruebas e2e en cypress

Utilizando tu conocimiento del proyecto a partir de las carpetas @src y @src crearas un archivo de cypress para pruebas e2e ubicado en @position-management.spec.js basado en los casos de pruebas ubicados en @test-cases.md 

Antes de crearlo realiza todas las preguntas que creas pertinentes para aclarar la solicitud y para evitar alucinaciones, no des nada por sentado, preguntame cualquier inquietud por menor que sea

-- 

Tengo algunas preguntas antes de crear el archivo de pruebas e2e:

1. **Sobre el entorno de pruebas**:
   - ¿Existe ya un entorno de pruebas o mock server configurado? ¿O debería simular las respuestas de API con Cypress?
   - ¿Hay datos de prueba predefinidos que deba usar para los candidatos y posiciones?

2. **Autenticación y acceso**:
   - ¿Se requiere inicio de sesión para acceder a la página de posiciones?
   - ¿Cuál es la URL base para acceder a la aplicación frontend?

3. **Datos específicos para pruebas**:
   - ¿Hay un ID de posición específico que deba usar para las pruebas?
   - ¿Puedo asumir que las fases del proceso son "Initial Screening", "Technical Interview", "Team Interview" y "Final Decision"?

4. **Drag and drop testing**:
   - La aplicación usa react-beautiful-dnd para implementar el arrastre. ¿Hay alguna consideración especial o biblioteca auxiliar que deba usar para probar esta funcionalidad?

5. **Alcance de las pruebas**:
   - ¿Debo implementar todos los casos de prueba del documento o priorizar algunos específicos?
   - ¿Cómo debería manejar las esperas y los tiempos de carga?

```

## 5. Dudas aclaradas y mas contexto

```md
1.1: Es la primera vez que ejecuto esta configuración, lo que esta levantado es el servidor de frontend en localhost:3000 y de backend en localhost:3010
1.2: No hay datos de prueba predefinidos
2.1: No se requiere login
2.2: localhost:3000
3.1: No esta definido
3.2: Si
4.1: No probaremos el drag and drop en esta primera etapa
5.1 Los del documento
5.2 Como creas mas conveniente

Para mayor contexto el archivo @backend/prisma/seed.ts define mucha data y estructura interna del proyecto

-- 
Aquí está el código completo para @cypress/integration/yag/position-management.spec.js
```

## 6. Corrección de errores al ejecutar las pruebas

```md
*Aqui copie un error del log al ejecutar "npm run e2e"

--

El problema es que hay 6 elementos con la clase .card en lugar de los 3 que esperamos. Esto ocurre porque tanto las columnas como las tarjetas de candidatos usan la clase .card (esto es común en React Bootstrap, donde las tarjetas se usan para ambos propósitos).
Vamos a corregir la última prueba que falla con un selector más específico:

*Corrección*
```

## 7. Solicitud de revisión de los archivos para encontrar areas de mejora

```md
Revisa el codigo propuesto @position-management.spec.js y encuentra areas de mejora segun lo solicitado en @test-cases.md 

-- 

# Análisis y Mejoras para position-management.spec.js

He revisado el código de pruebas en `position-management.spec.js` comparándolo con los casos de prueba en `test-cases.md` y he identificado las siguientes áreas de mejora:

## 1. Organización y Documentación

- **Falta documentación clara**: Las pruebas podrían beneficiarse de comentarios más detallados que expliquen la relación con los casos de prueba.
- **Agrupación de tests**: Se podrían agrupar los tests usando `describe` anidados para reflejar la estructura de los casos de prueba.

## 2. Cobertura de Criterios de Aceptación

### Caso 1.2: Visualización de columnas de fases
- No se verifica explícitamente que las columnas sean áreas donde se pueden soltar candidatos (aunque se mencionó que no probaríamos drag and drop).

### Caso 1.3: Visualización de candidatos en columnas
- No se verifica que las tarjetas de candidato tengan atributos que las identifiquen como elementos arrastrables.

### Caso 2.3: Actualización en el backend
- No se verifica completamente la estructura del cuerpo de la solicitud PUT.
- No se verifica que tras actualizar la página, el candidato permanezca en la nueva fase.

### Caso 3.1: Visualización de detalles del candidato
- La verificación es muy básica, sólo comprueba que el nombre está visible pero no verifica que se muestre información detallada.

## 3. Sugerencias de Mejora

// Propuesta

## 4. Reorganización sugerida

Recomendaría reestructurar las pruebas usando `describe` anidados que reflejen los casos de prueba principales:

// Propuesta

Estas mejoras harían que las pruebas sean más completas, mejor documentadas y mejor alineadas con los casos de prueba definidos en `test-cases.md`.

```

## 8. Aplicación de casos de pruebas faltantes con libreria externa

```md
Empecemos por aplicar la prueba real de arrastrar y soltar pendiente
- Se menciona que no se incluye la prueba de drag and drop pero es una funcionalidad principal
**Solución**: Implementar una prueba real usando cy.drag o la biblioteca @4tw/cypress-drag-drop

--

Para implementar una prueba real de arrastre y soltar (drag and drop), necesitamos primero instalar la biblioteca @4tw/cypress-drag-drop si no está ya instalada en el proyecto. Esta biblioteca proporciona comandos personalizados para simular operaciones de arrastre y soltar de manera sencilla en Cypress.
Luego, necesitamos añadir el soporte para estos comandos en nuestro archivo de pruebas e implementar el test específico. Aquí está la implementación que deberías añadir después de las importaciones al principio del archivo (antes del describe):

// Propuesta

luego, implementa el nuevo test para verificar el arrastre y soltar entre columnas:

// Propuesta

Este test realiza varias comprobaciones importantes:
1. Localiza la tarjeta de "John Doe" en la columna "Technical Interview"
2. Localiza la columna de destino "Manager Interview"
3. Realiza la operación de arrastre y soltar
4. Verifica que se realiza la llamada a la API con los parámetros correctos
5. Verifica que la tarjeta desaparece de la columna original
6. Verifica que la tarjeta aparece en la nueva columna

Nota: Puede que necesites ajustar los selectores según la estructura DOM exacta de tu aplicación. También, el enfoque drag-and-drop puede requerir ajustes adicionales dependiendo de cómo esté implementado react-beautiful-dnd en tu aplicación específica.
```

## 9. Solicitud de optimización: Agrupación de tests

```md
Aplica al archivo @position-management.spec.js la optimización:

Agrupación de tests: Se podrían agrupar los tests usando describe anidados para reflejar la estructura de los casos de prueba.

-- 
Para mejorar la estructura de tu archivo de pruebas, voy a reorganizarlo utilizando bloques describe anidados que reflejen la estructura de tus casos de prueba. Esto hará que el código sea más legible y que los informes de pruebas muestren una jerarquía clara de los casos de prueba.
Aquí está la implementación recomendada:

// Propuesta

**Beneficios de esta estructura**:
- Mejor organización: Los tests están agrupados lógicamente según los casos de prueba del documento original.
- Claridad en reportes: En los informes de Cypress, verás una jerarquía clara que refleja los casos de prueba.
- Mejor mantenimiento: Al agrupar tests relacionados, es más fácil mantener y extender las pruebas en el futuro.
- Mejores nombres de tests: Los nombres de los tests ahora son más descriptivos y reflejan mejor lo que se está probando.
- Numeración explícita: Cada test tiene el número del caso de prueba en su nombre, facilitando la trazabilidad entre los tests y la documentación.

Esta estructura no solo hace que las pruebas sean más fáciles de entender, sino que también facilita la adición de nuevas pruebas en el futuro, ya que podrás colocarlas en el grupo apropiado.
```

## 10. Solicitud de documentación

```
Genera un archivo de documentación en formato .md en docs/YAG/e2e-testing-details.md

Debe describir el proceso de testing usado en position-management.spec.js, el por que se realizo de esa manera y que se ha logrado con esto

-- 

@docs/YAG/e2e-testing-details.md
```

## 11. Solicitud de PR description

```
Genera un PR description en markdown describiendo todo lo realizado para las pruebas e2e, los artefactos creados (revisa la carpeta @docs ) haz esto en ingles

--

// PR Description
```