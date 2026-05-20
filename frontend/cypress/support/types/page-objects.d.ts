declare namespace Cypress {
  interface Chainable {
    dragCard(targetSelector: string): Chainable<Element>;
  }
}

interface CandidateInfo {
  email: string;
  phone: string;
  experience: string;
}

interface PositionPage {
  visit(positionId: number): PositionPage;
  verifyTitle(title: string): PositionPage;
  verifyColumnsCount(count: number): PositionPage;
  verifyColumnTitle(index: number, title: string): PositionPage;
  verifyCandidateInColumn(candidateName: string, columnIndex: number): PositionPage;
  verifyCandidateInfo(candidateName: string, info: CandidateInfo): PositionPage;
  dragCandidateToColumn(candidateName: string, targetColumnIndex: number): PositionPage;
  verifyColumnDropTarget(columnIndex: number, isTarget: boolean): PositionPage;
  verifyErrorMessage(message: string): PositionPage;
} 