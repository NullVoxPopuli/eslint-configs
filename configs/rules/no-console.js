
const ruleConfig = {
  allow: ['debug', 'warn', 'error', 'info', 'group', 'groupEnd', 'groupCollapsed', 'table'],
};

/**
 * @type {import('#types').PartialConfig}
 */
export const config = [{
  rules: {
    'no-console': ['error', ruleConfig],
  },
}];

