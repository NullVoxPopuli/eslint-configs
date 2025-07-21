import { createRequire } from 'node:module';
import path from 'node:path';

import * as parser from '@typescript-eslint/parser';
import { parsers, utils } from 'ember-eslint';
import n from 'eslint-plugin-n';
import globals from 'globals';

import { combine, forFiles } from '#utils';

import { config as base } from './base.js';
import { config as imports } from './rules/imports.js';

const require = createRequire(import.meta.url);

const EXPECTED_NODE_VERSION = '22.0.0'; // or greater
/**
 * @param {string} root
 * @param {import('#types').Options} [ options ]
 */
const configBuilder = (root) => {
  const esm = parsers.esm(root);
  const hasTS = utils.hasTypescript(root);

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
        if (!hasTS) return {};

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
          'n/no-unpublished-require': 'off',
          'n/no-missing-import': 'off',
          'n/no-missing-require': 'off',
          'import/named': 'off',
        },
      };
    },
    get unpublished() {
      return {
        rules: {
          // devDependencies
          'n/no-unpublished-import': 'off',
          'n/no-unpublished-require': 'off',
          'n/no-missing-import': 'off',
          'n/no-missing-require': 'off',
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
    const config = nodeESM(root, options);

    return config;
  }

  return nodeCJS(root, options);
}

/**
 * @param {string} root
 * @param {import('#types').Options} options
 */
function nodeCJS(root, options) {
  const config = configBuilder(root, options);

  return [
    /**
     * Ignores must be in their own object
     * https://eslint.org/docs/latest/use/configure/ignore
     */
    {
      name: 'nvp/node-cjs:ignores',
      ignores: ['dist/', 'node_modules/', 'coverage/', '!**/.*'],
    },
    /**
     * https://eslint.org/docs/latest/use/configure/configuration-files#configuring-linter-options
     */
    {
      name: 'nvp/node-cjs:linter-options',
      linterOptions: {
        reportUnusedDisableDirectives: 'error',
      },
    },
    ...base,
    n.configs['flat/recommended'],
    ...imports,

    combine('nvp/node-cjs:cjs', [forFiles('**/*.{cjs,js}', config.commonjs.js)]),
    combine('nvp/node-cjs:cts', [forFiles('**/*.{cts,ts}', config.commonjs.ts)]),
    combine('nvp/node-cjs:mts', [forFiles('**/*.mts', config.modules.ts)]),
    combine('nvp/node-cjs:mjs', [forFiles('**/*.mjs', config.modules.js)]),
    combine('nvp/node-cjs:tests', [forFiles(['vitest.config.*', 'tests/**/*'], config.tests)]),
    combine('nvp/node-cjs:configs', [
      forFiles(['eslint.config.*', '.eslintrc.*', '.prettierrc.*'], config.unpublished),
    ]),
  ];
}

/**
 * @param {string} root
 * @param {import('#types').Options} options
 */
function nodeESM(root, options) {
  const config = configBuilder(root, options);

  return [
    /**
     * Ignores must be in their own object
     * https://eslint.org/docs/latest/use/configure/ignore
     */
    {
      name: 'nvp/node-esm:ignores',
      ignores: ['dist/', 'node_modules/', 'coverage/', '!**/.*'],
    },
    /**
     * https://eslint.org/docs/latest/use/configure/configuration-files#configuring-linter-options
     */
    {
      name: 'nvp/node-esm:linter-options',
      linterOptions: {
        reportUnusedDisableDirectives: 'error',
      },
    },
    ...base,
    n.configs['flat/recommended'],
    ...imports,
    combine('nvp/node-esm:cjs', [forFiles('**/*.cjs', config.commonjs.js)]),
    combine('nvp/node-esm:cts', [forFiles('**/*.cts', config.commonjs.ts)]),
    combine('nvp/node-esm:mts', [forFiles('**/*.{mts,ts}', config.modules.ts)]),
    combine('nvp/node-esm:mjs', [forFiles('**/*.{mjs,js}', config.modules.js)]),
    combine('nvp/node-esm:tests', [forFiles(['vitest.config.*', 'tests/**/*'], config.tests)]),
    combine('nvp/node-esm:configs', [
      forFiles(['eslint.config.*', '.eslintrc.*', '.prettierrc.*'], config.unpublished),
    ]),
  ];
}
