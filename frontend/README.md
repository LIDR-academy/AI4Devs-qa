# Frontend para Sistema de Seguimiento de Talento

Este proyecto es la parte frontend de la aplicación de seguimiento de talento, construida con React.

## Estructura del Proyecto

El frontend está organizado en componentes que representan las distintas vistas de la aplicación:

- **RecruiterDashboard**: Dashboard principal del reclutador
- **AddCandidateForm**: Formulario para agregar nuevos candidatos
- **Positions**: Lista de posiciones disponibles
- **PositionDetails**: Vista detallada de una posición con tablero Kanban
- **CandidateDetails**: Panel lateral con detalles de un candidato

## Instalación

Para instalar las dependencias del proyecto:

```bash
npm install
```

## Ejecución

Para iniciar el servidor de desarrollo:

```bash
npm start
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## Construcción

Para construir la aplicación para producción:

```bash
npm run build
```

## Pruebas

### Pruebas de Integración y Unitarias

Para ejecutar las pruebas unitarias:

```bash
npm test
```

### Pruebas End-to-End (E2E)

Este proyecto utiliza Cypress para pruebas end-to-end. Las pruebas cubren los siguientes escenarios:

- Navegación por el dashboard principal
- Formulario de candidatos y su envío
- Visualización de posiciones
- Detalles de posiciones y tablero Kanban

#### Ejecución de Pruebas E2E

Para abrir el explorador de Cypress:

```bash
npm run cypress:open
```

Para ejecutar todas las pruebas en modo headless:

```bash
npm run test:e2e
```

#### Estructura de las Pruebas E2E

Las pruebas están organizadas en el directorio `cypress/e2e/` con los siguientes archivos:

- `dashboard.cy.ts`: Pruebas para el dashboard
- `candidates.cy.ts`: Pruebas para el formulario de candidatos
- `positions.cy.ts`: Pruebas para la lista de posiciones
- `position-details.cy.ts`: Pruebas para los detalles de posición
- `candidate-form-submit.cy.ts`: Pruebas para el envío del formulario

Los mocks de datos para pruebas se encuentran en `cypress/fixtures/`.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
