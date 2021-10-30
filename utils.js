// @ts-check
'use strict';

/**
 * @typedef {import('eslint').Linter.Config} Config;
 * @typedef {import('eslint').Linter.ConfigOverride} Override;
 *
 */

/**
 * @param {...Override[]} overrides
 * @returns {() => Config}
 */
function configCreator(...overrides) {
  return () => createConfig(...overrides);
}

/**
 * The return value from here is passed off to ESLint, so if there are any plugins
 * configured or `extends` specified that come from libraries that are not installed,
 * we need to remove those so ESLint doesn't have conniptions.
 *
 * @param {...(Override)[]} overrides
 * @returns {Config}
 */
function createConfig(...overrides) {
  let cleanedOverrides = cleanDependencies([...overrides.flat()]);
  let cleanedRules = cleanRules(cleanedOverrides);

  return {
    root: true,
    overrides: cleanedRules,
  };
}

module.exports = {
  configCreator,
  createConfig,
  __private__: {
    cleanDependencies,
    pluginInfo,
    configInfo,
    cleanRules,
  },
};

const MAP = {
  parsers: {},
  plugins: {
    '@typescript-eslint': '@typescript-eslint/eslint-plugin',
    'simple-import-sort': 'eslint-plugin-simple-import-sort',
    qunit: 'eslint-plugin-qunit',
    prettier: 'eslint-plugin-prettier',
    node: 'eslint-plugin-node',
    json: 'eslint-plugin-json',
    import: 'eslint-plugin-import',
    'decorator-position': 'eslint-plugin-decorator-position',
    ember: 'eslint-plugin-ember',
  },
  extends: {
    'plugin:@typescript-eslint/recommended': '@typescript-eslint/eslint-plugin',
    'plugin:ember/*': 'eslint-plugin-ember',
    'plugin:decorator-position/*': 'eslint-plugin-decorator-position',
    'plugin:@typescript-eslint/*': '@typescript-eslint/eslint-plugin',
    'plugin:json/*': 'eslint-plugin-json',
    prettier: 'eslint-config-prettier',
  },
};

/**
 * @param {Override} override;
 *
 * @returns {{ present: string[], missing: string[] }}
 */
function pluginInfo(override, dangerHas = require) {
  let plugins = override?.plugins || [];
  let present = plugins.filter((plugin) => {
    let depName = MAP.plugins[plugin];

    try {
      return dangerHas(depName);
    } catch {
      return false;
    }
  });

  let missing = plugins.filter((plugin) => !present.includes(plugin));

  return {
    present,
    missing,
  };
}

/**
 * @param {Override} override;
 *
 * @returns {{ present: string[], missing: string[] }}
 */
function configInfo(override, dangerHas = require) {
  let _extends = override?.extends || [];
  let configs = Array.isArray(_extends) ? _extends : [_extends];

  let present = configs.filter((config) => {
    let depName;

    let keys = Object.keys(MAP.extends);

    for (let key of keys) {
      let [configName] = key.split('/');

      if (config.startsWith(configName)) {
        depName = MAP.extends[key];

        break;
      }
    }

    if (!depName) {
      return true;
    }

    try {
      return dangerHas(depName);
    } catch {
      return false;
    }
  });

  let missing = configs.filter((name) => !present.includes(name));

  return {
    present,
    missing,
  };
}

/**
 * @param {Override[]} overrides;
 *
 * @returns {Override[]}
 */
function cleanDependencies(overrides = [], dangerHas = require) {
  return (overrides || []).map((overrideConfig) => {
    let overriddenRules = overrideConfig.rules || {};

    let info = {
      plugins: pluginInfo(overrideConfig, dangerHas),
      configs: configInfo(overrideConfig, dangerHas),
    };

    let rules = Object.entries(overriddenRules).reduce((result, current) => {
      let [rule, value] = current;
      let isRemoved = false;

      for (let plugin of info.plugins.missing) {
        if (rule.startsWith(plugin)) {
          isRemoved = true;
        }
      }

      if (isRemoved) {
        return result;
      }

      result[rule] = value;

      return result;
    }, {});

    return {
      ...overrideConfig,
      plugins: info.plugins.present,
      extends: info.configs.present,
      rules,
    };
  });
}

/**
 * Removes override entries with no rules (and no extends)
 *
 * @param {Override[]} overrides;
 *
 * @returns {Override[]}
 */
function cleanRules(overrides) {
  return overrides.filter((override) => {
    let { rules, extends: configs } = override;
    let result = Object.keys(rules || {}).length > 0 || configs?.length > 0;

    return result;
  });
}
