module.exports = {
  /**
   *
   * @returns {import('../types').PartialConfig}
   */
  resolveRule() {
    let { cosmiconfigSync } = require('cosmiconfig');
    let prettier = cosmiconfigSync('prettier');

    let prettierResault = prettier.search();

    return {
      plugins: ['prettier'],
      rules: {
        'prettier/prettier': prettierResault?.config
          ? ['error', prettierResault.config]
          : ['error', { singleQuote: true, printWidth: 100, trailingComma: 'es5' }],
      },
    };
  },
};
