'use strict';

module.exports = {
  singleQuote: true,
  printWidth: 100,
  trailingComma: 'es5',
  overrides: [
    {
      files: ['*.json'],
      options: {
        singleQuote: false,
      },
    },
  ],
};
