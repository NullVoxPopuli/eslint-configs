'use strict';

const { scriptBase, baseRulesAppliedLast } = require('./base');

const baseConfig = {
  env: {
    browser: false,
    node: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'script',
    ecmaVersion: 2018,
  },
  plugins: ['node', ...scriptBase.plugins],
  rules: {
    ...require('eslint-plugin-node').configs.recommended.rules,
    ...scriptBase.rules,

    'node/no-unpublished-require': 'off', // we live dangerously here
    'node/no-extraneous-require': 'off', // incorrect?

    ...baseRulesAppliedLast,
  },
};

const baseModulesConfig = {
  ...baseConfig,
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: '2021',
  },
  rules: {
    ...baseConfig.rules,

    'import/exports-last': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
    'node/no-unpublished-import': 'off', // common-tags is totally published
  },
};

const cjs = [
  {
    ...baseConfig,
    files: ['**/*.js', '**/*.cjs'],
  },
  {
    ...baseModulesConfig,
    files: ['**/*.mjs'],
  },
];

const mjs = [
  {
    ...baseConfig,
    files: ['**/*.cjs'],
  },
  {
    ...baseModulesConfig,
    files: ['**/*.js', '**/*.mjs'],
  },
];

module.exports = { baseConfig, node: [...cjs], nodeCJS: [...cjs], nodeESModules: [...mjs] };
