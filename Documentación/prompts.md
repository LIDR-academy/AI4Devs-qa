# Prompts del Proyecto

## Prompt 1 - Análisis Inicial del Proyecto
```
Actua como un arquitecto de software al que le han entregado un proyecto ya iniciado que no ha participado pero debe continuar con su desarrollo. Para ello lo que primero harás será analizar el proyecto. Lee todo el codebase del proyecto y en especial el README para entender de que va el proyecto, como se deploya y que peculiaridades debo conocer. Por favor, cada vez que interactue contigo quiero que copies mi prompt en un fichero llamado prompts.md. Si no existe crealo. Tómate el tiempo que creas necesario para hacer bien tu trabajo. El documento resultante lo guardaras en un directorio Documentación que crearas en la raiz y el documento se llamara resumen_proyecto.md. Se detallista y meticuloso con el resultado. Todo detalle hará que nuestro trabajo posterior sea mejor
```

## Prompt 2 - Análisis de Librerías
```
Me gustaria que leyeras con cariño los ficheros package.json para entender todas las librerias que se estan usando en el proyecto y sus versiones. Puedes hacer un resumen de lo que veas en un documento librerias_proyecto.md
```

## Prompt 3 - Análisis de Base de Datos
```
Vale, me gustaria ahora que me hicieras un detalle de como está montado el esquema de datos y todos los detalles que deba conocer del modelo de datos, la base de datos y el sistema usado para un correcto uso. Tomate el tiempo que sea necesario y guardalo en db.md
```

## Prompt 4 - Análisis de API
```
Ahora quiero, para finalizar que me hicieras un análisis detallado de la API que está exponiendo el backend, incorpora todas las llamadas, sus parametros de entrada y su respuesta. Es importante porque esto me ayudará a realizar los testss que necesito hacer. Tomate el tiempo que sea neceasrio y guarda el promp
``` 

##  Prompt 5 - Inicio de los tests
Vale perfecto, creo que ya con esta @Documentación tienes un buen contexto del proyecto. Actua como un experto ingeniero de Software con amplia experiencia en QA y en especial en tests E2E y Cypress. La primera tarea que me han mandado es hacer las pruebas end to end de la última interfaz llamada Position. Debemos asegurarnos que la interfaz funciona perfectamente usando Cypress y sus buenas prácticas. Debemos cubrir 2 escenarios:
 - Carga de la Página de Position:
Verifica que el título de la posición se muestra correctamente.
Verifica que se muestran las columnas correspondientes a cada fase del proceso de contratación.
Verifica que las tarjetas de los candidatos se muestran en la columna correcta según su fase actual.

- Cambio de Fase de un Candidato:
Simula el arrastre de una tarjeta de candidato de una columna a otra.
Verifica que la tarjeta del candidato se mueve a la nueva columna.
Verifica que la fase del candidato se actualiza correctamente en el backend mediante el endpoint PUT /candidate/:id.

De momento no quiero que escribas nada, primero quiero que me ayudes a planificar las fases de este desarrollo, que empezará con la correcta instalacion de Cypress. Quiero que sean pasos pequeños que podamos ejecutar cojuntamente posteriormente una vez aceptado el plan. Tomate el tiempo que sea necesario y por favor se meticuloso con tu trabajo. Guarda este prompt