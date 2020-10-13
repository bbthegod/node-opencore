/* eslint-disable no-console */
require('../config/mongoose');
const http = require('http');
const config = require('../config/config');
const app = require('../config/express');

const server = http.createServer(app);

if (!module.parent) {
  server.listen(config.port, () => {
    console.log('\x1b[33m%s\x1b[0m', `Server started on port ${config.port} (${config.env} mode)`);
  });
}

module.exports = app;
