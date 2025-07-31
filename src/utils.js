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
  const configs = [overrides].flat(Infinity);

  const files = new Set();
  const ignores = new Set();
  let rules = {};
  let plugins = {};
  let languageOptions = {};
  let linterOptions = {};
  let settings = {};

  for (const config of configs) {
    files.add(config.files);
    ignores.add(config.ignores);

    if (config.rules) {
      rules = Object.assign(rules, config.rules);
    }

    if (config.plugins) {
      plugins = Object.assign(plugins, config.plugins);
    }

    if (config.languageOptions) {
      languageOptions = Object.assign(languageOptions, config.languageOptions);
    }

    if (config.linterOptions) {
      linterOptions = Object.assign(linterOptions, config.linterOptions);
    }

    if (config.settings) {
      settings = Object.assign(settings, config.settings);
    }
  }

  const result = {
    plugins,
    rules,
    name,
    languageOptions,
    linterOptions,
    settings,
    files: [...files.values()].flat().filter(Boolean),
    ignores: [...ignores.values()].flat().filter(Boolean),
  };

  if (Object.keys(result.plugins).length === 0) {
    delete result.plugins;
  }

  if (Object.keys(result.languageOptions).length === 0) {
    delete result.languageOptions;
  }

  if (Object.keys(result.linterOptions).length === 0) {
    delete result.linterOptions;
  }

  if (Object.keys(result.settings).length === 0) {
    delete result.settings;
  }

  if (result.files.length === 0) {
    delete result.files;
  }

  if (result.ignores.length === 0) {
    delete result.ignores;
  }

  return result;
}
