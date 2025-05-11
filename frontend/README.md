# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Pruebas E2E con Cypress

### Instalación de dependencias

Asegúrate de tener instaladas las dependencias del frontend:

```bash
cd frontend
npm install
```

### Ejecución de las pruebas E2E

1. Inicia la aplicación frontend y el backend en los puertos correspondientes (por defecto, frontend en http://localhost:3000 y backend en http://localhost:3010).
2. En una terminal, ejecuta:

```bash
npx cypress open
```

Esto abrirá la interfaz de Cypress donde podrás seleccionar y ejecutar los tests ubicados en `cypress/e2e/positions.cy.js`.

También puedes ejecutar las pruebas en modo headless:

```bash
npx cypress run
```

### Estructura de carpetas relevante

- `frontend/cypress/e2e/positions.cy.js`: Pruebas E2E para la interfaz de posiciones.

### Notas
- Asegúrate de que los endpoints y datos de prueba estén disponibles para que los tests funcionen correctamente.
- Si modificas los selectores o la estructura de la UI, actualiza los tests en consecuencia.
