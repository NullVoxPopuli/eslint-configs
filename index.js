// @ts-check
export { pipe } from '#utils';

import { crossPlatform } from './configs/cross-platform.js';
import { ember } from './configs/ember.js';
import { node } from './configs/node.js';

export { disableTypedLints } from './src/typed-lints.js';

export const configs = {
  /**
   * @param {string} root
   * @param {import('#types').Options} [ options ]
   * @returns {import('eslint').Linter.Config}
   */
  ember(root, options = {}) {
    return ember(root, options);
  },
  /**
   * @param {string} root
   * @param {import('#types').Options} [ options ]
   * @returns {import('eslint').Linter.Config}
   */
  crossPlatform(root, options = {}) {
    return crossPlatform(root, options);
  },
  /**
   * @param {string} root
   * @param {import('#types').Options} [ options ]
   * @returns {import('eslint').Linter.Config}
   */
  node(root, options = {}) {
    return node(root, options);
  },
};
