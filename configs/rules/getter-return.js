/**
 * @type {import('#types').PartialConfig}
 */
export const config = [
  {
    name: 'nvp:getter-return',
    rules: {
      // people should know that no return is undefined in JS
      'getter-return': ['error', { allowImplicit: true }],
    },
  },
];
