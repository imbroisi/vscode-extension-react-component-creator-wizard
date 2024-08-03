/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testTimeout: 20000,
    globals: {
      'ts-jest': {
        tsconfig: './tsconfig.json',
      },
    },
    testPathIgnorePatterns: ['<rootDir>/__tests-vscode__/'],
    testMatch: ['**/src/**/*.test.ts']
  };
