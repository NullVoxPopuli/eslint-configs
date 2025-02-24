import { ember as upstreamEmber } from 'ember-eslint';

import { config as base } from './base.js';
import { config as imports } from './rules/imports.js';
import { rule as typescriptRules } from './rules/typescript.js';

/**
 * @param {string} root
 * @param {import('#types').Options} [ options ]
 */
export function ember(root) {
  return [
    ...base,
    ...imports,
    {
      files: ['**/*.ts'],
      ...typescriptRules,
    },
    ...upstreamEmber.recommended(root),
  ];
}
