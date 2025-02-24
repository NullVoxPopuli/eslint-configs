import js from '@eslint/js';
import path from 'node:path';
import n from 'eslint-plugin-n';
import { forFiles } from '#utils';

import { config as imports } from './rules/imports.js';
import { config as base } from './base.js';

const EXPECTED_NODE_VERSION = '22.0.0'; // or greater
/**
 * @param {string} root
 * @param {import('#types').Options} options
 */
const configBuilder = (root, options = {}) => {
  return {
    modules: {
      get js() {
        return {};
      },
      get ts() {
        return {};
      },
    },
    commonjs: {
      get js() {
        return {
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
    ...n.configs['flat/recommended'],
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
 * @param {import('./types').Options} options
 */
function nodeESM(root, options) {
  let config = configBuilder(root, options);

  return [
    ...base,
    ...n.configs['flat/recommended'],
    ...imports,
    forFiles('**/*.cjs', config.commonjs.js),
    forFiles('**/*.cts', config.commonjs.ts),
    forFiles('**/*.{mts,ts}', config.modules.ts),
    forFiles('**/*.{mjs,js}', config.modules.js),
    forFiles(['vitest.config.ts', 'tests/**/*'], config.tests),
  ];
}
