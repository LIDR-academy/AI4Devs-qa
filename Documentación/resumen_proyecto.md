# Resumen del Proyecto LTI - Sistema de Seguimiento de Talento

## 1. Descripción General
El proyecto LTI es un sistema de gestión de candidatos y entrevistas diseñado para facilitar la administración de procesos de selección de personal. Es una aplicación full-stack que utiliza React en el frontend y Express con TypeScript en el backend, utilizando Prisma como ORM para la gestión de la base de datos.

## 2. Arquitectura del Sistema

### 2.1 Estructura del Proyecto
El proyecto está organizado en dos componentes principales:

#### Frontend
- Desarrollado en React
- Ubicado en el directorio `/frontend`
- Estructura típica de Create React App
- Componentes organizados en el directorio `src`

#### Backend
- Desarrollado en Express con TypeScript
- Ubicado en el directorio `/backend`
- Sigue una arquitectura en capas:
  - `application/`: Lógica de aplicación
  - `domain/`: Lógica de negocio
  - `infrastructure/`: Código de infraestructura
  - `presentation/`: Controladores y presentación
  - `routes/`: Definiciones de rutas API
  - `tests/`: Pruebas unitarias y de integración

### 2.2 Base de Datos
- Utiliza PostgreSQL como base de datos
- Gestionada a través de Docker
- Prisma como ORM para la gestión de datos
- Esquema de base de datos detallado en `backend/ModeloDatos.md`

## 3. Modelo de Datos

### 3.1 Entidades Principales
1. **Candidate (Candidato)**
   - Información personal básica
   - Relaciones con educación, experiencia laboral y currículums

2. **Education (Educación)**
   - Historial educativo de los candidatos
   - Vinculado a un candidato específico

3. **WorkExperience (Experiencia Laboral)**
   - Historial laboral de los candidatos
   - Vinculado a un candidato específico

4. **Resume (Currículum)**
   - Gestión de documentos de currículum
   - Vinculado a un candidato específico

5. **Company (Empresa)**
   - Información de empresas
   - Relaciones con empleados y posiciones

6. **Position (Posición)**
   - Descripción de puestos de trabajo
   - Requisitos, responsabilidades y beneficios

7. **InterviewFlow (Flujo de Entrevista)**
   - Gestión de procesos de entrevista
   - Pasos y tipos de entrevista

8. **Application (Aplicación)**
   - Gestión de candidaturas
   - Seguimiento del estado de la aplicación

## 4. API REST

### 4.1 Endpoints Principales
- `/candidates`: Gestión de candidatos
  - POST: Crear nuevo candidato
  - GET: Obtener lista de candidatos
- `/candidates/{id}`: Operaciones sobre candidatos específicos
  - GET: Obtener detalles del candidato
  - PUT: Actualizar estado del candidato

### 4.2 Validaciones
- Validación de datos de entrada
- Patrones de validación para email, teléfono, etc.
- Manejo de errores estandarizado

## 5. Despliegue y Configuración

### 5.1 Requisitos
- Node.js
- Docker
- PostgreSQL
- npm o yarn

### 5.2 Pasos de Instalación
1. Clonar el repositorio
2. Instalar dependencias (frontend y backend)
3. Configurar variables de entorno
4. Iniciar base de datos con Docker
5. Ejecutar migraciones de Prisma
6. Iniciar servidores frontend y backend

### 5.3 Puertos
- Frontend: http://localhost:3000
- Backend: http://localhost:3010
- PostgreSQL: localhost:5432

## 6. Características Técnicas Destacadas

### 6.1 Frontend
- React para la interfaz de usuario
- TypeScript para tipado estático
- Estructura modular y componentes reutilizables

### 6.2 Backend
- Express con TypeScript
- Arquitectura en capas
- Prisma como ORM
- Validación de datos
- Manejo de errores estandarizado

### 6.3 Base de Datos
- PostgreSQL
- Docker para contenedorización
- Migraciones con Prisma
- Relaciones bien definidas

## 7. Documentación Adicional
- `README.md`: Instrucciones generales
- `ModeloDatos.md`: Esquema detallado de la base de datos
- `api-spec.yaml`: Especificación completa de la API
- `ManifestoBuenasPracticas.md`: Guía de buenas prácticas

## 8. Consideraciones para el Desarrollo
1. Seguir las buenas prácticas documentadas
2. Mantener la consistencia en el código
3. Realizar pruebas unitarias
4. Documentar cambios significativos
5. Seguir el flujo de trabajo de Git establecido

## 9. Próximos Pasos Recomendados
1. Revisar y actualizar la documentación
2. Implementar pruebas automatizadas
3. Mejorar la cobertura de código
4. Optimizar el rendimiento
5. Implementar nuevas características según necesidades 