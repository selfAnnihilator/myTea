// jest.config.cjs
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testMatch: [
    '**/__tests__/**/*.+(js|jsx|ts|tsx)',
    '**/?(*.)+(spec|test).+(js|jsx|ts|tsx)'
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)': 'identity-obj-proxy',
    '^@/(.*)': '<rootDir>/src/$1'
  },
  moduleDirectories: ['node_modules', 'src'],
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'reports',
      outputName: 'junit.xml'
    }]
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.tsx',
    '!src/setupTests.js'
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'html']
};