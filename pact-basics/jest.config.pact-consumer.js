require('./config-env');

let path = require('path');

console.log('%c-> developmentConsole: jest.config-consumer | EXECUTED | ', 'color:#77dcfd', process.env.NODE_ENV);

module.exports = {
  testMatch: [path.resolve(process.cwd(), '__tests__/contract/consumer/**/*.spec.js')],

  // Jest setup files, executed before the test framework loads;
  setupFiles: [path.resolve(process.cwd(), '__tests__/helpers/pactSetup.js')],

  // Jest setup files, executed after the test framework loads;
  setupFilesAfterEnv: [path.resolve(process.cwd(), '__tests__/helpers/pactTestWrapper.js'),],

  // additional Jest configuration options;
  verbose: true,
};
