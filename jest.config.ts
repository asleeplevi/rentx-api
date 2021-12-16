import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'
/*
 * for a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  clearMocks: true,
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testMatch: ['**/*.spec.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/modules/**/useCases/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text-summary']
}
