import { ember as upstreamEmber } from 'ember-eslint';
import templateLintMigration from 'eslint-plugin-ember/configs/template-lint-migration';

import { combine, forFiles } from '#utils';

import { rules as baseRules } from './base.js';
import { config as imports } from './rules/imports.js';
import { rule as typescriptRules } from './rules/typescript.js';

/**
 * @param {string} root
 * @param {import('#types').Options} [ options ]
 */
export function ember(root, options = {}) {
  return [
    ...upstreamEmber.recommended(root),
    combine('nvp/ember:overrides', [
      forFiles('**/*.{js,ts,gjs,gts}', baseRules),
      forFiles('**/*.{js,ts,gjs,gts}', imports),
    ]),
    {
      name: 'nvp/ember:typescript',
      files: ['**/*.{ts,gts}'],
      rules: {
        ...typescriptRules.rules,
      },
    },
    ...(options.templates ? [templates()] : []),
  ];
}

/**
 * The parser and the plugin already come from the upstream config,
 * so only the rules are taken here.
 */
function templates() {
  return {
    name: 'nvp/ember:templates',
    files: ['**/*.{gjs,gts}'],
    rules: templateLintMigration.at(-1).rules,
  };
}
