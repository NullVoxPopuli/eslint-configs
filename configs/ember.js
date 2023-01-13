'use strict';

const { merge, hasDep, pipe, configFor, forFiles } = require('./-utils');

/**
 * @param {import('./types').Options} [options]
 * @returns {import('eslint').Linter.Config}
 */
module.exports = (options = {}) => {
  let config = configBuilder(options);

  return configFor([
    // ----------------------
    // Project Files
    forFiles(
      [
        '{src,app,addon,addon-test-support,tests}/**/*.{gjs,js}',
        'tests/dummy/config/deprecation-workflow.js',
        'config/deprecation-workflow.js',
      ],
      config.modules.browser.js
    ),
    forFiles(
      '{src,app,addon,addon-test-support,tests,types}/**/*.{gts,ts}',
      config.modules.browser.ts
    ),
    forFiles('**/*.d.ts', config.modules.browser.declarations),

    // ----------------------
    // Tests
    forFiles('tests/**/*-test.{gjs,js}', config.modules.tests.js),
    forFiles('tests/**/*-test.{gts,ts}', config.modules.tests.ts),

    // ----------------------
    // Config files, usually
    forFiles(
      [
        './*.{cjs,js}',
        './config/**/*.js',
        './lib/*/index.js',
        './server/**/*.js',
        './blueprints/*/index.js',
      ],
      config.commonjs.node.js
    ),
  ]);
};

/**
 * @param {import('./types').Options} [options]
 */
function configBuilder(options = {}) {
  let hasTypeScript = hasDep('typescript');

  let personalPreferences = pipe(
    {},
    (config) => merge(config, require('./base').base),
    (config) => merge(config, require('./rules/decorator-position'))
  );

  if (options.prettierIntegration) {
    personalPreferences = merge(personalPreferences, require('./rules/prettier').resolveRule());
  }

  const babelParser = {
    parser: '@babel/eslint-parser',
    parserOptions: {
      requireConnfigFile: false,
      babelOptions: {
        plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]],
      },
    },
  };

  const configBuilder = {
    modules: {
      browser: {
        get js() {
          return pipe(
            {
              ...babelParser,
              env: {
                browser: true,
              },
            },
            (config) => merge(config, personalPreferences),
            (config) => merge(config, require('./rules/ember'))
          );
        },
        get ts() {
          if (!hasTypeScript) return;

          return pipe(
            {
              env: {
                browser: true,
              },
            },
            (config) => merge(config, personalPreferences),
            (config) => merge(config, require('./rules/ember')),
            (config) => merge(config, require('./rules/typescript'))
          );
        },
        get declarations() {
          if (!hasTypeScript) return;

          return pipe(
            {
              env: {
                browser: true,
              },
            },
            (config) => merge(config, personalPreferences),
            (config) => merge(config, require('./rules/typescript-declarations'))
          );
        },
      },
      tests: {
        get js() {
          let browserJS = configBuilder.modules.browser.js;

          return {
            ...browserJS,
            extends: [...browserJS.extends, 'plugin:qunit/recommended'],
          };
        },
        get ts() {
          if (!hasTypeScript) return;

          let browserTS = configBuilder.modules.browser.ts;

          return {
            ...browserTS,
            extends: [...browserTS.extends, 'plugin:qunit/recommended'],
          };
        },
      },
    },
    commonjs: {
      node: {
        get js() {
          return pipe(
            {
              parserOptions: {
                sourceType: 'script',
                ecmaVersion: 'latest',
              },
              env: {
                browser: false,
                node: true,
                es6: true,
              },
              plugins: ['n'],
              extends: ['plugin:n/recommended'],
            },
            (config) => merge(config, personalPreferences)
          );
        },
      },
    },
  };

  return configBuilder;
}
