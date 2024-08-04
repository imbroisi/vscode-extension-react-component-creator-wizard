/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testTimeout: 20000,
    testPathIgnorePatterns: ['<rootDir>/src/__tests-vscode__/'],
    testMatch: ['**/src/**/*.test.ts']
  };
