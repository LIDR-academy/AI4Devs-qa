class PositionPage {
  // Selectores
  private selectors = {
    title: '[data-testid="position-title"]',
    columns: '[data-testid="interview-column"]',
    candidateCard: '[data-testid="candidate-card"]',
    candidateEmail: '[data-testid="candidate-email"]',
    candidatePhone: '[data-testid="candidate-phone"]',
    candidateExperience: '[data-testid="candidate-experience"]',
    errorMessage: '[data-testid="error-message"]'
  };

  // Métodos de navegación
  visit(positionId: number) {
    cy.visit(`/positions/${positionId}`);
    return this;
  }

  // Métodos de verificación
  verifyTitle(title: string) {
    cy.get(this.selectors.title)
      .should('be.visible')
      .and('contain', title);
    return this;
  }

  verifyColumnsCount(count: number) {
    cy.get(this.selectors.columns).should('have.length', count);
    return this;
  }

  verifyColumnTitle(index: number, title: string) {
    cy.get(this.selectors.columns)
      .eq(index)
      .should('contain', title);
    return this;
  }

  verifyCandidateInColumn(candidateName: string, columnIndex: number) {
    cy.get(this.selectors.columns)
      .eq(columnIndex)
      .find(this.selectors.candidateCard)
      .should('contain', candidateName);
    return this;
  }

  verifyCandidateInfo(candidateName: string, info: {
    email: string;
    phone: string;
    experience: string;
  }) {
    cy.get(this.selectors.candidateCard)
      .contains(candidateName)
      .parent()
      .within(() => {
        cy.get(this.selectors.candidateEmail).should('contain', info.email);
        cy.get(this.selectors.candidatePhone).should('contain', info.phone);
        cy.get(this.selectors.candidateExperience).should('contain', info.experience);
      });
    return this;
  }

  // Métodos de interacción
  dragCandidateToColumn(candidateName: string, targetColumnIndex: number) {
    cy.get(this.selectors.candidateCard)
      .contains(candidateName)
      .parent()
      .dragCard(`${this.selectors.columns}:nth-child(${targetColumnIndex + 1})`);
    return this;
  }

  // Métodos de verificación de estado
  verifyColumnDropTarget(columnIndex: number, isTarget: boolean) {
    cy.get(this.selectors.columns)
      .eq(columnIndex)
      .should(isTarget ? 'have.class' : 'not.have.class', 'drop-target');
    return this;
  }

  verifyErrorMessage(message: string) {
    cy.get(this.selectors.errorMessage)
      .should('be.visible')
      .and('contain', message);
    return this;
  }
}

export const positionPage = new PositionPage(); 