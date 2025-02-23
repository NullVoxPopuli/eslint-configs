// @ts-check
export { merge, pipe } from './configs/-utils.js';

export const configs = {
  /**
   * @param {import('./configs/types').Options} [ options ]
   * @returns {import('eslint').Linter.Config}
   */
  ember(options = {}) {
    return require('./configs/ember').ember(options);
  },
  /**
   * @param {import('./configs/types').Options} [ options ]
   * @returns {import('eslint').Linter.Config}
   */
  crossPlatform(options = {}) {
    return require('./configs/cross-platform')(options);
  },
  /**
   * @param {import('./configs/types').Options} [ options ]
   * @returns {import('eslint').Linter.Config}
   */
  node(options = {}) {
    return require('./configs/node').node(options);
  },
}; 
