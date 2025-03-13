require('../../config-env');

let path = require('path');
let publisher = require('@pact-foundation/pact-node');

const { contractTestInfo } = require('./contractTestHelpers');
const { branchName, consumerTag, consumerVersion } = contractTestInfo;

let options = {
  pactFilesOrDirs: [path.resolve(process.cwd(), '__tests__/contract/pacts')],
  pactBroker: process.env.PACK_BROKER_HOST,
  consumerVersion: consumerVersion,
  tags: [consumerTag],
  branch: branchName,
};

publisher.publishPacts(options);

// export interface PublisherOptions {
//   pactFilesOrDirs: string[];
//   pactBroker: string;
//   consumerVersion: string;
//   pactBrokerUsername?: string;
//   pactBrokerPassword?: string;
//   pactBrokerToken?: string;
//   tags?: string[];
//   verbose?: boolean;
//   timeout?: number;
//   buildUrl?: string;
//   branch?: string;
// }
