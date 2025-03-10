const { execSync } = require('child_process');

const branchName = (() => {
  try {
    const branchName = execSync('git rev-parse --abbrev-ref HEAD', {
      encoding: 'utf-8',
    }).trim();
    return branchName;
  } catch (error) {
    console.error('---> Error getting branch name:', error.message);
    return 'unknown-branch'; // Fallback branch name
  }
})();

const version = '1.0.6';

module.exports = {
  contractTestInfo: {
    branchName: branchName,
    tag: branchName,
    version,
    contractVersion: `${branchName}-${version}`,
  },
};
