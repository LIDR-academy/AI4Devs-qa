// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('dragAndDropNative', { prevSubject: 'element' }, (subject, target) => {
  const BUTTON_INDEX = 0;
  const SLOPPY_CLICK_THRESHOLD = 10;

  const subjectRect = subject[0].getBoundingClientRect();
  let $target = target;
  if (Array.isArray(target) || target.length > 1) {
    $target = target[0];
  }
  const targetRect = $target[0].getBoundingClientRect();

  // Paso 1: mousedown en el origen
  cy.wrap(subject)
    .trigger('mousedown', {
      button: BUTTON_INDEX,
      clientX: subjectRect.x + SLOPPY_CLICK_THRESHOLD,
      clientY: subjectRect.y + SLOPPY_CLICK_THRESHOLD,
      force: true
    });

  // Paso 2: varios mousemove intermedios (simula el arrastre)
  const steps = 5;
  for (let i = 1; i <= steps; i++) {
    const intermediateX = subjectRect.x + ((targetRect.x - subjectRect.x) * i) / steps;
    const intermediateY = subjectRect.y + ((targetRect.y - subjectRect.y) * i) / steps;
    cy.wrap(subject).trigger('mousemove', {
      button: BUTTON_INDEX,
      clientX: intermediateX,
      clientY: intermediateY,
      force: true
    });
    cy.document().trigger('mousemove', {
      button: BUTTON_INDEX,
      clientX: intermediateX,
      clientY: intermediateY,
      force: true
    });
    cy.window().trigger('mousemove', {
      button: BUTTON_INDEX,
      clientX: intermediateX,
      clientY: intermediateY,
      force: true
    });
  }

  // Paso 3: mouseup en el destino
  cy.wrap($target)
    .trigger('mousemove', {
      button: BUTTON_INDEX,
      clientX: targetRect.x + targetRect.width / 2,
      clientY: targetRect.y + targetRect.height / 2,
      force: true
    })
    .trigger('mouseup', { force: true });
});