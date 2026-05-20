# Documentación de Base de Datos - LTI

## 1. Configuración General

### 1.1 Tecnologías Utilizadas
- **Base de Datos**: PostgreSQL
- **ORM**: Prisma
- **Versión de Prisma**: 5.13.0
- **Conexión**: PostgreSQL local en puerto 5432

### 1.2 Configuración de Conexión
```prisma
datasource db {
  provider = "postgresql"
  url      = "postgresql://LTIdbUser:D1ymf8wyQEGthFR1E9xhCq@localhost:5432/LTIdb"
}
```

## 2. Modelo de Datos

### 2.1 Entidades Principales

#### Candidate (Candidato)
```prisma
model Candidate {
  id                Int               @id @default(autoincrement())
  firstName         String            @db.VarChar(100)
  lastName          String            @db.VarChar(100)
  email             String            @unique @db.VarChar(255)
  phone             String?           @db.VarChar(15)
  address           String?           @db.VarChar(100)
  educations        Education[]
  workExperiences   WorkExperience[]
  resumes           Resume[]
  applications      Application[]
}
```

#### Education (Educación)
```prisma
model Education {
  id            Int       @id @default(autoincrement())
  institution   String    @db.VarChar(100)
  title         String    @db.VarChar(250)
  startDate     DateTime
  endDate       DateTime?
  candidateId   Int
  candidate     Candidate @relation(fields: [candidateId], references: [id])
}
```

#### WorkExperience (Experiencia Laboral)
```prisma
model WorkExperience {
  id          Int       @id @default(autoincrement())
  company     String    @db.VarChar(100)
  position    String    @db.VarChar(100)
  description String?   @db.VarChar(200)
  startDate   DateTime
  endDate     DateTime?
  candidateId Int
  candidate   Candidate @relation(fields: [candidateId], references: [id])
}
```

#### Resume (Currículum)
```prisma
model Resume {
  id          Int       @id @default(autoincrement())
  filePath    String    @db.VarChar(500)
  fileType    String    @db.VarChar(50)
  uploadDate  DateTime
  candidateId Int
  candidate   Candidate @relation(fields: [candidateId], references: [id])
}
```

#### Company (Empresa)
```prisma
model Company {
  id   Int    @id @default(autoincrement())
  name String @unique
  employees Employee[]
  positions Position[]
}
```

#### Position (Posición)
```prisma
model Position {
  id                Int              @id @default(autoincrement())
  companyId         Int
  interviewFlowId   Int
  title             String
  description       String
  status            String           @default("Draft")
  isVisible         Boolean          @default(false)
  location          String
  jobDescription    String
  requirements      String?
  responsibilities  String?
  salaryMin         Float?
  salaryMax         Float?
  employmentType    String?
  benefits          String?
  companyDescription String?
  applicationDeadline DateTime?
  contactInfo       String?
  company           Company          @relation(fields: [companyId], references: [id])
  interviewFlow     InterviewFlow    @relation(fields: [interviewFlowId], references: [id])
  applications      Application[]
}
```

#### InterviewFlow (Flujo de Entrevista)
```prisma
model InterviewFlow {
  id          Int       @id @default(autoincrement())
  description String?
  interviewSteps InterviewStep[]
  positions   Position[]
}
```

#### InterviewStep (Paso de Entrevista)
```prisma
model InterviewStep {
  id              Int            @id @default(autoincrement())
  interviewFlowId Int
  interviewTypeId Int
  name            String
  orderIndex      Int
  interviewFlow   InterviewFlow  @relation(fields: [interviewFlowId], references: [id])
  interviewType   InterviewType  @relation(fields: [interviewTypeId], references: [id])
  applications    Application[]
  interviews      Interview[]
}
```

