import { advanceCandidateToNextInterviewStep } from './interviewAdvanceService';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

jest.mock('@prisma/client', () => {
  const mockPrisma = {
    application: {
      findFirst: jest.fn(),
      update: jest.fn(),
    },
    position: {
      findUnique: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mockPrisma) };
});

// --- Fixtures ---

const buildSteps = (flowId: number, orderIndexes: number[]) =>
  orderIndexes.map((orderIndex, i) => ({
    id: i + 100,
    interviewFlowId: flowId,
    interviewTypeId: 1,
    name: `Step ${orderIndex}`,
    orderIndex,
  }));

const buildPositionWithFlow = (positionId: number, flowId: number, steps: any[]) => ({
  id: positionId,
  interviewFlowId: flowId,
  interviewFlow: {
    id: flowId,
    description: 'Test flow',
    interviewSteps: steps,
  },
} as any);

const buildApplication = (overrides: Record<string, any> = {}) => ({
  id: 1,
  positionId: 10,
  candidateId: 1,
  applicationDate: new Date(),
  currentInterviewStep: 100,
  notes: null,
  ...overrides,
});

beforeEach(() => jest.clearAllMocks());

// ============================================================
// 1. HAPPY PATH — avance normal de step 1 a step 2
// ============================================================

describe('advanceCandidateToNextInterviewStep — happy path', () => {
  it('should advance from step 1 to step 2 in a 3-step flow', async () => {
    // Arrange
    const steps = buildSteps(5, [1, 2, 3]); // ids: 100, 101, 102
    const application = buildApplication({ currentInterviewStep: 100 });

    jest.spyOn(prisma.application, 'findFirst').mockResolvedValue(application);
    jest.spyOn(prisma.position, 'findUnique').mockResolvedValue(
      buildPositionWithFlow(10, 5, steps),
    );
    jest.spyOn(prisma.application, 'update').mockResolvedValue({
      ...application,
      currentInterviewStep: 101,
    });

    // Act
    const result = await advanceCandidateToNextInterviewStep(1, 1);

    // Assert
    expect(prisma.application.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { currentInterviewStep: 101 },
    });
    expect(result.currentInterviewStep).toBe(101);
  });
});

// ============================================================
// 2. ERROR — application no encontrada
// ============================================================

describe('advanceCandidateToNextInterviewStep — application not found', () => {
  it('should throw when application does not exist', async () => {
    // Arrange
    jest.spyOn(prisma.application, 'findFirst').mockResolvedValue(null);

    // Act & Assert
    await expect(
      advanceCandidateToNextInterviewStep(1, 999),
    ).rejects.toThrow('Application not found');
  });
});

// ============================================================
// 3. ERROR — candidato ya está en el último step
// ============================================================

describe('advanceCandidateToNextInterviewStep — already at last step', () => {
  it('should throw when candidate is already in the last interview step', async () => {
    // Arrange
    const steps = buildSteps(5, [1, 2, 3]); // ids: 100, 101, 102
    const application = buildApplication({ currentInterviewStep: 102 });

    jest.spyOn(prisma.application, 'findFirst').mockResolvedValue(application);
    jest.spyOn(prisma.position, 'findUnique').mockResolvedValue(
      buildPositionWithFlow(10, 5, steps),
    );

    // Act & Assert
    await expect(
      advanceCandidateToNextInterviewStep(1, 1),
    ).rejects.toThrow('Candidate is already in the last interview step');
  });
});

// ============================================================
// 4. ERROR — step actual no pertenece al flujo
// ============================================================

describe('advanceCandidateToNextInterviewStep — step not in flow', () => {
  it('should throw when current step does not belong to the interview flow', async () => {
    // Arrange
    const steps = buildSteps(5, [1, 2, 3]); // ids: 100, 101, 102
    const application = buildApplication({ currentInterviewStep: 999 });

    jest.spyOn(prisma.application, 'findFirst').mockResolvedValue(application);
    jest.spyOn(prisma.position, 'findUnique').mockResolvedValue(
      buildPositionWithFlow(10, 5, steps),
    );

    // Act & Assert
    await expect(
      advanceCandidateToNextInterviewStep(1, 1),
    ).rejects.toThrow('Current interview step does not belong to this interview flow');
  });
});

// ============================================================
// 5. EDGE CASE — orderIndex no consecutivos (1, 3, 7)
// ============================================================

describe('advanceCandidateToNextInterviewStep — non-consecutive orderIndexes', () => {
  it('should advance to the next step by orderIndex, not by id', async () => {
    // Arrange
    const steps = buildSteps(5, [1, 3, 7]); // ids: 100, 101, 102
    const application = buildApplication({ currentInterviewStep: 100 });

    jest.spyOn(prisma.application, 'findFirst').mockResolvedValue(application);
    jest.spyOn(prisma.position, 'findUnique').mockResolvedValue(
      buildPositionWithFlow(10, 5, steps),
    );
    jest.spyOn(prisma.application, 'update').mockResolvedValue({
      ...application,
      currentInterviewStep: 101,
    });

    // Act
    const result = await advanceCandidateToNextInterviewStep(1, 1);

    // Assert — avanza al step con orderIndex 3 (id=101), no busca orderIndex 2
    expect(prisma.application.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { currentInterviewStep: 101 },
    });
    expect(result.currentInterviewStep).toBe(101);
  });
});
