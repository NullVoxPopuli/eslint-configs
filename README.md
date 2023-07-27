# ESLint Configs

[![npm version](https://badge.fury.io/js/%40nullvoxpopuli%2Feslint-configs.svg)](https://badge.fury.io/js/%40nullvoxpopuli%2Feslint-configs)

ESLint has grown complicated for projects with variance:
 - JavaScript or TypeScript
 - Node or Browser
 - App or Library
 - Cross-Platform
 - etc

This project aims to simplify both configuring and overriding ESLint configs.

## Install

```bash
yarn add --dev @nullvoxpopuli/eslint-configs
# or
npm install --save-dev @nullvoxpopuli/eslint-configs
# or 
pnpm add --save-dev @nullvoxpopuli/eslint-configs
```

Note that only ESLint's new (v9) config format is supported.

So the config file name should be `eslint.config.js` (or `cjs` or `mjs`, depending on which style of config you want to use).

This package is _ESM_ only, but the new ESLint config format supports receiving a promise that returns a config, so we can `await import` ESM from within the a CJS file. 

## Upgrading across major version boundaries

This goes for major bumps of this package, and any plugin within.

You'll want to use [eslint-formatter-todo](https://github.com/lint-todo/eslint-formatter-todo),
so that when you encounter new rules, or a plugin changes the defaults, you can _mark them as "TODO"_.
This is effectively _temporarily_ turning errors into warnings,
but it allows you to incrementally adopt big changes to your lint configs over time.

This is _especially_ useful on large codebases, and when lint rules don't come with auto-fixers.

I'd recommend updating your `lint:js` script in `package.json` to:
```js
"scripts": {
  "lint:js": "eslint . --format @lint-todo/eslint-formatter-todo"
}
```

See the [Usage](https://github.com/lint-todo/eslint-formatter-todo#usage) section of eslint-formatter-todo for details.

## Usage

**Ember**

```js
// eslint.config.js 
import { configs } from '@nullvoxpopuli/eslint-configs';

// accommodates: JS, TS, App, Addon, and V2 Addon
export default configs.ember();
```

<details><summary>ESM Configuration</summary>

_overriding_
```js
// eslint.config.js 
import { configs } from '@nullvoxpopuli/eslint-configs';

const config = await configs.ember();

export default [
    ...config,
    // your modifications here
    // see: https://eslint.org/docs/user-guide/configuring/configuration-files#how-do-overrides-work
];
```

_overriding prettier configuration example_
```js
// eslint.config.js 
import { configs } from '@nullvoxpopuli/eslint-configs';

const config = await configs.ember();

export default [
    ...config,
    {
        files: ['**/*.js', '**/*.ts'],
        rules: {
            'prettier/prettier': ['error', { singleQuote: true, printWidth: 120, trailingComma: 'all' }],
        },
    },
]
```



</details>

<details><summary>In CJS</summary>

```js
// eslint.config.js 
'use strict';

const { configs } = require('@nullvoxpopuli/eslint-configs');

// accommodates: JS, TS, App, Addon, and V2 Addon
module.exports = configs.ember();
```

_overriding_
```js
// eslint.config.js 
'use strict';

const { configs } = require('@nullvoxpopuli/eslint-configs');

module.exports = (async () => {
  const config = await configs.ember();

    return [
        ...config,
        // your modifications here
        // see: https://eslint.org/docs/user-guide/configuring/configuration-files#how-do-overrides-work
    ];
})()
```

_overriding prettier configuration example_
```js
// .eslintrc.js
'use strict';

const { configs } = require('@nullvoxpopuli/eslint-configs');
const config = configs.ember();

module.exports = {
  ...config,
  overrides: [
    ...config.overrides,
    {
      files: ['**/*.js', '**/*.ts'],
      rules: {
        'prettier/prettier': ['error', { singleQuote: true, printWidth: 120, trailingComma: 'all' }],
      },
    },
  ]
}
```

</details>

**Cross-Platform**

This config is ESM, as ESM is the most widely supported module format across different distributions (browser, node, etc).

```js 
// .eslintrc.cjs
'use strict';

const { configs } = require('@nullvoxpopuli/eslint-configs');

// accommodates: JS, TS, ESM, and CJS
module.exports = configs.crossPlatform();
```

**Node**

This config looks at your package.json to determine if your project is CommonJS or ES Modules.
```js
// .eslintrc.js
'use strict';

const { configs } = require('@nullvoxpopuli/eslint-configs');

// accommodates: JS, TS, ESM, and CJS
module.exports = configs.node();
```

_overriding_
```js
// .eslintrc.js
'use strict';

const { configs } = require('@nullvoxpopuli/eslint-configs');
const config = configs.node();

module.exports = {
  ...config,
  overrides: [
    ...config.overrides,
    // your modifications here
    // see: https://eslint.org/docs/user-guide/configuring/configuration-files#how-do-overrides-work
  ]
}
```

**Configure babel parser of js files**

*.js files are now parsed with @babel/eslint-parser. Config file if disabled by default by eslint-configs.

```js
// .eslintrc.js
'use strict';

const { configs } = require('@nullvoxpopuli/eslint-configs');
const config = configs.node();

module.exports = {
  ...config,
  overrides: [
    ...config.overrides,
    {
      files: ['**/*.js'],
      parserOptions: {
        // Enable babel config file
        requireConfigFile: true,
      },
    },
  ]
}
```

```js
// .babelrc.js

// This is the babel config file
```

**Configure eslint prettier integration**

This is disabled by default, but if you wish to include prettier errors in eslint, you may add the setting:
```js
const { configs } = require('@nullvoxpopuli/eslint-configs');

const config = configs.node({ prettierIntegration: true });
```

All configs on the `configs` object support this.


## Gaining additional lints with 0 config

This lint config meta package is setup to lazily detect which plugins and configurations you have installed and automatically add them to your lint config.

This has the following benefits:
 - No need to install dependencies you don't use (typescript, for example)
 - No need to force prettier on your projects if you don't have it installed
 - Progressive enhancement as you decide you want more behaviors / lints
 - Minimal impact to node_modules so that local dev and C.I. are not unnecessarily hit with extra dependencies

## Debugging

To see what the resolved config looks like for a file
```bash
node_modules/.bin/eslint --print-config path/to/file
```

## Why use overrides for everything?

With traditional ESLint configs, you end up having cascading rules, where plugins, extends all get piled on top of each other.
By having no base config, and _only_ targeting files matching patterns, we can have much more control over what lint rules
we work with, and avoid the problem of disabling rules for specific files in too many places.

## Why is prettier bundlede in here?

I want a decent formatter, and since there is an integration with ESLint, it makes
my life setting up apps, addons, libraries, etc much easier.
One less thing to think about and make sure is configured correctly.
