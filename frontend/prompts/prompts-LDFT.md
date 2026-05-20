
# Prompts 1
Vamos hacer test e2e teniendo el contexto de la carpeta @frontend. Indexa esta carpeta si es necesario. 



# Prompts 2

Vamos a realizar el siguiente test, teniendo en cuenta que eres un experto QA, y necesitamos crear la siguiente prueba para la vista "position" en la url http://localhost:3000/positions/1.
Escentario:  Carga de la Página de Position:
- Verifica que el título de la posición se muestra correctamente.
- Verifica que se muestran las columnas correspondientes a cada fase del proceso de contratación.
- Verifica que las tarjetas de los candidatos se muestran en la columna correcta según su fase actual.


# Prompts 3

 Crea un archivo de prueba position.spec.js en la carpeta /cypress/integration. Esto no se si entra en comnflicto con la carpeta que ya has creado E2E, o es compatible

# Prompts 4

Me puedes agregar un comando para lanzar los test en el @package.json 

# Prompts 5
En cypress veo el error 
Your supportFile is missing or invalid: cypress/support/e2e.ts

The supportFile must be a .js, .ts, .coffee file or be supported by your preprocessor plugin (if configured).

Fix your support file, or set supportFile to false if a support file is not necessary for your project.

If you have just renamed the extension of your supportFile, restart Cypress.



# Prompts 6

Me puedes agregar este otro escenario

Escenario: Cambio de Fase de un Candidato:
- Simula el arrastre de una tarjeta de candidato de una columna a otra.
- Verifica que la tarjeta del candidato se mueve a la nueva columna.
 - Verifica que la fase del candidato se actualiza correctamente en el backend mediante el endpoint PUT /candidate/:id.


# Prompts 7
No crees el fichero  # Prompts 6

# Prompts 8
Las 3 columnas se llaman Initial Screening , Technical Interview y Manager Interview 


# Prompts 9
El primer test pasa sin problema, sin embargo, sigue sucediendo el siguiente error 
Timed out retrying after 4000ms: Expected to find element: [class*="column"], [class*="phase"], [class*="board"], but never found it.
