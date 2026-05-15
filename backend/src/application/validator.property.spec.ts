/**
 * Property-based tests for validator.ts
 *
 * These tests verify domain invariants of each validation function
 * using randomly generated inputs via fast-check.
 * Tests marked [spec-gap] document known inconsistencies with api-spec.yaml.
 */

import fc from 'fast-check';
import { validateCandidateData } from './validator';

// ================================================================
// GENERADORES (fast-check v4 — usa fc.array + join en vez de stringOf)
// ================================================================

const NAME_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZñÑáéíóúÁÉÍÓÚ '.split('');
const DIGIT_CHARS = '0123456789'.split('');
const INVALID_NAME_CHARS = '0123456789!@#$%^&*()-_=+[]{}|;:",.<>?/~`'.split('');
const ALPHA_CHARS = 'abcdefghijklmnopqrstuvwxyz'.split('');
const ALPHANUM_CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
const JUNK_CHARS = 'abcdefghijklmnopqrstuvwxyz!@#$%'.split('');

const charsToString = (chars: string[]) => chars.join('');

const validNameArb = (min = 2, max = 100) =>
  fc.array(fc.constantFrom(...NAME_CHARS), { minLength: min, maxLength: max })
    .map(charsToString);

const invalidNameCharArb =
  fc.array(fc.constantFrom(...INVALID_NAME_CHARS), { minLength: 1, maxLength: 1 })
    .map(charsToString);

const validEmailArb = fc
  .tuple(
    fc.array(fc.constantFrom(...ALPHANUM_CHARS), { minLength: 1, maxLength: 20 }).map(charsToString),
    fc.array(fc.constantFrom(...ALPHA_CHARS), { minLength: 1, maxLength: 15 }).map(charsToString),
    fc.array(fc.constantFrom(...ALPHA_CHARS), { minLength: 2, maxLength: 5 }).map(charsToString),
  )
  .map(([local, domain, tld]) => `${local}@${domain}.${tld}`);

const spanishPhoneArb = fc
  .tuple(
    fc.constantFrom('6', '7', '9'),
    fc.array(fc.constantFrom(...DIGIT_CHARS), { minLength: 8, maxLength: 8 }).map(charsToString),
  )
  .map(([prefix, rest]) => `${prefix}${rest}`);

const internationalPhoneArb = fc
  .array(fc.constantFrom(...DIGIT_CHARS), { minLength: 7, maxLength: 15 })
  .map((digits) => `+${digits.join('')}`);

const validDateArb = fc
  .tuple(
    fc.integer({ min: 1900, max: 2099 }),
    fc.integer({ min: 1, max: 12 }),
    fc.integer({ min: 1, max: 28 }),
  )
  .map(([y, m, d]) => `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`);

const validCandidateArb = fc
  .tuple(validNameArb(), validNameArb(), validEmailArb)
  .map(([firstName, lastName, email]) => ({ firstName, lastName, email }));

