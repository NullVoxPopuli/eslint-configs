const plugin = 'decorator-position';

/**
 * @type {import('../types').PartialConfig}
 */
const rule = {
  plugins: ['decorator-position'],
  extends: ['plugin:decorator-position/ember'],
};

module.exports = { rule, plugin };
