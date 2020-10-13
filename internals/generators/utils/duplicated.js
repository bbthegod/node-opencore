/**
 * duplicated
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require('fs');
const path = require('path');

const allAPI = fs.readdirSync(path.join(__dirname, '../../../src/api'));
const api = allAPI.concat(allAPI);

module.exports = (newAPI) => api.indexOf(newAPI) >= 0;
