# Prompts para Pruebas Cypress - Interfaz de Posiciones

> Modelo de IA utilizado: Claude 3.7 Sonnet

## Prompt 1: Análisis y contexto del proyecto

```
Como desarrollador experto en pruebas y producto, analiza este proyecto @frontend que es una aplicación de sistema de seguimiento de candidatos. Revisa la interfaz "position" y el flujo que permite arrastrar candidatos entre columnas de fases diferentes.

No realices ningún cambio.
```

## Prompt 2: Configuración inicial de Cypress

```
Necesito configurar Cypress en mi proyecto frontend para realizar pruebas E2E. La aplicación es un sistema de seguimiento de candidatos con una interfaz "position" que permite arrastrar candidatos entre columnas de fases diferentes.

El proyecto ya tiene la siguiente estructura:
- frontend/ (aplicación React)
- backend/ (API)

El package.json actual no incluye Cypress. Por favor, proporcionar:
1. Los comandos exactos para instalar Cypress como dependencia de desarrollo
2. Los scripts a añadir en package.json para ejecutar Cypress
3. La estructura de archivos esperada después de inicializar Cypress
4. Una configuración básica para cypress.config.js adaptada a una aplicación React
```

## Prompt 3: Implementación de pruebas para la página de detalles de posición

```
Necesito crear pruebas para verificar el correcto funcionamiento de la página de detalles de una posición:
1. Cargar la página de detalles de una posición (/positions/:id)
2. Verificar que se muestra el título de la posición correctamente
3. Verificar que se muestran las columnas correspondientes a cada fase del proceso
4. Verificar que las tarjetas de candidatos aparecen en las columnas correctas
5. Probar la navegación hacia atrás con el botón "Volver a Posiciones"

El archivo debe llamarse position-details.cy.js y debe incluir manejo adecuado de la carga asíncrona de datos desde el backend.
```

## Prompt 4: Implementación de pruebas de navegación entre posiciones

```
Necesito crear pruebas para verificar la navegación entre la lista de posiciones y los detalles de una posición específica:
1. Comenzar en la página de lista de posiciones (/positions)
2. Hacer clic en "Ver proceso" para una posición
3. Verificar que se navega a la página de detalles correcta
4. Verificar que los elementos se cargan adecuadamente

El archivo debe llamarse position-navigation.cy.js
```

## Prompt 5: Implementación de pruebas de drag and drop para candidatos

```
Ahora necesito pruebas para verificar la funcionalidad de arrastrar y soltar candidatos:
1. Ver una posición laboral con sus detalles
2. Ver candidatos organizados en columnas según su fase en el proceso
3. Arrastrar candidatos entre columnas (utilizando react-beautiful-dnd)
4. Al arrastrar un candidato, verificar que se actualiza su estado mediante una llamada PUT al endpoint /candidates/:id

El archivo debe llamarse candidate-drag-drop.cy.js e incluir todas las simulaciones necesarias para el drag and drop.
```

## Prompt 6: Resolución de errores comunes en Cypress

```
Estoy teniendo estos errores al ejecutar las pruebas:

1. "Cannot call cy.intercept() outside a running test"
2. "Cannot call cy.get() outside a running test"

¿Cómo puedo estructurar correctamente mis archivos de prueba para evitar estos errores? Muéstrame ejemplos de la estructura correcta.
```

## Prompt 7: Verificación de API y estructura de datos

```
Para los datos como el nombre de la posición, la descripción y las etapas del proceso utiliza este endpoint:

GET http://localhost:3010/positions/:id/interviewflow
Ejemplo de respuesta para el id = 1:
{
    "interviewFlow": {
        "positionName": "Senior Full-Stack Engineer",
        "interviewFlow": {
            "id": 1,
            "description": "Standard development interview process",
            "interviewSteps": [
                {
                    "id": 1,
                    "interviewFlowId": 1,
                    "interviewTypeId": 1,
                    "name": "Initial Screening",
                    "orderIndex": 1
                },
                {
                    "id": 2,
                    "interviewFlowId": 1,
                    "interviewTypeId": 2,
                    "name": "Technical Interview",
                    "orderIndex": 2
                },
                {
                    "id": 3,
                    "interviewFlowId": 1,
                    "interviewTypeId": 3,
                    "name": "Manager Interview",
                    "orderIndex": 2
                }
            ]
        }
    }
}

Para obtener los datos de los candidatos utiliza este endpoint:

GET http://localhost:3010/positions/:id/candidates
Ejemplo de respuesta para el id = 1:
[
    {
        "fullName": "John Doe",
        "currentInterviewStep": "Technical Interview",
        "averageScore": 5,
        "id": 1,
        "applicationId": 1
    },
    {
        "fullName": "Jane Smith",
        "currentInterviewStep": "Technical Interview",
        "averageScore": 4,
        "id": 2,
        "applicationId": 3
    },
    {
        "fullName": "Carlos García",
        "currentInterviewStep": "Initial Screening",
        "averageScore": 0,
        "id": 3,
        "applicationId": 4
    }
]

Para mover candidatos entre etapas, usa:

PUT 'http://localhost:3010/candidates/:id' 
--header 'Content-Type: application/json' \
--data '{
    "applicationId": applicationId,
    "currentInterviewStep": currentInterviewStepId
}'

Ajusta las pruebas para usar estos endpoints correctamente.
```

## Prompt 8: Manejo de pruebas para arrastrar candidatos entre etapas específicas

```
En las pruebas de candidate-drag-drop.cy.js, necesito que específicamente se pruebe mover un candidato desde currentInterviewStep 1 a 3 para verificar que el proceso funciona correctamente. Actualiza las pruebas para este caso específico.
```

## Prompt 9: Corrección de errores en pruebas con estructura de datos API

```
Estoy teniendo problemas con la estructura de datos en las pruebas. Me aparecen errores como:

- Cannot read properties of undefined (reading 'positionName')
- Cannot read properties of undefined (reading 'interviewFlow')
- candidates.find is not a function

¿Cómo puedo hacer las pruebas más robustas para manejar diferentes estructuras de datos o respuestas inesperadas de la API?
```

## Prompt 10: Traducción de pruebas al español

```
Necesito que todos los archivos de prueba tengan los nombres de las pruebas (describe, it) en español para mejorar la legibilidad. Por favor, actualiza los siguientes archivos:

1. position-details.cy.js
2. position-navigation.cy.js
3. candidate-drag-drop.cy.js

Mantén la funcionalidad exactamente igual, solo traduce los textos descriptivos.
```

## Prompt 11: Verificación final de cumplimiento de requisitos

```
Verifica si las pruebas actuales cumplen con estos requisitos:

1. Carga de la Página de Position:
   - Verificar que el título de la posición se muestra correctamente.
   - Verificar que se muestran las columnas correspondientes a cada fase del proceso.
   - Verificar que las tarjetas de los candidatos se muestran en la columna correcta.

2. Cambio de Fase de un Candidato:
   - Simular el arrastre de un candidato de una columna a otra.
   - Verificar que la tarjeta del candidato se mueve a la nueva columna.
   - Verificar que se realiza la llamada PUT al backend correctamente.
```

## Notas para ejecutar Cypress

Para ejecutar Cypress en modo interactivo, utiliza el siguiente comando:
```
npm run cypress:open
```

Este comando abrirá la interfaz gráfica de Cypress donde podrás seleccionar y ejecutar las pruebas de forma visual.