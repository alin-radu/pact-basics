const path = require("path")
const Pact = require("@pact-foundation/pact").Pact

console.log('%c-> developmentConsole: pactSetup | EXECUTED','color:#77dcfd')

global.port = 8081

// Note: used by the consumer to create the contract/expectations;
global.provider = new Pact({
  consumer: "Frontend",
  provider: "ClientsService",
  port: global.port,
  log: path.resolve(process.cwd(), "__tests__/contract/logs", "mockserver-integration.log"),
  dir: path.resolve(process.cwd(), "__tests__/contract/pacts"),
  spec: 2,
  logLevel: 'ERROR',
  pactfileWriteMode: "overwrite",
})

