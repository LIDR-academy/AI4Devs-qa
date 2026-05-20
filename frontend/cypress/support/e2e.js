// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Import drag and drop plugin
import '@4tw/cypress-drag-drop';

// Hack necesario para permitir pruebas de arrastrar y soltar con react-beautiful-dnd
// DataTransfer no está disponible en algunos navegadores durante las pruebas
if (typeof DataTransfer === 'undefined') {
  class DataTransfer {
    constructor() {
      this.data = {};
    }
    setData(format, data) {
      this.data[format] = data;
    }
    getData(format) {
      return this.data[format];
    }
  }
  
  window.DataTransfer = DataTransfer;
}

// Desactivar la optimización de react-beautiful-dnd que detecta entornos de pruebas
// Para asegurar que el drag and drop funcione correctamente
window.beforeAll = () => {
  const div = document.createElement('div');
  div.id = 'react-beautiful-dnd-disable-dev-warnings';
  document.body.appendChild(div);
}; 