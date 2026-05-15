/**
 * Characterization tests for validator.ts
 *
 * These tests document the CURRENT behavior of the validator,
 * including behaviors that are incorrect, legacy, or risky.
 * They exist to detect unintended regressions when we fix the code later.
 *
 * Tests marked with [LEGACY] capture behavior that is likely wrong
 * and will probably change when we correct the implementation.
 *
 * Tests marked with [CORRECT] capture behavior we expect to preserve.
 */

import { validateCandidateData } from './validator';

// --- Helpers ---

const validCandidate = (overrides: Record<string, any> = {}) => ({
  firstName: 'María',
  lastName: 'García',
  email: 'maria@example.com',
  ...overrides,
});

// ============================================================
// 1. BYPASS POR CAMPO id
// ============================================================

describe('id bypass', () => {
  // [LEGACY] Sending id in a POST body skips ALL validation.
  // This is a security risk: an attacker can inject { id: 1 } with
  // invalid data and the validator will not catch anything.
  // The api-spec does not define id as a request field for POST.

  it('[LEGACY] should skip all validation when id is truthy (number)', () => {
    expect(() =>
      validateCandidateData({ id: 1 }),
    ).not.toThrow();
  });

  it('[LEGACY] should skip all validation when id is a truthy string', () => {
    expect(() =>
      validateCandidateData({ id: 'abc' }),
    ).not.toThrow();
  });

  it('[CORRECT] should NOT skip validation when id is 0 (falsy)', () => {
    expect(() =>
      validateCandidateData({ id: 0 }),
    ).toThrow('Invalid name');
  });

  it('[CORRECT] should NOT skip validation when id is null', () => {
    expect(() =>
      validateCandidateData({ id: null }),
    ).toThrow('Invalid name');
  });

  it('[CORRECT] should NOT skip validation when id is undefined', () => {
    expect(() =>
      validateCandidateData({ id: undefined }),
    ).toThrow('Invalid name');
  });

  it('[LEGACY] should skip validation when id is true (boolean)', () => {
    expect(() =>
      validateCandidateData({ id: true }),
    ).not.toThrow();
  });

  it('[CORRECT] should NOT skip validation when id is false', () => {
    expect(() =>
      validateCandidateData({ id: false }),
    ).toThrow('Invalid name');
  });

  it('[LEGACY] should skip validation even with completely invalid data', () => {
    expect(() =>
      validateCandidateData({
        id: 999,
        firstName: '',
        lastName: 123,
        email: 'not-an-email',
        phone: 'abc',
      }),
    ).not.toThrow();
  });
});

// ============================================================
// 2. firstName / lastName (validateName)
// ============================================================

