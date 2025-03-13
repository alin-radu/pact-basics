const path = require("path")
const Pact = require("@pact-foundation/pact").Pact

console.log('%c-> developmentConsole: pactSetup | Frontend | EXECUTED','color:#77dcfd')

global.port = 8081

// Note: used by the consumer to create the contract/expectations;
global.provider = new Pact({
  consumer: "ConsumerFrontend",
  provider: "ProviderService",
  port: global.port,
  log: path.resolve(process.cwd(), "__tests__/contract/logs", "mockserver-integration.log"),
  dir: path.resolve(process.cwd(), "__tests__/contract/pacts"),
  spec: 2,
  logLevel: 'ERROR',
  pactfileWriteMode: "overwrite",
})

// export declare type LogLevel = "trace" | "debug" | "info" | "warn" | "error" | "fatal";
// export interface PactOptions {
//     consumer: string;
//     provider: string;
//     port?: number;
//     host?: string;
//     ssl?: boolean;
//     sslcert?: string;
//     sslkey?: string;
//     dir?: string;
//     log?: string;
//     logLevel?: LogLevel;
//     spec?: number;
//     cors?: boolean;
//     timeout?: number;
//     pactfileWriteMode?: PactfileWriteMode;
// }
