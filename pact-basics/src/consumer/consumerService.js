require('../../config');

const { server } = require('./consumer');

const CLIENT_CONSUMER_PORT = process.env.CLIENT_CONSUMER_PORT;
const CLIENT_CONSUMER_URL = process.env.CLIENT_CONSUMER_URL;

server.listen(CLIENT_CONSUMER_PORT, () => {
  console.log(`CLIENT_CONSUMER running on ${CLIENT_CONSUMER_URL} ...`);
});
