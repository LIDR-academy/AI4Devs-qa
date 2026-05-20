export const API_BASE_URL = 'http://localhost:3010';

export const endpoints = {
  positions: {
    get: (id: number) => `${API_BASE_URL}/positions/${id}`,
    getCandidates: (id: number) => `${API_BASE_URL}/positions/${id}/candidates`,
    getInterviewFlow: (id: number) => `${API_BASE_URL}/positions/${id}/interviewflow`,
  },
  candidates: {
    updatePhase: (id: number) => `${API_BASE_URL}/candidates/${id}`,
  },
};

export const mockResponses = {
  positions: {
    success: {
      id: 1,
      title: 'Senior Frontend Developer',
      description: 'Buscamos un desarrollador frontend senior...',
      requirements: ['React', 'TypeScript', '5+ años de experiencia'],
      status: 'active',
    },
  },
  candidates: {
    success: [
      {
        id: 1,
        name: 'Juan Pérez',
        email: 'juan.perez@example.com',
        phone: '+34612345678',
        experience: 'Tech Corp',
        currentPhase: 1,
      },
      {
        id: 2,
        name: 'María García',
        email: 'maria.garcia@example.com',
        phone: '+34687654321',
        experience: 'Digital Solutions',
        currentPhase: 2,
      },
    ],
  },
  interviewFlow: {
    success: [
      {
        id: 1,
        name: 'Screening Inicial',
        order: 1,
      },
      {
        id: 2,
        name: 'Entrevista Técnica',
        order: 2,
      },
      {
        id: 3,
        name: 'Prueba Práctica',
        order: 3,
      },
      {
        id: 4,
        name: 'Entrevista Final',
        order: 4,
      },
    ],
  },
}; 