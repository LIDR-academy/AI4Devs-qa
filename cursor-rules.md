# Reglas de Cursor para Documentación de Conversaciones

## Descripción
Este archivo define reglas para solicitar a Cursor (usando Claude) que genere documentación detallada de una conversación relacionada con el desarrollo de un proyecto. Estas reglas están diseñadas para crear un registro estructurado de la interacción entre el usuario y la IA que pueda servir como referencia para el equipo de desarrollo.

## Reglas

### 1. Documentación de conversación

Para solicitar la documentación de una conversación, usa el siguiente prompt:

```
Guarda la interacción de esta conversación en el archivo @[nombre-archivo].md siguiendo el siguiente formato:

Prompt 1: Mi solicitud
Respuesta 1: La respuesta 

Por ejemplo:
Prompt 1: Revisa el proyecto ...
Respuesta 1: Voy a revisar el proyecto ...

No cortes el contenido como yo lo hice en el ejemplo
```

Donde `[nombre-archivo]` es el nombre del archivo donde quieres guardar la conversación.

### 2. Actualización de README con cambios realizados

Para solicitar la actualización del README del proyecto con los cambios realizados durante la conversación:

```
Actualiza el @README.md para reflejar los cambios realizados durante nuestra conversación.
```

### 3. Propuesta de Pull Request

Para solicitar una propuesta de Pull Request que recoja los cambios realizados:

```
Dame una propuesta de Pull Request correspondiente a los cambios realizados durante nuestra conversación.
```

## Combinación de solicitudes

Puedes combinar varias solicitudes en un solo prompt para eficiencia:

```
Tengo estas tareas para cerrar nuestra conversación:
1. Actualiza el @README.md para reflejar los cambios realizados
2. Guarda la interacción de esta conversación en el archivo @[nombre-archivo].md siguiendo el formato estándar
3. Dame una propuesta de Pull Request correspondiente a estos cambios
```

## Formato estándar para documentación

La documentación seguirá este formato:

1. **Encabezado con título descriptivo** relacionado con el tema de la conversación
2. **Secuencia numerada de prompts y respuestas** (Prompt 1, Respuesta 1, etc.)
3. **Contenido completo** de cada solicitud y respuesta, preservando todas las explicaciones técnicas
4. **Código relevante** incluido en bloques de código con formato apropiado
5. **Estructuración en secciones** cuando la conversación abarca múltiples temas

## Ejemplo de uso

Para documentar una conversación sobre la implementación de pruebas E2E:

```
Tengo 3 tareas para finalizar:
1. Actualiza el @README.md para reflejar los cambios en las pruebas E2E
2. Guarda la interacción de esta conversación en el archivo @e2e-implementation.md siguiendo el formato estándar
3. Dame una propuesta de Pull Request para la implementación de pruebas E2E
```

## Beneficios

- **Transferencia de conocimiento**: Facilita que otros miembros del equipo entiendan el proceso de desarrollo
- **Documentación técnica**: Sirve como referencia para implementaciones similares en el futuro
- **Trazabilidad**: Conecta los cambios de código con las decisiones que llevaron a ellos
- **Onboarding**: Ayuda a nuevos miembros del equipo a entender la evolución del proyecto 