const path = require('path');
const { Verifier } = require('@pact-foundation/pact');
const { server, importData } = require('../../../src/provider/provider');

const envFile = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev';
require('dotenv').config({ path: envFile });

// const branchName = (() => {
//   try {
//     const branchName = execSync('git rev-parse --abbrev-ref HEAD', {
//       encoding: 'utf-8',
//     }).trim();
//     return branchName;
//   } catch (error) {
//     console.error('Error getting branch name:', error.message);
//     return 'unknown-branch'; // Fallback branch name
//   }
// })();

const branchName = 'release-1.0.1';

const SERVER_PORT = process.env.PROVIDER_SERVER_PORT;
const SERVER_URL = process.env.PROVIDER_SERVER_URL;

// the provider server should be up
// v1
// npm run provider
// v2
server.listen(SERVER_PORT, () => {
  importData();
  console.log(`Clients Service listening on ${SERVER_URL}...`);
});

// v2
describe('Clients Service Verification', () => {
  it('validates the expectations of Client Service', () => {
    let opts = {
      provider: 'Clients Service',
      logLevel: 'ERROR',
      providerBaseUrl: SERVER_URL,
      pactUrls: [process.env.PACK_BROKER_PACTS_URLS],
      consumerVersionTags: ['release'],
      providerVersionTags: ['release'],
      publishVerificationResult: true,
      providerVersion: branchName,
    };

    return new Verifier(opts).verifyProvider().then((output) => {
      console.log('---> Pact Verification Complete!');
      console.log('---> output: ', output);
    });
  });
});

// v1
// describe('Clients Service Verification', () => {
//   it('validates the expectations of Client Service', () => {
//     let opts = {
//       provider: 'Clients Service',
//       logLevel: 'DEBUG',
//       providerBaseUrl: SERVER_URL,
//       pactUrls: [
//         path.resolve(
//           process.cwd(),
//           './__tests__/contract/pacts/frontend-clientsservice.json'
//         ),
//       ],
//       consumerVersionTags: ['dev'],
//       providerVersionTags: ['dev'],
//       publishVerificationResult: false,
//       providerVersion: '1.0.0',
//     };

//     return new Verifier(opts).verifyProvider().then((output) => {
//       console.log('---> Pact Verification Complete!');
//       console.log('---> output: ', output);
//     });
//   });
// });
