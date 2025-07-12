/**
 * @type {import('#types').PartialConfig}
 */
export const config = [
  {
    name: 'nvp:prefer-const',
    rules: {
      // const has misleading safety implications
      // look in to "liberal let"
      // However, const plays nicely with typescript gurantees.
      //
      // I'm still going to type "let", but this rule autofixes,
      // So I don't *really* care that much.
      'prefer-const': ['error', { destructuring: 'all' }],
    },
  },
];
