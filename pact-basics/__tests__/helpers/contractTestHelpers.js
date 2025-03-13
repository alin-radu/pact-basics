const { execSync } = require('child_process');

const branchName = (() => {
  try {
    const branchName = execSync('git rev-parse --abbrev-ref HEAD', {
      encoding: 'utf-8',
    }).trim();
    return branchName;
  } catch (error) {
    console.error('---> Error getting branch name:', error.message);
    return 'unknown-branch'; 
  }
})();

const consumerVersion = '1.0.5';
const consumerTag = branchName;
const providerVersion = '1.0.5';
const providerTag = branchName;

module.exports = {
  contractTestInfo: {
    branchName,
    consumerVersion: `${branchName}-${consumerVersion}`,
    consumerTag,
    providerVersion:`${branchName}-${providerVersion}`,
    providerTag,
  },
};
