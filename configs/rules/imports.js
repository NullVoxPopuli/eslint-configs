'use strict';

/**
 *
 * @type {import('../types').PartialConfig}
 */
const rule = {
  plugins: ['import'],
  extends: ['plugin:import/recommended'],
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

    // Anti-noise
    'import/no-unassigned-import': ['error'],

    // Style
    'import/no-duplicates': ['error'],
    'import/newline-after-import': ['error'],
  },
};

module.exports = { rule };
