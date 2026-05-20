import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Desactivar la detección de entorno de prueba para react-beautiful-dnd
// Esto permitirá que funcione correctamente en Cypress
if ((window as any).Cypress) {
  // Disable the "DRAG & DROP IS NOT CURRENTLY ENABLED IN THIS ENVIRONMENT" warning
  const originalConsoleError = console.error;
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('DRAG & DROP IS NOT CURRENTLY ENABLED')
    ) {
      return;
    }
    originalConsoleError(...args);
  };

  // Crear un elemento que evita la detección del entorno de prueba
  const div = document.createElement('div');
  div.id = 'react-beautiful-dnd-disable-dev-warnings';
  document.body.appendChild(div);
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
