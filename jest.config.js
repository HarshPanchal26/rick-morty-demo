export const JestConfig = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      "^.+\\.(ts|tsx)$": "babel-jest"
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect']
};
  