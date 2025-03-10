require('../../config');

let path = require('path');
let publisher = require('@pact-foundation/pact-node');
const { contractTestInfo } = require('./contractTestHelpers');

const { branchName, tag, contractVersion } = contractTestInfo;

let options = {
  pactFilesOrDirs: [path.resolve(process.cwd(), '__tests__/contract/pacts')],
  pactBroker: process.env.PACK_BROKER_HOST,
  consumerVersion: contractVersion,
  providerVerion: contractVersion,
  tags: tag,
  branch: branchName,
};

publisher.publishPacts(options);
