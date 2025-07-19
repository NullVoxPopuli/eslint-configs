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

export function combine(name, overrides) {
  const configs = overrides.flat();

  const files = new Set();
  let rules = {};
  let plugins = {};

  for (const config of configs) {
    files.add(config.files);

    if (config.rules) {
      rules = Object.assign(rules, config.rules);
    }

    if (config.plugins) {
      plugins = Object.assign(plugins, config.plugins);
    }
  }

  return {
    files: [...files.values()].filter(Boolean),
    plugins,
    rules,
    name,
  };
}
