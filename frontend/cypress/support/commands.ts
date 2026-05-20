/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
//

// Importar comandos personalizados
import './commands/dragAndDrop'
import './commands/api'

// Prevent TypeScript from reading file as legacy script
export {}

declare global {
  namespace Cypress {
    interface Chainable {
      dragCard(targetSelector: string): Chainable<Element>
      updateCandidatePhase(candidateId: number, applicationId: number, newPhase: number): Chainable<Cypress.Response<any>>
    }
  }
}