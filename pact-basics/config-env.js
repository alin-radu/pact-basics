const path = require('path');
const dotenv = require('dotenv')

const envFile = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev';
dotenv.config({ path: path.resolve(__dirname, envFile) });

console.log('%c-> developmentConsole: config-env | EXECUTED ','color:#77dcfd')