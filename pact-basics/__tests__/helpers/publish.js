let path = require('path');
let publisher = require('@pact-foundation/pact-node');
const { contractTestInfo } = require('./contractTestHelpers');

const envFile = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev';
require('dotenv').config({ path: envFile });

const { branchName, tag, contractVersion } = contractTestInfo;

// v1, the consumerVersion and the providerVerion are dynamicaly generated from the branch name
let opts = {
  pactFilesOrDirs: [path.resolve(process.cwd(), '__tests__/contract/pacts')],
  pactBroker: process.env.PACK_BROKER_HOST,
  consumerVersion: contractVersion,
  providerVerion: contractVersion,
  tags: tag,
  branch: branchName,
};

publisher.publishPacts(opts);
