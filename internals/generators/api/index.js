/* eslint strict: ["off"] */

'use strict';

const path = require('path');
const duplicated = require('../../utils/duplicated');

const apiPath = path.join(__dirname, '../../src/api');

module.exports = {
  description: 'Create a API',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Create a new API with given name: ',
      default: 'article',
      validate: (value) => {
        if (/.+/.test(value)) {
          return duplicated(value) ? 'API already exists' : true;
        }
        return 'This field is required';
      },
    },
  ],
  actions: (data) => {
    const actions = [];

    actions.push({
      type: 'add',
      path: '../../src/api/{{name}}/{{name}}.controller.js',
      templateFile: './api/controller.js.hbs',
      abortOnFail: true,
    });

    actions.push({
      type: 'add',
      path: '../../src/api/{{name}}/{{name}}.route.js',
      templateFile: './api/route.js.hbs',
      abortOnFail: true,
    });

    actions.push({
      type: 'add',
      path: '../../src/api/{{name}}/{{name}}.model.js',
      templateFile: './api/model.js.hbs',
      abortOnFail: true,
    });

    actions.push({
      type: 'add',
      path: '../../src/api/{{name}}/{{name}}.validation.js',
      templateFile: './api/validation.js.hbs',
      abortOnFail: true,
    });

    actions.push({
      type: 'modify',
      path: '../../src/route.js',
      pattern: /(const .* = require.*;\n)+/g,
      templateFile: './api/changeRoute/require.hbs',
    });

    actions.push({
      type: 'modify',
      path: '../../src/route.js',
      pattern: /(router..*;\n)+/g,
      templateFile: './api/changeRoute/routerUse.hbs',
    });

    actions.push({
      type: 'prettify',
      data: { path: `${apiPath}/${data.name}/**` },
    });
    return actions;
  },
};
