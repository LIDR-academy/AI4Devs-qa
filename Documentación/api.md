# Documentación de la API - LTI

## 1. Información General

### 1.1 Detalles de la API
- **Título**: AI4Devs Candidate API
- **Versión**: 1.0.0
- **Base URL**: http://localhost:3010
- **Descripción**: API para la gestión de datos de candidatos en el sistema de reclutamiento AI4Devs

### 1.2 Formato de Respuestas
- Todas las respuestas están en formato JSON
- Códigos de estado HTTP estándar
- Estructura de error consistente:
  ```json
  {
    "message": "Descripción del error"
  }
  ```

## 2. Endpoints

### 2.1 Gestión de Candidatos

#### POST /candidates
Crea un nuevo candidato en el sistema.

**Request Body:**
```json
{
  "firstName": "string",      // 2-50 caracteres, solo letras y espacios
  "lastName": "string",       // 2-50 caracteres, solo letras y espacios
  "email": "string",          // Formato de email válido
  "phone": "string",          // Formato de teléfono válido
  "address": "string",        // Máximo 100 caracteres
  "educations": [{
    "institution": "string",  // Máximo 100 caracteres
    "title": "string",        // Máximo 100 caracteres
    "startDate": "YYYY-MM-DD",
    "endDate": "YYYY-MM-DD"
  }],
  "workExperiences": [{
    "company": "string",      // Máximo 100 caracteres
    "position": "string",     // Máximo 100 caracteres
    "description": "string",  // Máximo 200 caracteres
    "startDate": "YYYY-MM-DD",
    "endDate": "YYYY-MM-DD"
  }],
  "cv": {
    "filePath": "string",
    "fileType": "string"
  }
}
```

**Respuestas:**
- `201 Created`: Candidato creado exitosamente
  ```json
  {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "address": "string",
    "educations": [...],
    "workExperiences": [...],
    "cv": {...}
  }
  ```
- `400 Bad Request`: Datos de entrada inválidos
- `500 Internal Server Error`: Error interno del servidor

#### GET /candidates/{id}
Obtiene información detallada de un candidato específico.

**Parámetros:**
- `id`: ID del candidato (integer)

**Respuestas:**
- `200 OK`: Candidato encontrado
  ```json
  {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "address": "string",
    "educations": [...],
    "workExperiences": [...],
    "cv": {...}
  }
  ```
- `404 Not Found`: Candidato no encontrado
- `500 Internal Server Error`: Error interno del servidor

#### PUT /candidates/{id}
Actualiza el estado de la entrevista de un candidato.

**Parámetros:**
- `id`: ID del candidato (integer)

**Request Body:**
```json
{
  "applicationId": "integer",
  "currentInterviewStep": "integer"
}
```

**Respuestas:**
- `200 OK`: Estado actualizado exitosamente
  ```json
  {
    "message": "string",
    "data": {
      "id": "integer",
      "positionId": "integer",
      "candidateId": "integer",
      "applicationDate": "string",
      "currentInterviewStep": "integer",
      "notes": "string",
      "interviews": [{
        "interviewDate": "string",
        "interviewStep": "string",
        "score": "number"
      }]
    }
  }
  ```
- `400 Bad Request`: Datos de entrada inválidos
- `404 Not Found`: Candidato o aplicación no encontrada
- `500 Internal Server Error`: Error interno del servidor

### 2.2 Gestión de Posiciones

#### GET /positions
Obtiene todas las posiciones disponibles.

**Respuestas:**
- `200 OK`: Lista de posiciones
  ```json
  [{
    "id": "integer",
    "title": "string",
    "description": "string",
    "status": "string",
    "isVisible": "boolean",
    "location": "string",
    "jobDescription": "string",
    "requirements": "string",
    "responsibilities": "string",
    "salaryMin": "number",
    "salaryMax": "number",
    "employmentType": "string",
    "benefits": "string",
    "companyDescription": "string",
    "applicationDeadline": "string",
    "contactInfo": "string"
  }]
  ```
- `500 Internal Server Error`: Error interno del servidor

#### GET /positions/{id}/candidates
Obtiene los candidatos que han aplicado a una posición específica.

**Parámetros:**
- `id`: ID de la posición (integer)

**Respuestas:**
- `200 OK`: Lista de candidatos
  ```json
  [{
    "id": "integer",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "applicationDate": "string",
    "currentInterviewStep": "integer"
  }]
  ```
- `404 Not Found`: Posición no encontrada
- `500 Internal Server Error`: Error interno del servidor

#### GET /positions/{id}/interviewflow
Obtiene el flujo de entrevista asociado a una posición.

**Parámetros:**
- `id`: ID de la posición (integer)

**Respuestas:**
- `200 OK`: Flujo de entrevista
  ```json
  {
    "id": "integer",
    "description": "string",
    "interviewSteps": [{
      "id": "integer",
      "name": "string",
      "orderIndex": "integer",
      "interviewType": {
        "id": "integer",
        "name": "string",
        "description": "string"
      }
    }]
  }
  ```
- `404 Not Found`: Posición no encontrada
- `500 Internal Server Error`: Error interno del servidor

## 3. Validaciones

### 3.1 Validaciones de Entrada
- **Nombres**: Solo letras y espacios, 2-50 caracteres
- **Email**: Formato de email válido
- **Teléfono**: Formato internacional
- **Fechas**: Formato YYYY-MM-DD
- **Longitudes máximas**:
  - Dirección: 100 caracteres
  - Institución: 100 caracteres
  - Título: 100 caracteres
  - Descripción de trabajo: 200 caracteres

### 3.2 Validaciones de Negocio
- Email único para candidatos
- Relaciones obligatorias entre entidades
- Estados válidos para posiciones
- Flujos de entrevista válidos

## 4. Consideraciones para Testing

### 4.1 Casos de Prueba Recomendados
1. **Creación de Candidato**
   - Caso exitoso con todos los campos
   - Validación de campos requeridos
   - Validación de formatos
   - Validación de longitudes
   - Validación de email único

2. **Obtención de Candidato**
   - Candidato existente
   - Candidato no existente
   - ID inválido

3. **Actualización de Estado**
   - Actualización exitosa
   - Aplicación no existente
   - Paso de entrevista inválido
   - Candidato no existente

4. **Gestión de Posiciones**
   - Listado de posiciones
   - Obtención de candidatos por posición
   - Obtención de flujo de entrevista
   - Posición no existente

### 4.2 Datos de Prueba
- Utilizar el archivo `seed.ts` para datos de prueba
- Crear casos de prueba específicos para cada validación
- Probar casos límite y valores extremos

### 4.3 Herramientas Recomendadas
- Jest para pruebas unitarias
- Supertest para pruebas de integración
- Postman/Insomnia para pruebas manuales

## 5. Mejores Prácticas

### 5.1 Desarrollo
- Seguir el patrón de controlador-servicio-repositorio
- Implementar validaciones en la capa de aplicación
- Manejar errores de forma consistente
- Documentar cambios en la API

### 5.2 Testing
- Escribir pruebas para todos los endpoints
- Cubrir casos de éxito y error
- Validar respuestas y códigos de estado
- Probar validaciones de entrada

### 5.3 Seguridad
- Validar todas las entradas
- Sanitizar datos sensibles
- Implementar rate limiting
- Usar HTTPS en producción 