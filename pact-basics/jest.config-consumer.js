require('./config-env');

console.log('%c-> developmentConsole: jest.config-consumer | EXECUTED | ', 'color:#77dcfd', process.env.NODE_ENV);

module.exports = {
  testMatch: ['<rootDir>/__tests__/contract/consumer/**/*.spec.js'],

  // Jest setup files, executed before the test framework loads;
  setupFiles: ['<rootDir>/__tests__/helpers/pactSetup.js'],

  // Jest setup files, executed after the test framework loads;
  setupFilesAfterEnv: ['<rootDir>/__tests__/helpers/pactTestWrapper.js'],

  // additional Jest configuration options;
  verbose: true,
};
