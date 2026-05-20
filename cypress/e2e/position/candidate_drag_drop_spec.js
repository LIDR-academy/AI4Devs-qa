describe('Cambio de Fase de Candidatos mediante Drag and Drop', () => {
  beforeEach(() => {
    // Interceptar las solicitudes de API
    cy.intercept('GET', 'http://localhost:3010/positions/*/interviewFlow').as('getInterviewFlow');
    cy.intercept('GET', 'http://localhost:3010/positions/*/candidates').as('getCandidates');
    
    // Interceptar la solicitud PUT que se hace al mover un candidato
    cy.intercept('PUT', 'http://localhost:3010/candidates/*').as('updateCandidate');
    
    // Visitar la página de posiciones y navegar al detalle de la primera posición
    cy.visit('/positions');
    cy.get('button').contains('Ver proceso').first().click();
    
    // Esperar a que se carguen los datos
    cy.wait('@getInterviewFlow');
    cy.wait('@getCandidates');
  });

  it('Debe permitir arrastrar un candidato a otra columna y actualizar el backend', () => {
    // Verificar que hay al menos dos columnas para poder hacer la prueba
    cy.get('.card-header').should('have.length.at.least', 2);
    
    // Verificar si hay candidatos para poder realizar la prueba
    cy.get('.card-body .card').then($cards => {
      if ($cards.length === 0) {
        cy.log('No hay candidatos para probar el arrastre. Finalizando prueba.');
        return;
      }
      
      // Obtener la primera tarjeta de candidato y su información
      cy.get('.card-body .card').first().within(() => {
        cy.get('.card-title').invoke('text').as('candidateName');
      });
      
      // Guardar el ID del candidato (está como atributo draggableId)
      cy.get('.card-body .card').first()
        .invoke('attr', 'draggable-id')
        .as('candidateId');
      
      // Identificar la columna origen (índice 0) y destino (índice 1)
      cy.get('.card-header').eq(0).invoke('text').as('sourceColumnName');
      cy.get('.card-header').eq(1).invoke('text').as('targetColumnName');
      
      // Realizar la operación de drag and drop
      // Usamos el plugin @4tw/cypress-drag-drop para esto
      cy.get('.card-body .card').first().drag('.card-header').eq(1);
      
      // Alternativa si el plugin no funciona con react-beautiful-dnd:
      // Simular el evento de drag and drop a nivel de DOM
      /* 
      cy.get('.card-body .card').first().then($card => {
        const dataTransfer = new DataTransfer();
        
        // Disparar eventos de arrastre
        $card[0].dispatchEvent(new DragEvent('dragstart', { dataTransfer }));
        
        // Obtener el elemento destino
        cy.get('.col-md-3').eq(1).then($target => {
          // Disparar eventos en el destino
          $target[0].dispatchEvent(new DragEvent('dragover', { dataTransfer }));
          $target[0].dispatchEvent(new DragEvent('drop', { dataTransfer }));
        });
        
        // Finalizar el arrastre
        $card[0].dispatchEvent(new DragEvent('dragend'));
      });
      */
      
      // Verificar que se ha hecho la llamada a la API
      cy.wait('@updateCandidate').then((interception) => {
        // Verificar que la solicitud es correcta
        expect(interception.request.method).to.equal('PUT');
        
        // Verificar que el payload contiene los datos correctos
        // Nota: Ajusta según la estructura real de tu API
        expect(interception.request.body).to.have.property('currentInterviewStep');
        
        // Verificar que la respuesta es exitosa
        expect(interception.response.statusCode).to.be.oneOf([200, 204]);
      });
      
      // Verificar cambios en la UI
      // 1. El candidato debería estar ahora en la columna destino
      cy.get('@candidateName').then(candidateName => {
        cy.get('.col-md-3').eq(1).find('.card-title').should('contain', candidateName);
      });
      
      // 2. El candidato no debería estar en la columna origen
      cy.get('@candidateName').then(candidateName => {
        cy.get('.col-md-3').eq(0).find('.card-title').should('not.contain', candidateName);
      });
    });
  });

  it('Debe manejar errores al actualizar la fase del candidato', () => {
    // Verificar si hay candidatos para poder realizar la prueba
    cy.get('.card-body .card').then($cards => {
      if ($cards.length === 0) {
        cy.log('No hay candidatos para probar el manejo de errores. Finalizando prueba.');
        return;
      }
      
      // Interceptar la solicitud PUT para simular un error
      cy.intercept('PUT', 'http://localhost:3010/candidates/*', {
        statusCode: 500,
        body: { error: 'Error al actualizar el candidato' }
      }).as('updateCandidateError');
      
      // Realizar la operación de drag and drop
      cy.get('.card-body .card').first().drag('.card-header').eq(1);
      
      // Verificar que se ha hecho la llamada a la API
      cy.wait('@updateCandidateError');
      
      // Aquí deberíamos verificar que la aplicación muestra un mensaje de error
      // o maneja el error de alguna manera apropiada
      // (ajusta según cómo tu aplicación maneja los errores)
      
      // Por ejemplo, si tu aplicación muestra un toast o alerta:
      // cy.get('.toast-error').should('be.visible');
      // cy.get('.alert-danger').should('be.visible');
    });
  });
});
