/**
 * @template Value
 *
 * @param {Value} input
 * @param {(((input: Value) => Value))[]} fns
 * @returns {Value}
 */
export function pipe(input, ...fns) {
  let lastResult = input;

  for (const fn of fns) {
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

  if (Array.isArray(override)) {
    return override.map((config) => forFiles(globs, config));
  }

  return {
    ...override,
    files: Array.isArray(globs) ? globs : [globs],
  };
}
