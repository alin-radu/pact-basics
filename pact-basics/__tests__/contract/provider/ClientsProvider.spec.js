const { Verifier } = require('@pact-foundation/pact');

const { server, importData } = require('../../../src/provider/provider');
const { contractTestInfo } = require('../../helpers/contractTestHelpers');

const { tag, contractVersion } = contractTestInfo;
const SERVER_PORT = process.env.PROVIDER_SERVER_PORT;
const SERVER_URL = process.env.PROVIDER_SERVER_URL;
const PACK_BROKER_URL = process.env.PACK_BROKER_URL;

// start the server
server.listen(SERVER_PORT, () => {
  importData();
  console.log(`Pact | Provider | Clients Service listening on ${SERVER_URL} ...`);
});

// run tests
describe('Clients Service Verification', () => {
  it('validates the expectations of Client Service', () => {
    let options = {
      provider: 'Clients Service',
      providerBaseUrl: SERVER_URL,
      pactUrls: [PACK_BROKER_URL],
      consumerVersionTags: [tag],
      providerVersionTags: [tag],
      providerVersion: contractVersion,
      publishVerificationResult: true,
      logLevel: 'ERROR',
    };

    return new Verifier(options).verifyProvider().then((output) => {
      console.log('---> Pact | Provider | Verification Complete!');
      console.log('---> Pact | Provider | output: ', output);
    });
  });
});
