import { createRequire } from 'node:module';
import path from 'node:path';

import * as parser from '@typescript-eslint/parser';
import { parsers, utils } from 'ember-eslint';
import n from 'eslint-plugin-n';
import globals from 'globals';

import { forFiles } from '#utils';

import { config as base } from './base.js';
import { config as imports } from './rules/imports.js';

const require = createRequire(import.meta.url);

const EXPECTED_NODE_VERSION = '22.0.0'; // or greater
/**
 * @param {string} root
 * @param {import('#types').Options} [ options ]
 */
const configBuilder = (root) => {
  let esm = parsers.esm(root);
  let hasTS = utils.hasTypescript(root);

  return {
    modules: {
      get js() {
        return {
          languageOptions: {
            globals: globals.node,
            ecmaVersion: 'latest',
            sourceType: 'module',
          },
        };
      },
      get ts() {
        if (!hasTS) return {};

        return {
          languageOptions: {
            globals: globals.node,
            parser,
            parserOptions: esm.ts,
          },
        };
      },
    },
    commonjs: {
      get js() {
        return {
          languageOptions: {
            globals: globals.node,
            ecmaVersion: 'latest',
            sourceType: 'script',
          },
          rules: {
            'n/no-unsupported-features/es-syntax': [
              'error',
              {
                version: EXPECTED_NODE_VERSION,
              },
            ],
          },
        };
      },
      get ts() {
        return {
          languageOptions: {
            globals: globals.node,
            parser,
            parserOptions: {
              ...esm.ts,
              sourceType: 'script',
            },
          },
          rules: {
            'n/no-unsupported-features/es-syntax': [
              'error',
              {
                version: EXPECTED_NODE_VERSION,
              },
            ],
          },
        };
      },
    },
    get tests() {
      return {
        rules: {
          // devDependencies
          'n/no-unpublished-import': 'off',
          'n/no-missing-import': 'off',
          'import/named': 'off',
        },
      };
    },
  };
};

/**
 * as long as eslint is invoked from from the same directory as the package.json,
 * you can be worry free about file format (cjs, cts, mts, mjs, etc etc)
 *
 * @param {string} root
 * @param {import('#types').Options} options
 */
export function node(root, options) {
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
    return nodeESM(root, options);
  }

  return nodeCJS(root, options);
}

/**
 * @param {string} root
 * @param {import('#types').Options} options
 */
function nodeCJS(root, options) {
  let config = configBuilder(root, options);

  return [
    ...base,
    n.configs['flat/recommended'],
    ...imports,
    forFiles('**/*.{cjs,js}', config.commonjs.js),
    forFiles('**/*.{cts,ts}', config.commonjs.ts),
    forFiles('**/*.mts', config.modules.ts),
    forFiles('**/*.mjs', config.modules.js),
    forFiles(['vitest.config.ts', 'tests/**/*'], config.tests),
  ];
}

/**
 * @param {string} root
 * @param {import('#types').Options} options
 */
function nodeESM(root, options) {
  let config = configBuilder(root, options);

  return [
    ...base,
    n.configs['flat/recommended'],
    ...imports,
    forFiles('**/*.cjs', config.commonjs.js),
    forFiles('**/*.cts', config.commonjs.ts),
    forFiles('**/*.{mts,ts}', config.modules.ts),
    forFiles('**/*.{mjs,js}', config.modules.js),
    forFiles(['vitest.config.ts', 'tests/**/*'], config.tests),
  ];
}
