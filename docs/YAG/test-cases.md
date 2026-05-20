# Casos de Prueba para Gestión de Candidatos en Posiciones

## 1. Carga de la Página de Posición

### Caso 1.1: Verificación del título de la posición
**Descripción**: Al cargar la página de detalles de una posición, se debe mostrar correctamente el título.

**Criterios de aceptación**:
- Se navega a la página de detalle de posición con un ID válido
- Se muestra el título de la posición como un encabezado
- El título debe corresponder al nombre de la posición obtenido del backend

### Caso 1.2: Visualización de columnas de fases
**Descripción**: La página debe mostrar columnas para cada fase del proceso de contratación.

**Criterios de aceptación**:
- Se muestran todas las fases del proceso de contratación como columnas separadas
- Cada columna tiene un encabezado que coincide con el nombre de la fase
- Las columnas se organizan en el orden correcto según el proceso de contratación
- Cada columna es un área donde se pueden soltar candidatos (droppable)

### Caso 1.3: Visualización de candidatos en sus columnas correspondientes
**Descripción**: Los candidatos deben mostrarse en la columna correcta según su fase actual en el proceso.

**Criterios de aceptación**:
- Cada candidato aparece solo en la columna que corresponde a su fase actual
- La información básica del candidato (nombre y calificación) se muestra en la tarjeta
- Las tarjetas de candidato son elementos que se pueden arrastrar (draggable)

## 2. Cambio de Fase de un Candidato

### Caso 2.1: Arrastre de candidato entre fases
**Descripción**: Un candidato puede moverse entre fases mediante arrastre y soltar.

**Criterios de aceptación**:
- Se puede seleccionar y arrastrar la tarjeta de un candidato
- Durante el arrastre, se muestra un indicador visual de dónde se colocará la tarjeta
- Al soltar la tarjeta, esta se posiciona en la nueva columna

### Caso 2.2: Verificación visual del cambio de fase
**Descripción**: La interfaz de usuario debe reflejar el cambio de fase correctamente.

**Criterios de aceptación**:
- La tarjeta del candidato desaparece de la columna de origen
- La tarjeta aparece en la columna de destino
- La información del candidato se mantiene intacta en la nueva columna

### Caso 2.3: Actualización en el backend
**Descripción**: El cambio de fase debe persistirse en el backend mediante una llamada API.

**Criterios de aceptación**:
- Se envía una solicitud PUT al endpoint `/candidates/:id`
- El cuerpo de la solicitud contiene el ID de la aplicación y el ID de la nueva fase
- La respuesta del servidor indica que la actualización fue exitosa (código 200)
- Si se actualiza la página, el candidato permanece en la nueva fase

### Caso 2.4: Manejo de errores durante el cambio de fase
**Descripción**: La aplicación debe manejar correctamente los errores durante el cambio de fase.

**Criterios de aceptación**:
- Si la actualización en el backend falla, se muestra un mensaje de error
- La interfaz de usuario se restaura al estado original (candidato vuelve a la fase original)
- Se registra el error en la consola para fines de depuración

## 3. Interacción con Tarjetas de Candidatos

### Caso 3.1: Visualización de detalles del candidato
**Descripción**: Al hacer clic en una tarjeta de candidato, se deben mostrar sus detalles.

**Criterios de aceptación**:
- Al hacer clic en una tarjeta de candidato, se abre un panel lateral
- El panel muestra información detallada del candidato seleccionado
- El panel se puede cerrar y volver a la vista de columnas
