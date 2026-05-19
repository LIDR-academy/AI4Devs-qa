// Page Object Model for Position Page
class PositionPage {
  // Selectors
  positionTitle = '[data-cy=position-title]';
  hiringStageColumns = '[data-cy=stage-column]';
  candidateCards = '[data-cy=candidate-card]';
  
  // Methods
  visit() {
    cy.visit('/positions');
    return this;
  }
  
  getPositionTitle() {
    return cy.get(this.positionTitle);
  }
  
  getHiringStageColumns() {
    return cy.get(this.hiringStageColumns);
  }
  
  getCandidateCards() {
    return cy.get(this.candidateCards);
  }
  
  getCandidateCardByIndex(index) {
    return cy.get(`${this.candidateCards}`).eq(index);
  }
  
  getColumnByIndex(index) {
    return cy.get(`${this.hiringStageColumns}`).eq(index);
  }
  
  getCandidateCardByName(name) {
    return cy.get(`${this.candidateCards}:contains("${name}")`);
  }
  
  dragCandidateToColumn(candidateIndex, columnIndex) {
    const card = this.getCandidateCardByIndex(candidateIndex);
    const column = this.getColumnByIndex(columnIndex);
    
    card.drag(column);
    return this;
  }
}

export default new PositionPage(); 