describe('validateName (firstName / lastName)', () => {
  // --- Required ---
  it('[CORRECT] should reject missing firstName', () => {
    expect(() => validateCandidateData(validCandidate({ firstName: undefined }))).toThrow('Invalid name');
  });

  it('[CORRECT] should reject null firstName', () => {
    expect(() => validateCandidateData(validCandidate({ firstName: null }))).toThrow('Invalid name');
  });

  it('[CORRECT] should reject empty string firstName', () => {
    expect(() => validateCandidateData(validCandidate({ firstName: '' }))).toThrow('Invalid name');
  });

  // --- MinLength ---
  it('[CORRECT] should reject single character name', () => {
    expect(() => validateCandidateData(validCandidate({ firstName: 'A' }))).toThrow('Invalid name');
  });

  it('[CORRECT] should accept 2-character name', () => {
    expect(() => validateCandidateData(validCandidate({ firstName: 'Al' }))).not.toThrow();
  });

  // --- MaxLength ---
  // [LEGACY] Validator allows up to 100 chars, but api-spec says maxLength: 50.
  // Names between 51-100 chars pass the validator but violate the API contract.

  it('[CORRECT] should accept name with 50 chars (api-spec limit)', () => {
    const name = 'A'.repeat(50);
    expect(() => validateCandidateData(validCandidate({ firstName: name }))).not.toThrow();
  });

  it('[LEGACY] should accept name with 51 chars (exceeds api-spec, passes validator)', () => {
    const name = 'A'.repeat(51);
    expect(() => validateCandidateData(validCandidate({ firstName: name }))).not.toThrow();
  });

  it('[LEGACY] should accept name with 100 chars (validator limit)', () => {
    const name = 'A'.repeat(100);
    expect(() => validateCandidateData(validCandidate({ firstName: name }))).not.toThrow();
  });

  it('[CORRECT] should reject name with 101 chars', () => {
    const name = 'A'.repeat(101);
    expect(() => validateCandidateData(validCandidate({ firstName: name }))).toThrow('Invalid name');
  });

  // --- Pattern ---
  it('[CORRECT] should accept letters with accents and ñ', () => {
    expect(() => validateCandidateData(validCandidate({ firstName: 'María Ñoño' }))).not.toThrow();
  });

  it('[CORRECT] should accept uppercase accents', () => {
    expect(() => validateCandidateData(validCandidate({ firstName: 'ÁÉÍÓÚ' }))).not.toThrow();
  });

  it('[CORRECT] should reject name with numbers', () => {
    expect(() => validateCandidateData(validCandidate({ firstName: 'María3' }))).toThrow('Invalid name');
  });

  it('[CORRECT] should reject name with special characters', () => {
    expect(() => validateCandidateData(validCandidate({ firstName: 'María-José' }))).toThrow('Invalid name');
  });

  // [LEGACY] Hyphens are common in names (Jean-Pierre, María-José) but the regex rejects them.
  it('[LEGACY] should reject hyphenated names', () => {
    expect(() => validateCandidateData(validCandidate({ firstName: 'Jean-Pierre' }))).toThrow('Invalid name');
  });

  // [LEGACY] Names with only spaces pass the regex and length check.
  it('[LEGACY] should accept name that is only spaces (2+ spaces)', () => {
    expect(() => validateCandidateData(validCandidate({ firstName: '   ' }))).not.toThrow();
  });

  // --- lastName uses same validateName ---
  it('[CORRECT] should reject missing lastName', () => {
    expect(() => validateCandidateData(validCandidate({ lastName: undefined }))).toThrow('Invalid name');
  });

  it('[CORRECT] should reject single character lastName', () => {
    expect(() => validateCandidateData(validCandidate({ lastName: 'G' }))).toThrow('Invalid name');
  });
});

// ============================================================
// 3. email (validateEmail)
// ============================================================

describe('validateEmail', () => {
  it('[CORRECT] should reject missing email', () => {
    expect(() => validateCandidateData(validCandidate({ email: undefined }))).toThrow('Invalid email');
  });

  it('[CORRECT] should reject empty string email', () => {
    expect(() => validateCandidateData(validCandidate({ email: '' }))).toThrow('Invalid email');
  });

  it('[CORRECT] should accept valid email', () => {
    expect(() => validateCandidateData(validCandidate({ email: 'user@domain.com' }))).not.toThrow();
  });

  it('[CORRECT] should reject email without @', () => {
    expect(() => validateCandidateData(validCandidate({ email: 'userdomain.com' }))).toThrow('Invalid email');
  });

  it('[CORRECT] should reject email without domain', () => {
    expect(() => validateCandidateData(validCandidate({ email: 'user@' }))).toThrow('Invalid email');
  });

  it('[CORRECT] should reject email without TLD', () => {
    expect(() => validateCandidateData(validCandidate({ email: 'user@domain' }))).toThrow('Invalid email');
  });

  it('[CORRECT] should accept email with dots and plus in local part', () => {
    expect(() => validateCandidateData(validCandidate({ email: 'user.name+tag@domain.co.uk' }))).not.toThrow();
  });

  // [LEGACY] No maxLength check on email. The DB has VarChar(255) but the validator does not enforce it.
  it('[LEGACY] should accept email with very long local part (no maxLength check)', () => {
    const longLocal = 'a'.repeat(300);
    const email = `${longLocal}@example.com`;
    expect(() => validateCandidateData(validCandidate({ email }))).not.toThrow();
  });
});

// ============================================================
// 4. phone (validatePhone)
// ============================================================

