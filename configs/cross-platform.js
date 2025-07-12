import n from 'eslint-plugin-n';

import { forFiles } from '#utils';

import { config as base } from './base.js';
import { config as imports } from './rules/imports.js';

/**
 * @param {import('#types').Options} options
 */
const configBuilder = () => {
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
        return {};
      },
      get ts() {
        return {};
      },
    },
    get tests() {
      return {
        name: 'nvp/cross-platform:tests',
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
        name: 'nvp/cross-platform:config',
        rules: {
          // devDependencies
          'n/no-unpublished-import': 'off',
        },
      };
    },
  };
};

export function crossPlatform(options = {}) {
  const config = configBuilder(options);

  return [
    /**
     * Ignores must be in their own object
     * https://eslint.org/docs/latest/use/configure/ignore
     */
    {
      name: 'nvp/cross-platform:ignores',
      ignores: ['dist/', 'node_modules/', 'coverage/', '!**/.*'],
    },
    /**
     * https://eslint.org/docs/latest/use/configure/configuration-files#configuring-linter-options
     */
    {
      name: 'nvp/cross-platform:linter-options',
      linterOptions: {
        reportUnusedDisableDirectives: 'error',
      },
    },
    ...base,
    n.configs['flat/recommended'],
    ...imports,
    forFiles('**/*.cjs', config.commonjs.js),
    forFiles('**/*.cts', config.commonjs.ts),
    forFiles('**/*.{mts,ts}', config.modules.ts),
    forFiles('**/*.{mjs,js}', config.modules.js),
  ];
}
