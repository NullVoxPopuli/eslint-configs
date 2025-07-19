/**
 * @type {import('#types').PartialConfig[]}
 */
export const config = [
  {
    name: 'nvp:allow-var',
    rules: {
      /**
       * var is used for situations where you want hoisting.
       * It's most useful in async/catch flows, like
       *
       * Example:
       *
       * ```js
       * async function () {
       *   try {
       *     var result = await foo();
       *   } catch (e) {}
       *
       *   console.log(result)
       * }
       * ```
       */
      'no-var': 'off',
    },
  },
];
