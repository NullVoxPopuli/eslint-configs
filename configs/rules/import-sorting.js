import simpleImportSort from 'eslint-plugin-simple-import-sort';

const ruleConfig = {
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
      '^node:',
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
    ['^@emberclear', '^@limber', '@glimdown', '@nullvoxpopuli', '@universal-ember'],

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
 * @type {import('#types').PartialConfig}
 */
export const config = [
  {
    name: 'nvp:import-sorting',
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': ['error', ruleConfig],
      'simple-import-sort/exports': 'error',
    },
  },
];
