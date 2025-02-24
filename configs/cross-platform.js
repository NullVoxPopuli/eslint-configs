'use strict';

import { forFiles } from '#utils';
import { config as imports } from './rules/imports.js';
import { config as base } from './base.js';

/**
 * @param {import('#types').Options} options
 */
const configBuilder = (options = {}) => {
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

export function crossPlatform(options = {}) {
  let config = configBuilder(options);

  return [
    ...base,
    ...n.configs['flat/recommended'],
    ...imports,
    forFiles('**/*.cjs', config.commonjs.js),
    forFiles('**/*.cts', config.commonjs.ts),
    forFiles('**/*.{mts,ts}', config.modules.ts),
    forFiles('**/*.{mjs,js}', config.modules.js),
    forFiles('config/**/*', config.config),
    forFiles(['vitest.config.ts', 'tests/**/*'], config.tests),
  ];
}
