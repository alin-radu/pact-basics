require('./config-env');

console.log('%c-> developmentConsole: jest.config-provider | EXECUTED | ', 'color:#77dcfd', process.env.NODE_ENV);

module.exports = {
  testMatch: ['<rootDir>/__tests__/contract/provider/**/*.spec.js'],
};
