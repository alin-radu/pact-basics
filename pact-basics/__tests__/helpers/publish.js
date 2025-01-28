let publisher = require('@pact-foundation/pact-node');
let path = require('path');
// const { execSync } = require('child_process');

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

// v1
let opts = {
  pactFilesOrDirs: [path.resolve(process.cwd(), '__tests__/contract/pacts')],
  pactBroker: process.env.PACK_BROKER_HOST,
  consumerVersion: branchName,
  providerVerion: branchName,
  tags: 'release',
  branch: branchName,
};

publisher.publishPacts(opts);

// v2
// let opts = {
//   pactFilesOrDirs: [path.resolve(process.cwd(), "__tests__/contract/pacts")],
//   pactBroker: "https://localhost:9292",
//   pactBrokerUsername: process.env.PACT_USERNAME,
//   pactBrokerPassword: process.env.PACT_PASSWORD,
//   consumerVersion: "1.0.0",
//   providerVerion: "1.0.0",
//   tags: "dev"
// }
