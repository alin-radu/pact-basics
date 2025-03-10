const path = require('path');
const { Verifier } = require('@pact-foundation/pact');
const { server, importData } = require('../../../src/provider/provider');
const { execSync } = require('child_process');
const { getBranchName, contractTestInfo } = require('../../helpers/contractTestHelpers');

const envFile = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev';
require('dotenv').config({ path: envFile });

const { tag, contractVersion } = contractTestInfo;

const SERVER_PORT = process.env.PROVIDER_SERVER_PORT;
const SERVER_URL = process.env.PROVIDER_SERVER_URL;

// start the server
server.listen(SERVER_PORT, () => {
  importData();
  console.log(`Clients Service listening on ${SERVER_URL}...`);
});

// run tests
describe('Clients Service Verification', () => {
  it('validates the expectations of Client Service', () => {
    let opts = {
      provider: 'Clients Service',
      logLevel: 'ERROR',
      providerBaseUrl: SERVER_URL,
      pactUrls: [process.env.PACK_BROKER_PACTS_URLS],
      consumerVersionTags: [tag],
      providerVersionTags: [tag],
      publishVerificationResult: true,
      providerVersion: contractVersion,
    };

    return new Verifier(opts).verifyProvider().then((output) => {
      console.log('---> Pact Verification Complete!');
      console.log('---> output: ', output);
    });
  });
});
