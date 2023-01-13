'use strict';

const config = {
  allow: ['debug', 'warn', 'error', 'info', 'group', 'groupEnd', 'groupCollapsed'],
};

/**
 * @type {import('../types').PartialConfig}
 */
const rule = {
  rules: {
    'no-console': ['error', config],
  },
};

module.exports = { rule, config };
