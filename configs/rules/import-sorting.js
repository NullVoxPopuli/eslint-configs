'use strict';

const plugin = 'simple-import-sort';
const config = {
  // This notation is bonkers
  groups: [
    // Side effect imports.
    ['^\\u0000'],

    // framework imports
    [
      '^ember$',
      '^@glimmer',
      '^@ember',
      '^ember-cli-htmlbars',
      '^qunit',
      '^ember-qunit',
      '^@embroider',
      '^@embroider',
    ],

    // Packages.
    // Things that start with a letter (or digit or underscore), or `@` followed
    // by a letter.
    ['^@?\\w'],

    // Absolute imports and other imports such as Vue-style `@/foo`.
    // Anything not matched in another group.
    ['^'],

    // monorepo apps
    ['^emberclear', '^pinochle', '^limber'],

    // monorepo packages
    ['^@emberclear', '^@limber', '@glimdown'],

    // paths with test-support in the name
    ['/test-support'],

    // Relative imports.
    // Anything that starts with a dot.
    ['^\\.'],

    // Stray Type imports
    ['^.+\\u0000$'],
  ],
};

/**
 * simple-import-sort is a mandatory plugin,
 * provided by this @nullvoxpopuli/eslint-configs
 *
 * @type {import('../types').PartialConfig}
 */
const rule = {
  plugins: [plugin],
  rules: {
    'simple-import-sort/imports': ['error', config],
    'simple-import-sort/exports': 'error',
  },
};

module.exports = { rule, config, plugin };
