/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testTimeout: 20000,
    transform: {
      transform_regex: ['ts-jest', { tsconfig: './tsconfig.json', }],
    },
    testPathIgnorePatterns: ['<rootDir>/src/__tests-vscode__/'],
    testMatch: ['**/src/**/*.test.ts']
  };