describe('validatePhone', () => {
  // --- Optional field ---
  it('[CORRECT] should accept undefined phone (optional)', () => {
    expect(() => validateCandidateData(validCandidate({ phone: undefined }))).not.toThrow();
  });

  it('[CORRECT] should accept null phone (falsy, skips check)', () => {
    expect(() => validateCandidateData(validCandidate({ phone: null }))).not.toThrow();
  });

  it('[CORRECT] should accept empty string phone (falsy, skips check)', () => {
    expect(() => validateCandidateData(validCandidate({ phone: '' }))).not.toThrow();
  });

  // --- Spanish-only regex ---
  it('[CORRECT] should accept valid Spanish mobile starting with 6', () => {
    expect(() => validateCandidateData(validCandidate({ phone: '612345678' }))).not.toThrow();
  });

  it('[CORRECT] should accept valid Spanish mobile starting with 7', () => {
    expect(() => validateCandidateData(validCandidate({ phone: '712345678' }))).not.toThrow();
  });

  it('[CORRECT] should accept valid Spanish landline starting with 9', () => {
    expect(() => validateCandidateData(validCandidate({ phone: '912345678' }))).not.toThrow();
  });

  it('[CORRECT] should reject phone starting with 5', () => {
    expect(() => validateCandidateData(validCandidate({ phone: '512345678' }))).toThrow('Invalid phone');
  });

  it('[CORRECT] should reject phone starting with 8', () => {
    expect(() => validateCandidateData(validCandidate({ phone: '812345678' }))).toThrow('Invalid phone');
  });

  // International formats without dashes are now accepted (TDD cycle — phone regex).
  // Duplicate coverage removed — see "TDD phone — soporte internacional" section.

  it('[CORRECT] should reject international format with dashes', () => {
    expect(() => validateCandidateData(validCandidate({ phone: '+1-555-555-5555' }))).toThrow('Invalid phone');
  });

  it('[CORRECT] should reject phone with fewer than 9 digits', () => {
    expect(() => validateCandidateData(validCandidate({ phone: '61234567' }))).toThrow('Invalid phone');
  });

  it('[CORRECT] should reject phone with more than 9 digits', () => {
    expect(() => validateCandidateData(validCandidate({ phone: '6123456789' }))).toThrow('Invalid phone');
  });
});

// ============================================================
// 5. address (validateAddress)
// ============================================================

describe('validateAddress', () => {
  it('[CORRECT] should accept undefined address (optional)', () => {
    expect(() => validateCandidateData(validCandidate({ address: undefined }))).not.toThrow();
  });

  it('[CORRECT] should accept empty string address (falsy, skips check)', () => {
    expect(() => validateCandidateData(validCandidate({ address: '' }))).not.toThrow();
  });

  it('[CORRECT] should accept address with 100 chars', () => {
    expect(() => validateCandidateData(validCandidate({ address: 'A'.repeat(100) }))).not.toThrow();
  });

  it('[CORRECT] should reject address with 101 chars', () => {
    expect(() => validateCandidateData(validCandidate({ address: 'A'.repeat(101) }))).toThrow('Invalid address');
  });
});

// ============================================================
// 6. educations (validateEducation)
// ============================================================

