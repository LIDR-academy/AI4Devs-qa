import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface InterviewStep {
    id: number;
    orderIndex: number;
}

/**
 * Helper puro: dado un array de steps y el id del step actual,
 * devuelve el siguiente step ordenado por orderIndex.
 * Retorna null si es el último, lanza si el step actual no está en el array.
 */
export const findNextInterviewStep = (
    steps: InterviewStep[],
    currentStepId: number,
): InterviewStep | null => {
    const sorted = [...steps].sort((a, b) => a.orderIndex - b.orderIndex);
    const currentIndex = sorted.findIndex((s) => s.id === currentStepId);

    if (currentIndex === -1) {
        throw new Error('Current interview step does not belong to this interview flow');
    }

    if (currentIndex === sorted.length - 1) {
        return null;
    }

    return sorted[currentIndex + 1];
};

const findApplicationForCandidate = async (applicationId: number, candidateId: number) => {
    const application = await prisma.application.findFirst({
        where: { id: applicationId, candidateId },
    });
    if (!application) {
        throw new Error('Application not found');
    }
    return application;
};

const getInterviewStepsForApplication = async (positionId: number) => {
    const position = await prisma.position.findUnique({
        where: { id: positionId },
        include: {
            interviewFlow: {
                include: { interviewSteps: true },
            },
        },
    });
    if (!position) {
        throw new Error('Position not found');
    }
    return position.interviewFlow.interviewSteps;
};

export const advanceCandidateToNextInterviewStep = async (
    candidateId: number,
    applicationId: number,
) => {
    const application = await findApplicationForCandidate(applicationId, candidateId);
    const steps = await getInterviewStepsForApplication(application.positionId);
    const nextStep = findNextInterviewStep(steps, application.currentInterviewStep);

    if (!nextStep) {
        throw new Error('Candidate is already in the last interview step');
    }

    return await prisma.application.update({
        where: { id: application.id },
        data: { currentInterviewStep: nextStep.id },
    });
};
