import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

/**
 * @template Value
 *
 * @param {Value} input
 * @param {(((input: Value) => Value))[]} fns
 * @returns {Value}
 */
export function pipe(input, ...fns) {
  let lastResult = input;

  for (let fn of fns) {
    lastResult = fn(lastResult);
  }

  return lastResult;
}

/**
 *
 * @param {string | string[]} globs
 * @param {import('#types').PartialConfig | undefined} override
 * @returns {import('eslint').Linter.ConfigOverride | undefined}
 */
export function forFiles(globs, override) {
  if (!override) return;

  return {
    ...override,
    files: Array.isArray(globs) ? globs : [globs],
  };
}
