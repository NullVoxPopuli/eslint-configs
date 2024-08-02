'use strict';

const path = require('path');

const { hasDep, configFor, pipe, merge, forFiles } = require('./-utils');

const EXPECTED_NODE_VERSION = '16.0.0'; // or greater
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
            rules: {
              'n/no-unsupported-features/es-syntax': [
                'error',
                {
                  version: EXPECTED_NODE_VERSION,
                },
              ],
            },
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
            rules: {
              'n/no-unsupported-features/es-syntax': [
                'error',
                {
                  version: EXPECTED_NODE_VERSION,
                },
              ],
            },
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
        },
      };
    },
  };
};

module.exports = {
  configBuilder,
  /**
   * as long as eslint is invoked from from the same directory as the package.json,
   * you can be worry free about file format (cjs, cts, mts, mjs, etc etc)
   *
   * @param {import('./types').Options} options
   */
  node(options) {
    let packageJsonPath;
    let packageJson;

    try {
      packageJsonPath = path.resolve(path.join(process.cwd(), 'package.json'));
      packageJson = require(packageJsonPath);
    } catch (e) {
      console.error(
        'Failed to find package.json. ' +
          'When using the `node` config from `@nullvoxpopuli/eslint-configs`, ' +
          'you must invoke `eslint` from the same directory as package.json ' +
          'so that the config can correctly determine if your project is ESM or CJS. ' +
          'The current working directory is ' +
          process.cwd()
      );

      throw e;
    }

    if (packageJson.type === 'module') {
      return module.exports.nodeESM(options);
    }

    return module.exports.nodeCJS(options);
  },
  /**
   * @param {import('./types').Options} options
   */
  nodeCJS(options) {
    let config = configBuilder(options);

    return configFor([
      forFiles('**/*.{cjs,js}', config.commonjs.js),
      forFiles('**/*.{cts,ts}', config.commonjs.ts),
      forFiles('**/*.mts', config.modules.ts),
      forFiles('**/*.mjs', config.modules.js),
      forFiles(['vitest.config.ts', 'tests/**/*'], config.tests),
    ]);
  },
  /**
   * @param {import('./types').Options} options
   */
  nodeESM(options) {
    let config = configBuilder(options);

    return configFor([
      forFiles('**/*.cjs', config.commonjs.js),
      forFiles('**/*.cts', config.commonjs.ts),
      forFiles('**/*.{mts,ts}', config.modules.ts),
      forFiles('**/*.{mjs,js}', config.modules.js),
      forFiles(['vitest.config.ts', 'tests/**/*'], config.tests),
    ]);
  },
};
