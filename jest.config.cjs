// jest.config.cjs
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testMatch: [
    '**/__tests__/**/*.+(js|jsx)',
    '**/?(*.)+(spec|test).+(js|jsx)'
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)': 'identity-obj-proxy',
    '^@/(.*)': '<rootDir>/src/$1'
  },
  moduleDirectories: ['node_modules', 'src']
};