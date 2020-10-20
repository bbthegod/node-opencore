/* eslint-disable no-console */
require('./config/mongoose');
const http = require('http');
const { PORT, ENVIRONMENT } = require('./config/config');
const app = require('./config/express');

const server = http.createServer(app);

if (!module.parent) {
  server.listen(PORT, () => {
    console.log('\x1b[33m%s\x1b[0m', `Server started on port ${PORT} (${ENVIRONMENT} mode)`);
  });
}

module.exports = app;
