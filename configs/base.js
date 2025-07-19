import js from '@eslint/js';

import { config as getterReturn } from './rules/getter-return.js';
import { config as importSorting } from './rules/import-sorting.js';
import { config as noConsole } from './rules/no-console.js';
import { config as allowVar } from './rules/no-var.js';
import { config as paddingLine } from './rules/padding-line-between-statements.js';
import { config as preferConst } from './rules/prefer-const.js';

export const rules = [
  ...importSorting,
  ...noConsole,
  ...paddingLine,
  ...importSorting,
  ...getterReturn,
  ...preferConst,
  ...allowVar,
];

/**
 * @type {import('#types').PartialConfig}
 */
export const config = [js.configs.recommended, ...rules];
