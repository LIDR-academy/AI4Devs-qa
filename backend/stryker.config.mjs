/** @type {import('@stryker-mutator/api/core').PartialStrykerOptions} */
export default {
  // --- Qué mutar ---
  mutate: [
    'src/**/*.ts',
    '!src/**/*.test.ts',
    '!src/**/*.spec.ts',
    '!src/index.ts',
  ],

  // --- Test runner ---
  testRunner: 'jest',
  jest: {
    configFile: 'jest.config.js',
  },

  // --- Coverage ---
  coverageAnalysis: 'perTest',

  // --- Reportes ---
  reporters: ['clear-text', 'html'],
  htmlReporter: {
    fileName: 'reports/mutation/index.html',
  },

  // --- Rendimiento ---
  timeoutMS: 10000,
  concurrency: 2,

  // --- Archivos a ignorar de la copia del sandbox ---
  ignorePatterns: ['dist', 'coverage', 'reports', 'node_modules'],
};
