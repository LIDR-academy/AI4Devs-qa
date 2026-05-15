/**
 * Property-based tests for findNextInterviewStep.
 *
 * These tests verify domain invariants using randomly generated inputs
 * via fast-check. They target the pure helper function directly,
 * without Prisma mocks or async logic.
 */

import fc from 'fast-check';
import { findNextInterviewStep } from './interviewAdvanceService';

// --- Generador: array de steps con ids únicos y orderIndexes únicos ---

const uniqueStepsArb = (minLength = 2, maxLength = 20) =>
  fc
    .uniqueArray(fc.integer({ min: 1, max: 10000 }), { minLength, maxLength })
    .chain((ids) =>
      fc
        .uniqueArray(fc.integer({ min: 1, max: 10000 }), {
          minLength: ids.length,
          maxLength: ids.length,
        })
        .map((orderIndexes) =>
          ids.map((id, i) => ({ id, orderIndex: orderIndexes[i] })),
        ),
    );

// Helper: ordenar steps por orderIndex
const sortByOrder = (steps: { id: number; orderIndex: number }[]) =>
  [...steps].sort((a, b) => a.orderIndex - b.orderIndex);

describe('findNextInterviewStep — property-based tests', () => {

  // --- P1: El siguiente step siempre pertenece al array de entrada ---
  it('P1: next step always belongs to the input array', () => {
    fc.assert(
      fc.property(uniqueStepsArb(), (steps) => {
        const first = sortByOrder(steps)[0];

        const result = findNextInterviewStep(steps, first.id);

        expect(result).not.toBeNull();
        expect(steps.some((s) => s.id === result!.id)).toBe(true);
      }),
    );
  });

  // --- P2: El siguiente step tiene orderIndex mayor al actual ---
  it('P2: next step has strictly greater orderIndex than current', () => {
    fc.assert(
      fc.property(uniqueStepsArb(), (steps) => {
        const first = sortByOrder(steps)[0];

        const result = findNextInterviewStep(steps, first.id);

        expect(result!.orderIndex).toBeGreaterThan(first.orderIndex);
      }),
    );
  });

  // --- P3: No existe ningún step intermedio entre actual y siguiente ---
  it('P3: no step exists between current and next orderIndex', () => {
    fc.assert(
      fc.property(uniqueStepsArb(), (steps) => {
        const first = sortByOrder(steps)[0];

        const result = findNextInterviewStep(steps, first.id);

        const stepsInBetween = steps.filter(
          (s) =>
            s.orderIndex > first.orderIndex &&
            s.orderIndex < result!.orderIndex,
        );
        expect(stepsInBetween).toHaveLength(0);
      }),
    );
  });

  // --- P4: Si el actual es el último, retorna null ---
  it('P4: returns null when current step is the last by orderIndex', () => {
    fc.assert(
      fc.property(
        uniqueStepsArb(1, 20),
        (steps) => {
          const sorted = sortByOrder(steps);
          const lastStep = sorted[sorted.length - 1];

          const result = findNextInterviewStep(steps, lastStep.id);

          expect(result).toBeNull();
        },
      ),
    );
  });

  // --- P6: Lanza error si el id no existe en el array ---
  it('P6: throws when currentStepId does not exist in steps', () => {
    fc.assert(
      fc.property(
        uniqueStepsArb(),
        fc.integer({ min: -99999, max: -1 }),
        (steps, fakeId) => {
          expect(() => findNextInterviewStep(steps, fakeId)).toThrow(
            'Current interview step does not belong to this interview flow',
          );
        },
      ),
    );
  });

  // --- P7: No muta el array de entrada ---
  it('P7: does not mutate the input array', () => {
    fc.assert(
      fc.property(uniqueStepsArb(), (steps) => {
        const snapshot = steps.map((s) => ({ ...s }));
        const first = sortByOrder(steps)[0];

        findNextInterviewStep(steps, first.id);

        expect(steps).toEqual(snapshot);
      }),
    );
  });

  // --- P8: El resultado es el mismo sin importar el orden del array de entrada ---
  it('P8: result is the same regardless of input array order', () => {
    fc.assert(
      fc.property(uniqueStepsArb(), (steps) => {
        const first = sortByOrder(steps)[0];

        const result1 = findNextInterviewStep(steps, first.id);
        const result2 = findNextInterviewStep([...steps].reverse(), first.id);

        expect(result1).toEqual(result2);
      }),
    );
  });
});
