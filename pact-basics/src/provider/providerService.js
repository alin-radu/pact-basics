require('../../config-env');

const { server, importData } = require('./provider');

const PROVIDER_SERVER_PORT = process.env.CLIENT_CONSUMER_PORT;
const PROVIDER_SERVER_URL = process.env.CLIENT_CONSUMER_URL;

importData();

server.listen(PROVIDER_SERVER_PORT, () => {
  console.log(`Provider running on ${PROVIDER_SERVER_URL} ...`);
});
