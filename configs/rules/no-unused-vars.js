/**
 * @type {import('#types').PartialConfig[]}
 */
export const config = [
  {
    name: 'nvp:no-unused-vars',
    rules: {
      // Allows placeholder args and variables to still be defined for
      // documentation or "for later" purposes
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
];
