const { Verifier } = require('@pact-foundation/pact');

const { server, importData } = require('../../../src/provider/provider');
const { contractTestInfo } = require('../../helpers/contractTestHelpers');

const { consumerTag, providerTag, providerVersion } = contractTestInfo;
const SERVER_PORT = process.env.PROVIDER_SERVER_PORT;
const SERVER_URL = process.env.PROVIDER_SERVER_URL;
const PACK_BROKER_URL = process.env.PACK_BROKER_URL;

// start the server
const app = server.listen(SERVER_PORT, () => {
  importData();
  console.log(`Pact | Provider | Clients Service listening on ${SERVER_URL} ...`);
});

// run tests
describe('Clients Service Verification', () => {
  it('validates the expectations of Client Service', () => {
    let options = {
      logLevel: 'debug',
      pactUrls: [PACK_BROKER_URL],
      provider: 'ProviderService',
      providerBaseUrl: SERVER_URL,
      providerVersion: providerVersion,
      providerVersionTags: [providerTag],
      consumerVersionTags: [consumerTag],
    };

    if (process.env.PACK_BROKER_URL || process.env.PACT_PUBLISH_RESULTS) {
      options.publishVerificationResult = true;
    }

    return new Verifier(options)
      .verifyProvider()
      .then((output) => {
        console.log('---> Pact | Provider | Verification Complete!');
        console.log('---> Pact | Provider | output: ', output);
      })
      .finally(() => {
        app.close();
      });
  });
});

// interface CurrentVerifierOptions {
//     providerBaseUrl: string;
//     provider?: string;
//     pactUrls?: string[];
//     pactBrokerUrl?: string;
//     pactBrokerUsername?: string;
//     pactBrokerPassword?: string;
//     pactBrokerToken?: string;
//     consumerVersionTags?: string | string[];
//     providerVersionTags?: string | string[];
//     providerVersionBranch?: string;
//     consumerVersionSelectors?: ConsumerVersionSelector[];
//     customProviderHeaders?: string[];
//     publishVerificationResult?: boolean;
//     providerVersion?: string;
//     enablePending?: boolean;
//     timeout?: number;
//     verbose?: boolean;
//     includeWipPactsSince?: string;
//     monkeypatch?: string;
//     format?: 'json' | 'xml' | 'progress' | 'RspecJunitFormatter';
//     out?: string;
//     logDir?: string;
//     logLevel?: LogLevel;
// }

// interface ProxyOptions {
//     logLevel?: LogLevel;
//     requestFilter?: express.RequestHandler;
//     stateHandlers?: StateHandler;
//     beforeEach?: Hook;
//     afterEach?: Hook;
//     validateSSL?: boolean;
//     changeOrigin?: boolean;
// }

// export declare type LogLevel = debug, info, warn, error, fatal;