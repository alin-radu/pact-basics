const path = require('path');
const { Verifier } = require('@pact-foundation/pact');
const { server, importData } = require('../../../src/provider/provider');

const SERVER_URL = 'http://localhost:8081';

// the provider server should be up
// v1
// npm run provider
// v2
server.listen(8081, () => {
  importData();
  console.log(`Clients Service listening on ${SERVER_URL}...`);
});

describe('Clients Service Verification', () => {
  it('validates the expectations of Client Service', () => {
    let opts = {
      provider: 'Clients Service',
      logLevel: 'DEBUG',
      providerBaseUrl: SERVER_URL,
      pactUrls: [
        path.resolve(
          process.cwd(),
          './__tests__/contract/pacts/frontend-clientsservice.json'
        ),
      ],
      consumerVersionTags: ['dev'],
      providerVersionTags: ['dev'],
      publishVerificationResult: true,
      providerVersion: '1.0.0',
    };

    return new Verifier(opts).verifyProvider().then((output) => {
      console.log('---> Pact Verification Complete!');
      console.log('---> output: ', output);
    });
  });
});
