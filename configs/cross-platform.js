'use strict';

const path = require('path');

const { hasDep, configFor, pipe, merge, forFiles } = require('./-utils');

/**
 * @param {import('./types').Options} options
 */
const configBuilder = (options = {}) => {
  let hasTypeScript = hasDep('typescript');

  let personalPreferences = pipe({}, (config) => merge(config, require('./base').base));

  if (options.prettierIntegration) {
    personalPreferences = merge(personalPreferences, require('./rules/prettier').resolveRule());
  }

  return {
    modules: {
      get js() {
        return pipe(
          {
            parserOptions: {
              sourceType: 'module',
              ecmaVersion: 'latest',
            },
            env: {
              browser: false,
              node: true,
              es6: true,
            },
            plugins: ['n'],
            extends: ['plugin:n/recommended'],
          },
          (config) => merge(config, personalPreferences),
          (config) => merge(config, require('./rules/imports'))
        );
      },
      get ts() {
        if (!hasTypeScript) return;

        return pipe(
          {
            parserOptions: {
              sourceType: 'module',
              ecmaVersion: 'latest',
            },
            env: {
              browser: false,
              node: true,
              es6: true,
            },
            plugins: ['n'],
            extends: ['plugin:n/recommended', 'plugin:import/typescript'],
          },
          (config) => merge(config, personalPreferences),
          (config) => merge(config, require('./rules/imports')),
          (config) => merge(config, require('./rules/typescript'))
        );
      },
    },
    commonjs: {
      get js() {
        return pipe(
          {
            parserOptions: {
              sourceType: 'script',
              ecmaVersion: 'latest',
            },
            env: {
              browser: false,
              node: true,
              es6: true,
            },
            plugins: ['n'],
            extends: ['plugin:n/recommended'],
          },
          (config) => merge(config, personalPreferences),
          (config) => merge(config, require('./rules/imports'))
        );
      },
      get ts() {
        let hasTypeScript = hasDep('typescript');

        if (!hasTypeScript) return;

        return pipe(
          {
            parserOptions: {
              sourceType: 'script',
              ecmaVersion: 'latest',
            },
            env: {
              browser: false,
              node: true,
              es6: true,
            },
            plugins: ['n'],
            extends: ['plugin:n/recommended', 'plugin:import/typescript'],
          },
          (config) => merge(config, personalPreferences),
          (config) => merge(config, require('./rules/imports')),
          (config) => merge(config, require('./rules/typescript'))
        );
      },
    },
    get tests() {
      return {
        rules: {
          // devDependencies
          'n/no-unpublished-import': 'off',
          // side-effects are... fine? 
          'import/no-unassigned-import': 'off',
        },
      };
    },
    get config() {
      return {
        rules: {
          // devDependencies
          'n/no-unpublished-import': 'off',
        },
      };
    },
  };
};

function crossPlatform(options = {}) {
  let config = configBuilder(options);

  return configFor([
    forFiles('**/*.cjs', config.commonjs.js),
    forFiles('**/*.cts', config.commonjs.ts),
    forFiles('**/*.{mts,ts}', config.modules.ts),
    forFiles('**/*.{mjs,js}', config.modules.js),
    forFiles('config/**/*', config.config),
    forFiles(['vitest.config.ts', 'tests/**/*'], config.tests),
  ]);
}

module.exports = crossPlatform;
