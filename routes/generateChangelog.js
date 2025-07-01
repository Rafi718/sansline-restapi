const fs = require('fs');
const path = require('path');

const changelogFilePath = path.join(__dirname, '..', 'changelog.json');
const apiFilePath = path.join(__dirname, 'api.js');

const extractEndpointsFromApiFile = () => {
  try {
    const apiContent = fs.readFileSync(apiFilePath, 'utf8');
    const regex = /router\.[a-z]+\(['"]\/([a-zA-Z0-9_/]+)['"]/g;
    const matches = Array.from(apiContent.matchAll(regex), match => '/' + match[1]);
    return matches;
  } catch (error) {
    console.error('Error reading API file:', error.message);
    return [];
  }
};

const recordEndpointsInChangelog = () => {
  try {
    const now = new Date();

    const timestamp = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    }).format(now);

    const allEndpoints = extractEndpointsFromApiFile();

    let changelog = [];
    if (fs.existsSync(changelogFilePath)) {
      const changelogData = fs.readFileSync(changelogFilePath, 'utf8');
      changelog = JSON.parse(changelogData);
    }

    const newEndpoints = allEndpoints.filter(endpoint => !changelog.some(entry => entry.endpoint === endpoint));

    newEndpoints.forEach(endpoint => {
      changelog.unshift({
        endpoint: endpoint,
        timestamp: timestamp,
      });
    });

    changelog.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    fs.writeFileSync(changelogFilePath, JSON.stringify(changelog, null, 2), 'utf8');
  } catch (error) {
    console.error('Error recording endpoints in changelog:', error.message);
  }
};

const runRecordEndpointsInChangelog = () => {
  recordEndpointsInChangelog();
};

runRecordEndpointsInChangelog();

module.exports = {
  runRecordEndpointsInChangelog,
};
