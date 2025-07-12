const ruleConfig = [
  { blankLine: 'always', prev: '*', next: 'return' },
  { blankLine: 'always', prev: '*', next: 'break' },
  { blankLine: 'always', prev: '*', next: 'block-like' },
  { blankLine: 'always', prev: 'block-like', next: '*' },
  { blankLine: 'always', prev: ['const', 'let'], next: '*' },
  { blankLine: 'always', prev: '*', next: ['const', 'let'] },
  { blankLine: 'any', prev: ['const', 'let'], next: ['const', 'let'] },
  { blankLine: 'any', prev: ['*'], next: ['case'] },
];

/**
 * @type {import('#types').PartialConfig}
 */
export const config = [
  {
    name: 'nvp:padding-line-between-statements',
    rules: {
      'padding-line-between-statements': ['error', ...ruleConfig],
    },
  },
];
