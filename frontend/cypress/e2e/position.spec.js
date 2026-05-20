describe('Position Page', () => {
    beforeEach(() => {
        // Interceptar APIs
        cy.intercept('GET', 'http://localhost:3010/positions', { fixture: 'positions.json' }).as('getPositions');
        cy.intercept('GET', 'http://localhost:3010/positions/*/interviewFlow', { fixture: 'position.json' }).as('getPosition');
        cy.intercept('GET', 'http://localhost:3010/positions/*/candidates', { fixture: 'candidates.json' }).as('getCandidates');
        cy.intercept('PUT', 'http://localhost:3010/candidates/*/step', (req) => {
            req.reply({ statusCode: 200 });
        }).as('candidateUpdates');
        cy.intercept('GET', 'http://localhost:3010/candidates/*', {
            fixture: 'candidate-details.json'
        }).as('getCandidateDetails');

        cy.visit('/positions');
        cy.wait('@getPositions');
        cy.waitForPageLoad();
    });

    describe('Positions List Page', () => {
        it('displays positions list header and cards', () => {
            cy.contains('h2', 'Posiciones').should('be.visible');
            cy.get('.card').first().within(() => {
                cy.get('.card-title').should('contain', 'Senior Frontend Developer');
                cy.get('.badge').should('contain', 'Open');
            });
        });

        it('navigates to position details', () => {
            cy.contains('button', 'Ver proceso').first().click();
            cy.wait(['@getPosition', '@getCandidates']);
            cy.waitForPageLoad();
        });
    });

    describe('Position Details Page', () => {
        beforeEach(() => {
            cy.contains('button', 'Ver proceso').first().click();
            cy.wait(['@getPosition', '@getCandidates']);
            cy.waitForPageLoad();
        });

        it('shows position title and stages', () => {
            cy.contains('h2', 'Senior Frontend Developer').should('be.visible');
            cy.get('.col-md-3 > .card > .card-header').each(($header, index) => {
                const stages = ['CV Review', 'Technical Interview', 'HR Interview', 'Final Decision'];
                cy.wrap($header).should('contain', stages[index]);
            });
        });

        it('displays candidates in correct columns', () => {
            // Verificar candidatos en sus columnas
            const candidates = ['John Doe', 'Jane Smith', 'Bob Wilson'];
            candidates.forEach((name, index) => {
                cy.get('.col-md-3').eq(index)
                    .find('.card .card-title')
                    .first()
                    .should('contain', name);
            });
        });

        it('allows dragging candidate between columns', () => {
            // Esperar a que la página esté completamente cargada
            cy.get('.col-md-3').should('have.length', 4);

            // Esperar a que el primer candidato esté visible
            cy.get('.col-md-3').eq(0)
                .find('.card')
                .first()
                .should('be.visible')
                .within(() => {
                    cy.get('.card-title').should('contain', 'John Doe');
                });

            // Esperar a que los elementos de drag and drop estén inicializados
            cy.get('[data-rbd-drag-handle-draggable-id]')
                .first()
                .should('exist')
                .as('dragSource');

            cy.get('[data-rbd-droppable-id="1"]')
                .should('exist')
                .should('be.visible')
                .as('dropTarget');

            // Realizar el drag and drop
            cy.get('@dragSource').then(() => {
                cy.get('@dropTarget').then(() => {
                    cy.dragAndDrop('@dragSource', '@dropTarget');

                    // Esperar a que se complete la actualización
                    cy.wait('@candidateUpdates', { timeout: 10000 });

                    // Verificar que John Doe está ahora en la segunda columna
                    cy.get('.col-md-3').eq(1)
                        .find('.card')
                        .first()
                        .within(() => {
                            cy.get('.card-title').should('contain', 'John Doe');
                        });
                });
            });
        });

        it('shows candidate details on click', () => {
            // Click en el primer candidato
            cy.get('.col-md-3').eq(0)
                .find('.card')
                .first()
                .click();

            // Esperar a que se carguen los detalles del candidato
            cy.wait('@getCandidateDetails');

            // Verificar el contenido del panel
            cy.get('.offcanvas.show').within(() => {
                cy.contains('h5', 'John Doe').should('be.visible');
                cy.contains('p', 'Email:').should('be.visible');
                cy.contains('h5', 'Educación').should('be.visible');
                cy.contains('h5', 'Experiencias Laborales').should('be.visible');
            });
        });
    });
});
