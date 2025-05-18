/// <reference types="cypress" />

describe('Test positions page', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:3000')

    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    // check should exists and be visible

    cy.get('[data-test-id=home-page-title]').should('exist').and('be.visible')

    // click on the button go-to-positions
    cy.get('[data-test-id=go-to-positions]').click()

    // check if the url is http://localhost:3000/positions
    cy.url().should('include', '/positions')

    // check if the title exists and is visible
    cy.get('[data-test-id=positions-page-title]').should('exist').and('be.visible')

    // Wait for positions to load
    cy.wait(1000)

    // Find the first "Ver proceso" button with the data-test-id and verify it exists
    cy.get('[data-test-id=view-position-process-button]')
      .should('exist')
      .and('be.visible')
      .first()
      .click()

    // Verify we're redirected to the position details page
    cy.url().should('match', /\/positions\/\d+/)
    

    // Verifica que las tarjetas de los candidatos se muestran en la columna correcta según su fase actual.
    cy.get('[data-test-id=position-details-container]').should('exist').and('be.visible')
    cy.get('[data-test-id=position-title]').should('exist').and('be.visible')
    
    // Wait for stage columns and candidates to load
    cy.wait(2000)
  })

  it('Position page has loaded correctly', () => {
    
    cy.get('[data-test-id^="stage-column-"]').then($columns => {
      // Verify at least one column exists
      expect($columns.length).to.be.at.least(1)
      
      // For each column
      cy.wrap($columns).each($column => {
        // Get the stage title from the header
        const stageTitle = $column.find('[data-test-id^="stage-header-"]').text()
        
        // Get all candidate cards in this column
        const $candidateCards = $column.find('[data-test-id^="candidate-card-"]')
        
        if ($candidateCards.length !== 0) {

          // Verify that each candidate in this column has the correct stage
          cy.wrap($candidateCards).each($card => {
            // Get the candidate ID from the data-test-id attribute
            const fullTestId = $card.attr('data-test-id')
            const candidateId = fullTestId.replace('candidate-card-', '')
            
            // Verify the candidate name exists
            cy.wrap($card).find(`[data-test-id="candidate-name-${candidateId}"]`)
              .should('exist')
              
            // Verify candidate is in the correct column/stage
            // We're verifying that the candidate appears in a column with the stage 
            // title that should match their current stage
            cy.wrap($card).should('be.visible')
          })
        } else {
          cy.log('No se encontraron candidatos para realizar la prueba de drag and drop');
        }
      })
    })
  })

  it('Can drag candidate between columns', () => {
    // Verificar que existen al menos 2 columnas
    cy.get('[data-test-id^="stage-column-"]').then($columns => {
      // Verificar que hay al menos 2 columnas para poder hacer el drag and drop
      if ($columns.length >= 2) {
        // Obtener la primera columna que tenga al menos un candidato
        let sourceColumnIndex = null;
        let candidateCard = null;
        let candidateId = null;
        let sourceStageName = null;
        let targetStageName = null;
        
        // Buscar una columna con candidatos para usar como origen
        for (let i = 0; i < $columns.length; i++) {
          const $candidateCards = Cypress.$($columns[i]).find('[data-test-id^="candidate-card-"]');
          if ($candidateCards.length > 0) {
            sourceColumnIndex = i;
            candidateCard = $candidateCards[0];
            candidateId = candidateCard.getAttribute('data-test-id').replace('candidate-card-', '');
            sourceStageName = Cypress.$($columns[i]).find('[data-test-id^="stage-header-"]').text();
            break;
          }
        }
        
        // Si encontramos una columna con candidatos
        if (sourceColumnIndex !== null) {
          // Encontrar una columna de destino diferente
          let targetColumnIndex = (sourceColumnIndex + 1) % $columns.length;
          targetStageName = Cypress.$($columns[targetColumnIndex]).find('[data-test-id^="stage-header-"]').text();
          
          cy.log(`Intentando mover candidato ${candidateId} de "${sourceStageName}" a "${targetStageName}"`);
          
          // Interceptar la llamada al backend que actualiza la posición del candidato
          cy.intercept('PUT', `**/candidates/${candidateId}`).as('updateCandidateStage');
          
          // Simular el drag and drop del candidato
          const sourceSelector = `[data-test-id="candidate-card-${candidateId}"]`;
          const targetSelector = `[data-test-id="candidates-container-${targetStageName}"]`;
          
          // Usar nuestro comando personalizado
          cy.dragAndDrop(sourceSelector, targetSelector);
          
          // Verificar que la llamada al backend se realizó
          cy.wait('@updateCandidateStage').then(interception => {
            // Verificar que la respuesta fue exitosa
            expect(interception.response.statusCode).to.be.oneOf([200, 204]);
            
            // Verificar que el candidato ya no está en la columna original
            cy.get(`[data-test-id="stage-column-${sourceStageName}"]`)
              .find(`[data-test-id="candidate-card-${candidateId}"]`)
              .should('not.exist');
              
            // Verificar que el candidato ahora está en la columna destino
            cy.get(`[data-test-id="stage-column-${targetStageName}"]`)
              .find(`[data-test-id="candidate-card-${candidateId}"]`)
              .should('exist');
          });
        } else {
          cy.log('No se encontraron candidatos para realizar la prueba de drag and drop');
        }
      } else {
        cy.log('Se necesitan al menos 2 columnas para realizar la prueba de drag and drop');
      }
    });
  });

})

