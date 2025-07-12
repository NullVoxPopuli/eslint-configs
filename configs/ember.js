import { ember as upstreamEmber } from 'ember-eslint';

import { forFiles } from '#utils';

import { rules as baseRules } from './base.js';
import { config as imports } from './rules/imports.js';
import { rule as typescriptRules } from './rules/typescript.js';

/**
 * @param {string} root
 * @param {import('#types').Options} [ options ]
 */
export function ember(root) {
  return [
    ...upstreamEmber.recommended(root),
    {
      name: 'nvp/ember:typescript',
      files: ['**/*.ts'],
      ...typescriptRules,
    },
    ...forFiles('**/*.{js,ts,gjs,gts}', baseRules),
    ...forFiles('**/*.{js,ts,gjs,gts}', imports),
  ];
}