describe('educations', () => {
  // --- Optional at top level ---
  it('[CORRECT] should accept missing educations', () => {
    expect(() => validateCandidateData(validCandidate())).not.toThrow();
  });

  it('[CORRECT] should accept empty array educations', () => {
    expect(() => validateCandidateData(validCandidate({ educations: [] }))).not.toThrow();
  });

  // --- Valid education ---
  it('[CORRECT] should accept valid education entry', () => {
    expect(() =>
      validateCandidateData(
        validCandidate({
          educations: [
            { institution: 'MIT', title: 'CS', startDate: '2020-01-01' },
          ],
        }),
      ),
    ).not.toThrow();
  });

  it('[CORRECT] should accept education with endDate', () => {
    expect(() =>
      validateCandidateData(
        validCandidate({
          educations: [
            { institution: 'MIT', title: 'CS', startDate: '2020-01-01', endDate: '2024-06-15' },
          ],
        }),
      ),
    ).not.toThrow();
  });

  // --- Required sub-fields ---
  it('[CORRECT] should reject education without institution', () => {
    expect(() =>
      validateCandidateData(
        validCandidate({ educations: [{ title: 'CS', startDate: '2020-01-01' }] }),
      ),
    ).toThrow('Invalid institution');
  });

  it('[CORRECT] should reject education without title', () => {
    expect(() =>
      validateCandidateData(
        validCandidate({ educations: [{ institution: 'MIT', startDate: '2020-01-01' }] }),
      ),
    ).toThrow('Invalid title');
  });

  it('[CORRECT] should reject education without startDate', () => {
    expect(() =>
      validateCandidateData(
        validCandidate({ educations: [{ institution: 'MIT', title: 'CS' }] }),
      ),
    ).toThrow('Invalid date');
  });

  // --- MaxLength ---
  it('[CORRECT] should reject institution longer than 100 chars', () => {
    expect(() =>
      validateCandidateData(
        validCandidate({
          educations: [{ institution: 'A'.repeat(101), title: 'CS', startDate: '2020-01-01' }],
        }),
      ),
    ).toThrow('Invalid institution');
  });

  it('[CORRECT] should reject title longer than 100 chars', () => {
    expect(() =>
      validateCandidateData(
        validCandidate({
          educations: [{ institution: 'MIT', title: 'A'.repeat(101), startDate: '2020-01-01' }],
        }),
      ),
    ).toThrow('Invalid title');
  });

  // [LEGACY] The Prisma schema allows title up to 250 chars (VarChar(250)),
  // but the validator rejects anything over 100.
  it('[LEGACY] should reject education title with 101 chars despite DB allowing 250', () => {
    expect(() =>
      validateCandidateData(
        validCandidate({
          educations: [{ institution: 'MIT', title: 'A'.repeat(101), startDate: '2020-01-01' }],
        }),
      ),
    ).toThrow('Invalid title');
  });

  // --- Date format ---
  it('[CORRECT] should reject invalid startDate format', () => {
    expect(() =>
      validateCandidateData(
        validCandidate({
          educations: [{ institution: 'MIT', title: 'CS', startDate: '01/01/2020' }],
        }),
      ),
    ).toThrow('Invalid date');
  });

  it('[CORRECT] should reject invalid endDate format', () => {
    expect(() =>
      validateCandidateData(
        validCandidate({
          educations: [{ institution: 'MIT', title: 'CS', startDate: '2020-01-01', endDate: 'not-a-date' }],
        }),
      ),
    ).toThrow('Invalid end date');
  });

  // [LEGACY] The date regex only checks format, not semantic validity.
  // "9999-99-99" matches the pattern and passes.
  it('[LEGACY] should accept semantically invalid date like 9999-99-99', () => {
    expect(() =>
      validateCandidateData(
        validCandidate({
          educations: [{ institution: 'MIT', title: 'CS', startDate: '9999-99-99' }],
        }),
      ),
    ).not.toThrow();
  });

  // [LEGACY] endDate before startDate is not validated.
  it('[LEGACY] should accept endDate before startDate', () => {
    expect(() =>
      validateCandidateData(
        validCandidate({
          educations: [{ institution: 'MIT', title: 'CS', startDate: '2024-01-01', endDate: '2020-01-01' }],
        }),
      ),
    ).not.toThrow();
  });

  // --- Type safety ---
  // [LEGACY] No check that educations is actually an array.
  // A string is iterable via for...of, iterating characters.
  // Each character becomes `education`, and `education.institution` is undefined -> throws.
  it('[LEGACY] should throw when educations is a string (iterates chars)', () => {
    expect(() =>
      validateCandidateData(validCandidate({ educations: 'not-an-array' })),
    ).toThrow('Invalid institution');
  });

  // [LEGACY] A number is truthy so enters the if, but for...of on a number
  // does not iterate (no-op in transpiled code). Validation silently passes.
  it('[LEGACY] should silently pass when educations is a number (no iteration)', () => {
    expect(() =>
      validateCandidateData(validCandidate({ educations: 42 })),
    ).not.toThrow();
  });
});

// ============================================================
// 7. workExperiences (validateExperience)
// ============================================================

