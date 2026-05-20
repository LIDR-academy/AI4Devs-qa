// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- This is a parent command --
Cypress.Commands.add('visitPosition', (id) => {
    // Interceptar las llamadas a la API antes de visitar la página
    cy.interceptAPI();

    // Visitar la página principal
    cy.visit('/');

    // Esperar a que se cargue la lista de posiciones
    cy.wait('@getPositions');

    // Hacer clic en el botón "Ver proceso" de la posición específica
    cy.contains('Ver proceso').click();

    // Esperar a que se carguen los datos de la posición
    cy.wait(['@getPosition', '@getCandidates']);
});

Cypress.Commands.add('waitForPageLoad', () => {
    // Esperar a que el contenedor principal esté visible
    cy.get('.container').should('be.visible');
    // Esperar a que desaparezcan los spinners o loaders si existen
    cy.get('.spinner-border').should('not.exist');
});

Cypress.Commands.add('dragAndDrop', (source, target) => {
    const options = {
        force: true,
        eventConstructor: 'DragEvent',
        dataTransfer: new DataTransfer(),
    };

    cy.get(source).then($source => {
        const sourceId = $source.attr('data-rbd-drag-handle-draggable-id');

        // Trigger dragstart
        cy.get(source)
            .trigger('mousedown', { button: 0 })
            .trigger('dragstart', options);

        cy.get(target).then($target => {
            // Trigger dragenter and dragover
            cy.get(target)
                .trigger('dragenter', options)
                .trigger('dragover', options);

            // Trigger drop
            cy.get(target)
                .trigger('drop', {
                    ...options,
                    dataTransfer: {
                        getData: () => sourceId
                    }
                });

            // Trigger dragend
            cy.get(source)
                .trigger('dragend', options)
                .trigger('mouseup', { force: true });

            // Esperar a que se procese la actualización
            cy.wait(500);
        });
    });
});

// Comando para interceptar las APIs
Cypress.Commands.add('interceptAPI', () => {
    // Interceptar la lista de posiciones
    cy.intercept('GET', '**/positions', {
        fixture: 'positions.json'
    }).as('getPositions');

    // Interceptar los detalles de la posición
    cy.intercept('GET', '**/positions/*/interviewFlow', {
        fixture: 'position.json'
    }).as('getPosition');

    // Interceptar la lista de candidatos
    cy.intercept('GET', '**/positions/*/candidates', {
        fixture: 'candidates.json'
    }).as('getCandidates');

    // Interceptar las actualizaciones de candidatos
    cy.intercept('PUT', '**/candidates/*', (req) => {
        req.reply({ statusCode: 200 });
    }).as('candidateUpdates');
});