const noAtStringArb = fc
  .array(fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz0123456789.'.split('')), { minLength: 1, maxLength: 50 })
  .map(charsToString)
  .filter((s) => !s.includes('@'));

const longLocalArb = fc
  .array(fc.constantFrom(...ALPHA_CHARS), { minLength: 256, maxLength: 400 })
  .map(charsToString);

const junkPhoneArb = fc
  .array(fc.constantFrom(...JUNK_CHARS), { minLength: 1, maxLength: 20 })
  .map(charsToString);

// ================================================================
// validateName
// ================================================================

describe('validateName — properties', () => {
  it('N1: any name with 2-100 valid chars passes', () => {
    fc.assert(
      fc.property(validNameArb(2, 100), (name) => {
        expect(() =>
          validateCandidateData({ firstName: name, lastName: 'Test', email: 'a@b.co' }),
        ).not.toThrow();
      }),
    );
  });

  it('N2: any name containing an illegal char fails', () => {
    fc.assert(
      fc.property(
        validNameArb(1, 50),
        invalidNameCharArb,
        validNameArb(0, 50),
        (prefix, bad, suffix) => {
          const name = `${prefix}${bad}${suffix}`;
          if (name.length >= 2 && name.length <= 100) {
            expect(() =>
              validateCandidateData({ firstName: name, lastName: 'Test', email: 'a@b.co' }),
            ).toThrow('Invalid name');
          }
        },
      ),
    );
  });

  it('N3: any name shorter than 2 chars fails', () => {
    fc.assert(
      fc.property(validNameArb(0, 1), (name) => {
        expect(() =>
          validateCandidateData({ firstName: name, lastName: 'Test', email: 'a@b.co' }),
        ).toThrow('Invalid name');
      }),
    );
  });

  it('N4: any name longer than 100 chars fails', () => {
    fc.assert(
      fc.property(validNameArb(101, 200), (name) => {
        expect(() =>
          validateCandidateData({ firstName: name, lastName: 'Test', email: 'a@b.co' }),
        ).toThrow('Invalid name');
      }),
    );
  });

  it('N5 [spec-gap]: names 51-100 chars pass validator but violate api-spec maxLength 50', () => {
    fc.assert(
      fc.property(validNameArb(51, 100), (name) => {
        expect(() =>
          validateCandidateData({ firstName: name, lastName: 'Test', email: 'a@b.co' }),
        ).not.toThrow();
      }),
    );
  });
});

// ================================================================
// validateEmail
// ================================================================

describe('validateEmail — properties', () => {
  it('E1: any well-formed local@domain.tld passes', () => {
    fc.assert(
      fc.property(validEmailArb, (email) => {
        expect(() =>
          validateCandidateData({ firstName: 'Ana', lastName: 'Bo', email }),
        ).not.toThrow();
      }),
    );
  });

  it('E2: any string without @ fails', () => {
    fc.assert(
      fc.property(noAtStringArb, (noAt) => {
        expect(() =>
          validateCandidateData({ firstName: 'Ana', lastName: 'Bo', email: noAt }),
        ).toThrow('Invalid email');
      }),
    );
  });

  it('E3 [spec-gap]: emails over 255 chars pass (no maxLength check)', () => {
    fc.assert(
      fc.property(longLocalArb, (longLocal) => {
        const email = `${longLocal}@example.com`;
        expect(() =>
          validateCandidateData({ firstName: 'Ana', lastName: 'Bo', email }),
        ).not.toThrow();
      }),
    );
  });
});

// ================================================================
// validatePhone
// ================================================================

describe('validatePhone — properties', () => {
  it('P1: any valid Spanish 9-digit number passes', () => {
    fc.assert(
      fc.property(spanishPhoneArb, (phone) => {
        expect(() =>
          validateCandidateData({ firstName: 'Ana', lastName: 'Bo', email: 'a@b.co', phone }),
        ).not.toThrow();
      }),
    );
  });

  it('P2: any valid international +digits number passes', () => {
    fc.assert(
      fc.property(internationalPhoneArb, (phone) => {
        expect(() =>
          validateCandidateData({ firstName: 'Ana', lastName: 'Bo', email: 'a@b.co', phone }),
        ).not.toThrow();
      }),
    );
  });

  it('P3: falsy phone values never throw (optional field)', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(undefined as any, null as any, ''),
        (phone: any) => {
          expect(() =>
            validateCandidateData({ firstName: 'Ana', lastName: 'Bo', email: 'a@b.co', phone }),
          ).not.toThrow();
        },
      ),
    );
  });

  it('P4: any truthy string outside regex fails', () => {
    fc.assert(
      fc.property(junkPhoneArb, (phone) => {
        expect(() =>
          validateCandidateData({ firstName: 'Ana', lastName: 'Bo', email: 'a@b.co', phone }),
        ).toThrow('Invalid phone');
      }),
    );
  });
});

// ================================================================
// validateDate
// ================================================================

describe('validateDate — properties', () => {
  it('D1: any YYYY-MM-DD formatted string passes', () => {
    fc.assert(
      fc.property(validDateArb, (date) => {
        expect(() =>
          validateCandidateData({
            firstName: 'Ana', lastName: 'Bo', email: 'a@b.co',
            educations: [{ institution: 'MIT', title: 'CS', startDate: date }],
          }),
        ).not.toThrow();
      }),
    );
  });

  it('D2 [spec-gap]: semantically invalid dates pass (format-only check)', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 13, max: 99 }),
        fc.integer({ min: 32, max: 99 }),
        (month, day) => {
          const date = `2024-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          expect(() =>
            validateCandidateData({
              firstName: 'Ana', lastName: 'Bo', email: 'a@b.co',
              educations: [{ institution: 'MIT', title: 'CS', startDate: date }],
            }),
          ).not.toThrow();
        },
      ),
    );
  });

  it('D3: any non-YYYY-MM-DD format fails', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          '01/01/2020', '2020/01/01', '2020-1-1',
          '20-01-01', '2020-01-01T00:00:00', 'not-a-date',
        ),
        (date) => {
          expect(() =>
            validateCandidateData({
              firstName: 'Ana', lastName: 'Bo', email: 'a@b.co',
              educations: [{ institution: 'MIT', title: 'CS', startDate: date }],
            }),
          ).toThrow('Invalid date');
        },
      ),
    );
  });
});

// ================================================================
// validateCandidateData (orquestador)
// ================================================================

describe('validateCandidateData — properties', () => {
  it('C1: any truthy id bypasses all validation', () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.integer({ min: 1, max: 10000 }),
          fc.string({ minLength: 1, maxLength: 5 }),
        ),
        (id) => {
          expect(() => validateCandidateData({ id })).not.toThrow();
        },
      ),
    );
  });

  it('C2: any valid minimal candidate passes', () => {
    fc.assert(
      fc.property(validCandidateArb, (candidate) => {
        expect(() => validateCandidateData(candidate)).not.toThrow();
      }),
    );
  });

  it('C3: optional fields as undefined never cause errors', () => {
    fc.assert(
      fc.property(validCandidateArb, (candidate) => {
        expect(() =>
          validateCandidateData({
            ...candidate,
            phone: undefined,
            address: undefined,
            educations: undefined,
            workExperiences: undefined,
            cv: undefined,
          }),
        ).not.toThrow();
      }),
    );
  });
});
