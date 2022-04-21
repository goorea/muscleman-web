module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  ...require('@snowpack/app-scripts-react/jest.config.js')(),
  moduleNameMapper: {
    '@src/(.*)$': '<rootDir>/src/$1',
    '@tests/(.*)$': '<rootDir>/tests/$1',
  },
};
