import importPlugin from 'eslint-plugin-import';

const base = importPlugin.flatConfigs.recommended;

/**
 *
 * @type {import('#types').PartialConfig[]}
 */
export const config = [
  {
    plugins: { ...base.plugins },
    rules: {
      // ----------------------------
      // Broken Rules
      // ----------------------------

      // Does not respect package.json#exports
      'import/no-unresolved': 'off',

      // Anti-foot-gun
      'import/no-cycle': ['error'],

      // Not useful, only stylistic
      'import/exports-last': 'off',

      // Style
      'import/no-duplicates': ['error'],
      'import/newline-after-import': ['error'],

      // Side-effecting imports should be allowed (CSS, etc)
      // Doubly so for .d.ts files (where we need to augment the global types or other known modules).
      'import/no-unassigned-import': 'off',
    },
  },
];
