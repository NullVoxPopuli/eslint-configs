import js from '@eslint/js';

import { config as noConsole } from './rules/no-console.js';
import { config as paddingLine } from './rules/padding-line-between-statements.js';
import { config as importSorting } from './rules/import-sorting.js';

/**
 * @type {import('#types').PartialConfig}
 */
export const config = [
  js.configs.recommended,
  {
      rules: {
        // const has misleading safety implications
        // look in to "liberal let"
        'prefer-const': 'off',

        // people should know that no return is undefined in JS
        'getter-return': ['error', { allowImplicit: true }],
      },
  },
  ...noConsole,
  ...paddingLine,
  ...importSorting,
);

