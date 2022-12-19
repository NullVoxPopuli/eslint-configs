'use strict';

const { scriptBase, baseRulesAppliedLast, tsBase, moduleImports } = require('./base');

const baseConfig = {
  env: {
    browser: false,
    node: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'script',
    ecmaVersion: 2018,
    requireConfigFile: false,
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

    // Does not respect npm packages...
    'import/no-unresolved': 'off',
    'node/no-missing-import': 'off',

    // This is ESM...
    'node/no-unsupported-features/es-syntax': 'off',
    'node/no-unpublished-import': 'off', // common-tags is totally published
  },
};

const baseTSModulesConfig = {
  ...tsBase,
  plugins: [tsBase.plugins, moduleImports.plugins, '@typescript-eslint'].flat(),
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  rules: {
    ...tsBase.rules,
    ...moduleImports.rules,

    // much concise
    '@typescript-eslint/prefer-optional-chain': 'error',

    ...baseRulesAppliedLast,
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

const mts = [
  {
    ...baseTSModulesConfig,
    files: ['**/*.ts'],
  },
];

module.exports = {
  baseConfig,
  baseModulesConfig,
  baseTSModulesConfig,
  nodeCJS: [...cjs],
  nodeESM: [...mjs],
  nodeMTS: [...mts],
};
