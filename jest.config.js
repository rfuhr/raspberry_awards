export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'], 
    collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/main/**', '!<rootDir>/src/**/index.ts'],
    coverageDirectory: 'coverage',
    transform: {
      '.+\\.ts$': 'ts-jest',
    },
    moduleNameMapper: {
      '@/(.*)': '<rootDir>/src/$1',
    },
    testMatch: [
      '**/src/**/*/*.test.ts', 
    ],
  };
  