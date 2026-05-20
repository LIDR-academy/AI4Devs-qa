// Archivo de prueba para la interfaz de posición
describe('Interfaz de Posición', () => {
  beforeEach(() => {
    // Visitar la página de posiciones antes de cada prueba
    cy.visit('/positions');
  });

  it('Debe cargar la página de posiciones correctamente', () => {
    // Verificar que estamos en la página correcta
    cy.url().should('include', '/positions');
    
    // Verificar que el título de la página existe
    cy.get('h2.text-center').should('exist').and('contain', 'Posiciones');

    // Verificar que existe el botón para volver al dashboard
    cy.get('button.mb-3').should('exist').and('contain', 'Volver al Dashboard');
  });

  it('Debe mostrar los filtros de búsqueda correctamente', () => {
    // Verificar que existen los campos de filtro
    cy.get('input[placeholder="Buscar por título"]').should('exist');
    cy.get('input[placeholder="Buscar por fecha"]').should('exist');
    
    // Verificar los selectores de filtro
    cy.get('select').eq(0).should('contain', 'Estado')
      .and('contain', 'Abierto')
      .and('contain', 'Contratado')
      .and('contain', 'Cerrado')
      .and('contain', 'Borrador');
    
    cy.get('select').eq(1).should('contain', 'Manager');
  });

  it('Debe mostrar la lista de posiciones con la información correcta', () => {
    // Verificar que existen las tarjetas de posiciones
    cy.get('.card').should('have.length.at.least', 1);
    
    // Verificar la estructura de la primera tarjeta de posición
    cy.get('.card').first().within(() => {
      // Debe tener título
      cy.get('.card-title').should('exist');
      
      // Debe tener información de contacto y deadline
      cy.get('.card-text').should('contain', 'Manager')
        .and('contain', 'Deadline');
      
      // Debe tener una etiqueta de estado
      cy.get('.badge').should('exist');
      
      // Debe tener botones de acción
      cy.get('button').contains('Ver proceso').should('exist');
      cy.get('button').contains('Editar').should('exist');
    });
  });

  it('Debe navegar al detalle de la posición al hacer clic en "Ver proceso"', () => {
    // Interceptar la solicitud de API para el detalle de la posición
    cy.intercept('GET', 'http://localhost:3010/positions/*/interviewFlow').as('getInterviewFlow');
    cy.intercept('GET', 'http://localhost:3010/positions/*/candidates').as('getCandidates');
    
    // Hacer clic en el primer botón "Ver proceso"
    cy.get('button').contains('Ver proceso').first().click();
    
    // Verificar que la URL cambia al detalle de la posición
    cy.url().should('include', '/positions/');
    
    // Esperar a que se carguen los datos de la API
    cy.wait('@getInterviewFlow');
    cy.wait('@getCandidates');
    
    // Verificar que se muestra el título de la posición
    cy.get('h2.text-center').should('exist');
    
    // Verificar que existe el botón para volver a posiciones
    cy.get('button.mb-3').should('contain', 'Volver a Posiciones');
  });
});

// Prueba para la página de detalles de posición
describe('Detalle de Posición', () => {
  beforeEach(() => {
    // Interceptar las solicitudes de API
    cy.intercept('GET', 'http://localhost:3010/positions/*/interviewFlow').as('getInterviewFlow');
    cy.intercept('GET', 'http://localhost:3010/positions/*/candidates').as('getCandidates');
    
    // Visitar la página de posiciones y navegar al detalle de la primera posición
    cy.visit('/positions');
    cy.get('button').contains('Ver proceso').first().click();
    
    // Esperar a que se carguen los datos
    cy.wait('@getInterviewFlow');
    cy.wait('@getCandidates');
  });

  it('Debe mostrar las columnas de etapas correctamente', () => {
    // Verificar que existen las columnas de etapas
    cy.get('.card-header').should('have.length.at.least', 1);
    
    // Verificar que cada columna tiene un título
    cy.get('.card-header').each((header) => {
      cy.wrap(header).should('not.be.empty');
    });
  });

  it('Debe mostrar las tarjetas de candidatos correctamente', () => {
    // Si hay candidatos, verificar su estructura
    cy.get('.card-body .card').then($cards => {
      if ($cards.length > 0) {
        // Verificar la estructura de la primera tarjeta de candidato
        cy.wrap($cards).first().within(() => {
          // Debe tener nombre del candidato
          cy.get('.card-title').should('exist');
          
          // Debe tener indicadores de valoración (emojis de rating)
          cy.get('span[role="img"]').should('exist');
        });
      } else {
        // Si no hay candidatos, solo verificamos que las columnas existen
        cy.log('No hay candidatos en las etapas');
        cy.get('.card-header').should('have.length.at.least', 1);
      }
    });
  });

  it('Debe abrir el panel lateral al hacer clic en un candidato', () => {
    // Si hay candidatos, probar la interacción
    cy.get('.card-body .card').then($cards => {
      if ($cards.length > 0) {
        // Hacer clic en el primer candidato
        cy.wrap($cards).first().click();
        
        // Verificar que se abre el panel lateral
        cy.get('.offcanvas').should('exist');
      } else {
        cy.log('No hay candidatos para probar la interacción');
      }
    });
  });

  it('Debe permitir arrastrar candidatos entre columnas (simulación)', () => {
    // Nota: El arrastre real con react-beautiful-dnd es complejo en Cypress
    // Esta es una prueba que verifica la estructura necesaria para el arrastre
    
    cy.get('.card-body .card').then($cards => {
      if ($cards.length > 0) {
        // Verificar que los elementos tienen los atributos requeridos para drag-and-drop
        cy.wrap($cards).first()
          .should('have.attr', 'draggable')
          .and('eq', 'true');
      } else {
        cy.log('No hay candidatos para probar el arrastre');
      }
    });
  });
}); 