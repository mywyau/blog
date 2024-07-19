// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
    },

    testMatch: ['**/__tests__/**/*.(js|ts|tsx)', '**/?(*.)+(spec|test).(js|ts|tsx)'],
  };
  
