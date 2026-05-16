**🟩 Paso 1 – Instalación y configuración inicial de Cypress**

Rol: QA Engineer Senior Prompt:

Como QA Engineer Senior, tu primera tarea es instalar y configurar Cypress para un proyecto frontend basado en JavaScript o TypeScript. Asume que estás trabajando en un entorno con npm ya instalado. Ejecuta los comandos necesarios y configura la carpeta base /cypress. Asegúrate de que la estructura por defecto de Cypress esté creada correctamente y lista para ser utilizada.

**🟩 Paso 2 – Inicializar el archivo de prueba E2E**
Rol: QA Engineer Senior
Prompt:

Crea un archivo de prueba llamado position.spec.js dentro de la carpeta /cypress/integration. Este archivo contendrá los escenarios E2E relacionados con la interfaz "position". Asegúrate de importar correctamente describe y it, y de tener el entorno Cypress listo para correr pruebas sobre una SPA (Single Page Application).

**🟩 Paso 3 – Verificar carga de página y estructura visual**
Rol: QA Engineer Senior
Prompt:

En el archivo position.spec.js, escribe un describe() que contenga un primer it() con el objetivo de verificar que, al acceder a la página /position, el título de la posición se muestre correctamente. También valida que las columnas correspondientes a las fases del proceso estén presentes y que los elementos DOM de candidatos aparezcan en la fase correcta según su estado.

**🟩 Paso 4 – Simular movimiento de tarjeta entre fases**
Rol: QA Engineer Senior especializado en pruebas interactivas
Prompt:

Implementa una prueba Cypress que simule el arrastre de una tarjeta de candidato desde una columna (fase) a otra. Usa comandos personalizados de Cypress o una librería compatible como @4tw/cypress-drag-drop. Asegúrate de verificar visualmente que la tarjeta se mueva correctamente.

**🟩 Paso 5 – Verificar actualización en el backend (PUT)**
Rol: QA Engineer Senior con enfoque en pruebas de integración
Prompt:

Tras simular el cambio de fase del candidato, implementa una prueba Cypress que intercepte la solicitud PUT /candidate/:id. Verifica que la solicitud se haya realizado correctamente con los datos esperados. Usa cy.intercept() para capturar y validar el cuerpo del request.

**🟩 Paso 6 – Consolidación del flujo**
Rol: QA Engineer Senior con experiencia en CI/CD
Prompt:

Crea un flujo completo en el archivo position.spec.js que combine la validación de carga inicial, el movimiento de tarjeta y la verificación del PUT. Este flujo debe simular la interacción real del usuario desde el inicio hasta el final del proceso de cambio de fase. Asegúrate de que todos los asserts estén bien definidos y que el flujo sea resiliente a cambios menores de UI.

**🟩 Paso 7 – Crear archivo prompts-iniciales.md**
Rol: QA Engineer Documentador
Prompt:

Genera el archivo resumen-rcb.md en la carpeta /prompts con un resumen del ejercicio, objetivos, estructura de carpetas esperada y una copia ordenada de los meta-prompts que usaste para guiar la implementación E2E. Este documento servirá como punto de partida para otros QA que deban continuar o mantener estas pruebas.

