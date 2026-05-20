/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Comando personalizado para simular arrastrar y soltar un elemento
     * @param sourceSelector - Selector del elemento que se va a arrastrar
     * @param targetSelector - Selector del elemento donde se va a soltar
     * @example cy.dragAndDrop('.source-element', '.target-element')
     */
    dragAndDrop(sourceSelector: string, targetSelector: string): Chainable<Element>;

    /**
     * Comando personalizado para simular arrastrar y soltar un candidato entre columnas
     * @param candidateIndex - Índice del candidato dentro de su columna actual
     * @param sourceColumnIndex - Índice de la columna de origen (0-based)
     * @param targetColumnIndex - Índice de la columna de destino (0-based)
     * @example cy.dragAndDropCandidate(0, 0, 1) // Arrastrar el primer candidato de la primera columna a la segunda
     */
    dragAndDropCandidate(candidateIndex: number, sourceColumnIndex: number, targetColumnIndex: number): Chainable<Element>;
  }
} 