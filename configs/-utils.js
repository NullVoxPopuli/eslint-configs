// @ts-check
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

/**
 * @param {string} depName
 * @returns {boolean}
 */
export function hasDep(depName) {
  try {
    return Boolean(require.resolve(depName));
  } catch (e) {
    if (e instanceof Error) {
      if (e.message.startsWith(`Cannot find module '${depName}'`)) return false;
    }

    throw e;
  }
}

/**
 * For merging an overrides entry for ESLint configs
 * @typedef {import('./types').PartialConfig} PartialConfig
 *
 * @typedef {{
 *    rule: PartialConfig;
 *    plugin?: string;
 *    config?: unknown;
 *  }} RuleConfig
 *
 *
 * @param {PartialConfig} source
 * @param {PartialConfig | RuleConfig} override
 * @param {{
 *     mandatory: true;
 *   }
 *   | {
 *     mandatory: false;
 *     includeWhen: {
 *       depIsPresent: string
 *     }
 *   }
 * } [options]
 *
 * @returns {PartialConfig}
 */
export function merge(source, override, options = { mandatory: true }) {
  /** @type {<Value>(x: Value | Value[] | undefined) => Value[]} */
  let array = (x) => {
    if (!x) return [];

    return Array.isArray(x) ? x : [x];
  };
  /** @type {<Value extends {}>(x: Value | undefined) => ( Value | {})} */
  let obj = (x) => x ?? {};

  if (false === options.mandatory) {
    if (hasDep(options.includeWhen.depIsPresent)) {
      /**
       * Recurse, but without the presence cehck
       */
      return merge(source, override, { mandatory: true });
    }

    /**
     * No merge needed
     */
    return source;
  }

  if ('rule' in override) {
    return merge(source, override.rule, options);
  }

  /** @type {NonNullable<import('eslint').Linter.ConfigOverride['plugins']>} */
  let configPlugins = [];
  /** @type {NonNullable<import('eslint').Linter.ConfigOverride['extends']>} */
  let configExtends = [];

  return {
    ...source,
    ...override,
    plugins: configPlugins.concat(array(source.plugins), array(override.plugins)),
    extends: configExtends.concat(array(source.extends), array(override.extends)),
    rules: {
      ...obj(source.rules),
      ...obj(override.rules),
    },
    // settings: {
    //   ...obj(source.settings),
    //   ...obj(override.settings),
    // }
  };
}

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
 * @param {Array<import('eslint').Linter.ConfigOverride | undefined>} overrides
 * @returns {import('eslint').Linter.Config}
 */
export function configFor(overrides) {
  /** @type{import('eslint').Linter.ConfigOverride[]} */
  let configs = [];

  for (let override of overrides) {
    if (override) configs.push(override);
  }

  return {
    root: true,
    overrides: configs,
  };
}

/**
 *
 * @param {string | string[]} globs
 * @param {import('./types').PartialConfig | undefined} override
 * @returns {import('eslint').Linter.ConfigOverride | undefined}
 */
export function forFiles(globs, override) {
  if (!override) return;

  return {
    ...override,
    files: Array.isArray(globs) ? globs : [globs],
  };
}