#### Application (Aplicación)
```prisma
model Application {
  id                   Int            @id @default(autoincrement())
  positionId           Int
  candidateId          Int
  applicationDate      DateTime
  currentInterviewStep Int
  notes                String?
  position             Position       @relation(fields: [positionId], references: [id])
  candidate            Candidate      @relation(fields: [candidateId], references: [id])
  interviewStep        InterviewStep  @relation(fields: [currentInterviewStep], references: [id])
  interviews           Interview[]
}
```

#### Interview (Entrevista)
```prisma
model Interview {
  id               Int            @id @default(autoincrement())
  applicationId    Int
  interviewStepId  Int
  employeeId       Int
  interviewDate    DateTime
  result           String?
  score            Int?
  notes            String?
  application      Application    @relation(fields: [applicationId], references: [id])
  interviewStep    InterviewStep  @relation(fields: [interviewStepId], references: [id])
  employee         Employee       @relation(fields: [employeeId], references: [id])
}
```

## 3. Relaciones y Restricciones

### 3.1 Relaciones Principales
1. **Candidate**
   - Uno a muchos con Education
   - Uno a muchos con WorkExperience
   - Uno a muchos con Resume
   - Uno a muchos con Application

2. **Company**
   - Uno a muchos con Employee
   - Uno a muchos con Position

3. **Position**
   - Muchos a uno con Company
   - Muchos a uno con InterviewFlow
   - Uno a muchos con Application

4. **InterviewFlow**
   - Uno a muchos con InterviewStep
   - Uno a muchos con Position

5. **Application**
   - Muchos a uno con Position
   - Muchos a uno con Candidate
   - Muchos a uno con InterviewStep
   - Uno a muchos con Interview

### 3.2 Restricciones Importantes
- Email único para Candidate
- Email único para Employee
- Nombre único para Company
- Relaciones obligatorias en cascada

## 4. Datos de Ejemplo

El proyecto incluye un archivo `seed.ts` con datos de ejemplo que incluyen:
- Empresas
- Flujos de entrevista
- Posiciones
- Candidatos
- Tipos de entrevista
- Pasos de entrevista
- Empleados

## 5. Operaciones Comunes

### 5.1 Crear un Nuevo Candidato
```typescript
const newCandidate = await prisma.candidate.create({
  data: {
    firstName: "Nombre",
    lastName: "Apellido",
    email: "email@ejemplo.com",
    phone: "123456789",
    address: "Dirección",
    educations: {
      create: [{
        institution: "Universidad",
        title: "Título",
        startDate: new Date(),
        endDate: new Date()
      }]
    }
  }
});
```

### 5.2 Crear una Nueva Posición
```typescript
const newPosition = await prisma.position.create({
  data: {
    title: "Título del Puesto",
    description: "Descripción",
    companyId: companyId,
    interviewFlowId: flowId,
    status: "Open",
    isVisible: true,
    location: "Ubicación",
    jobDescription: "Descripción del trabajo"
  }
});
```

## 6. Mantenimiento y Administración

### 6.1 Comandos Prisma
- `npx prisma generate`: Genera el cliente Prisma
- `npx prisma migrate dev`: Crea y aplica migraciones
- `npx prisma db seed`: Puebla la base de datos con datos de ejemplo

### 6.2 Consideraciones de Seguridad
- Credenciales de base de datos en variables de entorno
- Validación de datos en la capa de aplicación
- Restricciones a nivel de base de datos

### 6.3 Backups
- Realizar backups regulares de la base de datos
- Mantener un historial de migraciones
- Documentar cambios en el esquema

## 7. Mejores Prácticas

1. **Consultas**
   - Utilizar el cliente Prisma para todas las operaciones
   - Aprovechar las relaciones para consultas eficientes
   - Implementar paginación para grandes conjuntos de datos

2. **Mantenimiento**
   - Revisar regularmente los índices
   - Monitorear el rendimiento de las consultas
   - Mantener actualizado el esquema

3. **Desarrollo**
   - Seguir el patrón de repositorio
   - Implementar validaciones en la capa de aplicación
   - Mantener la consistencia en los nombres de campos 