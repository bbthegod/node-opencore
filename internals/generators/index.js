/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const shell = require('shelljs');
const apiGenerator = require('./api/index.js');

module.exports = (plop) => {
  plop.setGenerator('api', apiGenerator);
  plop.setActionType('prettify', (answers, config) => {
    const { data } = config;
    shell.exec(`npm run prettify -- "${data.path}"`, { silent: true });
    shell.exec('eslint src/route.js --fix', { silent: true });
    return '';
  });
};