describe('workExperiences', () => {
  it('[CORRECT] should accept missing workExperiences', () => {
    expect(() => validateCandidateData(validCandidate())).not.toThrow();
  });

  it('[CORRECT] should accept empty array workExperiences', () => {
    expect(() => validateCandidateData(validCandidate({ workExperiences: [] }))).not.toThrow();
  });

  it('[CORRECT] should accept valid workExperience entry', () => {
    expect(() =>
      validateCandidateData(
        validCandidate({
          workExperiences: [
            { company: 'Acme', position: 'Dev', startDate: '2020-01-01' },
          ],
        }),
      ),
    ).not.toThrow();
  });

  // --- Required sub-fields ---
  it('[CORRECT] should reject workExperience without company', () => {
    expect(() =>
      validateCandidateData(
        validCandidate({
          workExperiences: [{ position: 'Dev', startDate: '2020-01-01' }],
        }),
      ),
    ).toThrow('Invalid company');
  });

  it('[CORRECT] should reject workExperience without position', () => {
    expect(() =>
      validateCandidateData(
        validCandidate({
          workExperiences: [{ company: 'Acme', startDate: '2020-01-01' }],
        }),
      ),
    ).toThrow('Invalid position');
  });

  it('[CORRECT] should reject workExperience without startDate', () => {
    expect(() =>
      validateCandidateData(
        validCandidate({
          workExperiences: [{ company: 'Acme', position: 'Dev' }],
        }),
      ),
    ).toThrow('Invalid date');
  });

  // --- MaxLength ---
  it('[CORRECT] should reject company longer than 100 chars', () => {
    expect(() =>
      validateCandidateData(
        validCandidate({
          workExperiences: [{ company: 'A'.repeat(101), position: 'Dev', startDate: '2020-01-01' }],
        }),
      ),
    ).toThrow('Invalid company');
  });

  it('[CORRECT] should reject position longer than 100 chars', () => {
    expect(() =>
      validateCandidateData(
        validCandidate({
          workExperiences: [{ company: 'Acme', position: 'A'.repeat(101), startDate: '2020-01-01' }],
        }),
      ),
    ).toThrow('Invalid position');
  });

  it('[CORRECT] should accept description with 200 chars', () => {
    expect(() =>
      validateCandidateData(
        validCandidate({
          workExperiences: [
            { company: 'Acme', position: 'Dev', description: 'A'.repeat(200), startDate: '2020-01-01' },
          ],
        }),
      ),
    ).not.toThrow();
  });

  it('[CORRECT] should reject description longer than 200 chars', () => {
    expect(() =>
      validateCandidateData(
        validCandidate({
          workExperiences: [
            { company: 'Acme', position: 'Dev', description: 'A'.repeat(201), startDate: '2020-01-01' },
          ],
        }),
      ),
    ).toThrow('Invalid description');
  });

  it('[CORRECT] should accept optional description as undefined', () => {
    expect(() =>
      validateCandidateData(
        validCandidate({
          workExperiences: [{ company: 'Acme', position: 'Dev', startDate: '2020-01-01' }],
        }),
      ),
    ).not.toThrow();
  });

  // [LEGACY] Same type-safety issue as educations
  it('[LEGACY] should throw when workExperiences is a string', () => {
    expect(() =>
      validateCandidateData(validCandidate({ workExperiences: 'not-an-array' })),
    ).toThrow('Invalid company');
  });
});

// ============================================================
// 8. cv (validateCV)
// ============================================================

describe('cv', () => {
  it('[CORRECT] should accept missing cv', () => {
    expect(() => validateCandidateData(validCandidate())).not.toThrow();
  });

  it('[CORRECT] should skip validation when cv is empty object', () => {
    expect(() => validateCandidateData(validCandidate({ cv: {} }))).not.toThrow();
  });

  it('[CORRECT] should accept valid cv', () => {
    expect(() =>
      validateCandidateData(
        validCandidate({ cv: { filePath: 'uploads/cv.pdf', fileType: 'application/pdf' } }),
      ),
    ).not.toThrow();
  });

  it('[CORRECT] should reject cv without filePath', () => {
    expect(() =>
      validateCandidateData(
        validCandidate({ cv: { fileType: 'application/pdf' } }),
      ),
    ).toThrow('Invalid CV data');
  });

  it('[CORRECT] should reject cv without fileType', () => {
    expect(() =>
      validateCandidateData(
        validCandidate({ cv: { filePath: 'uploads/cv.pdf' } }),
      ),
    ).toThrow('Invalid CV data');
  });

  it('[CORRECT] should reject cv when filePath is not a string', () => {
    expect(() =>
      validateCandidateData(
        validCandidate({ cv: { filePath: 123, fileType: 'application/pdf' } }),
      ),
    ).toThrow('Invalid CV data');
  });

  // [LEGACY] No restriction on fileType value. The /upload endpoint only allows
  // PDF and DOCX, but the validator accepts any string as fileType.
  it('[LEGACY] should accept cv with arbitrary fileType (no format restriction)', () => {
    expect(() =>
      validateCandidateData(
        validCandidate({ cv: { filePath: 'uploads/file.exe', fileType: 'application/x-msdownload' } }),
      ),
    ).not.toThrow();
  });

  it('[LEGACY] should accept cv with text/html fileType (XSS risk)', () => {
    expect(() =>
      validateCandidateData(
        validCandidate({ cv: { filePath: 'uploads/evil.html', fileType: 'text/html' } }),
      ),
    ).not.toThrow();
  });

  // [LEGACY] cv with extra unknown keys and valid filePath/fileType passes.
  it('[LEGACY] should accept cv with extra unknown properties', () => {
    expect(() =>
      validateCandidateData(
        validCandidate({
          cv: { filePath: 'cv.pdf', fileType: 'application/pdf', malicious: 'payload' },
        }),
      ),
    ).not.toThrow();
  });

  // [LEGACY] cv as a non-object truthy value triggers validateCV which checks typeof.
  it('[LEGACY] should throw when cv is a non-empty string', () => {
    expect(() =>
      validateCandidateData(validCandidate({ cv: 'not-an-object' })),
    ).toThrow('Invalid CV data');
  });
});

