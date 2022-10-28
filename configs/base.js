'use strict';

const { pipe, merge } = require('./-utils');

/**
 * @type {import('./types').PartialConfig}
 */
const base = pipe(
  {
    extends: ['eslint:recommended'],
    rules: {
      // const has misleading safety implications
      // look in to "liberal let"
      'prefer-const': 'off',

      // people should know that no return is undefined in JS
      'getter-return': ['error', { allowImplicit: true }],
    },
  },
  (config) => merge(config, require('./rules/no-console')),
  (config) => merge(config, require('./rules/padding-line-between-statements')),
  (config) => merge(config, require('./rules/import-sorting'))
);

module.exports = {
  base,
};
