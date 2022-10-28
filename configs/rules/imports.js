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

    // Anti-noise
    'import/no-unassigned-import': ['error'],

    // Style
    'import/exports-last': ['error'],
    'import/no-duplicates': ['error'],
    'import/newline-after-import': ['error'],
  },
};

module.exports = { rule };