// ============================================================
// 9. COMPLETE HAPPY PATH
// ============================================================

describe('complete valid candidate', () => {
  it('[CORRECT] should accept a fully valid candidate with all fields', () => {
    expect(() =>
      validateCandidateData({
        firstName: 'María',
        lastName: 'García López',
        email: 'maria.garcia@example.com',
        phone: '612345678',
        address: 'Calle Mayor 1, Madrid',
        educations: [
          { institution: 'UC3M', title: 'Computer Science', startDate: '2015-09-01', endDate: '2019-06-30' },
        ],
        workExperiences: [
          { company: 'Acme Corp', position: 'Developer', description: 'Full stack dev', startDate: '2019-09-01' },
        ],
        cv: { filePath: 'uploads/cv.pdf', fileType: 'application/pdf' },
      }),
    ).not.toThrow();
  });

  it('[CORRECT] should accept minimal valid candidate (only required fields)', () => {
    expect(() =>
      validateCandidateData({
        firstName: 'Al',
        lastName: 'Bo',
        email: 'a@b.co',
      }),
    ).not.toThrow();
  });
});

// ============================================================
// 10. TDD — Phone: aceptar formato español e internacional
// ============================================================
// RED: estos tests expresan el comportamiento DESEADO.
// Deben FALLAR contra la implementación actual (PHONE_REGEX solo acepta español).

describe('TDD phone — soporte internacional', () => {
  // --- Español sin indicativo (ya funciona, debe seguir funcionando) ---
  it('should accept Spanish mobile without prefix: 612345678', () => {
    expect(() => validateCandidateData(validCandidate({ phone: '612345678' }))).not.toThrow();
  });

  it('should accept Spanish landline without prefix: 912345678', () => {
    expect(() => validateCandidateData(validCandidate({ phone: '912345678' }))).not.toThrow();
  });

  // --- Español con indicativo +34 ---
  it('should accept Spanish mobile with +34 prefix: +34612345678', () => {
    expect(() => validateCandidateData(validCandidate({ phone: '+34612345678' }))).not.toThrow();
  });

  it('should accept Spanish landline with +34 prefix: +34912345678', () => {
    expect(() => validateCandidateData(validCandidate({ phone: '+34912345678' }))).not.toThrow();
  });

  // --- Internacional ---
  it('should accept US number: +14155552671', () => {
    expect(() => validateCandidateData(validCandidate({ phone: '+14155552671' }))).not.toThrow();
  });

  it('should accept UK number: +447911123456', () => {
    expect(() => validateCandidateData(validCandidate({ phone: '+447911123456' }))).not.toThrow();
  });

  it('should accept German number: +4930123456', () => {
    expect(() => validateCandidateData(validCandidate({ phone: '+4930123456' }))).not.toThrow();
  });

  it('should accept Mexican number: +5215512345678', () => {
    expect(() => validateCandidateData(validCandidate({ phone: '+5215512345678' }))).not.toThrow();
  });

  // --- Rechazos que deben mantenerse ---
  it('should still reject empty digits after prefix: +34', () => {
    expect(() => validateCandidateData(validCandidate({ phone: '+34' }))).toThrow('Invalid phone');
  });

  it('should still reject letters in phone', () => {
    expect(() => validateCandidateData(validCandidate({ phone: '+34abcdefgh' }))).toThrow('Invalid phone');
  });

  it('should still reject phone with only letters', () => {
    expect(() => validateCandidateData(validCandidate({ phone: 'abcdefghi' }))).toThrow('Invalid phone');
  });

  it('should still accept undefined phone (optional)', () => {
    expect(() => validateCandidateData(validCandidate({ phone: undefined }))).not.toThrow();
  });
});
