# ESLint Configs

[![npm version](https://badge.fury.io/js/%40nullvoxpopuli%2Feslint-configs.svg)](https://badge.fury.io/js/%40nullvoxpopuli%2Feslint-configs)

ESLint has grown complicated for projects with variance:
 - JavaScript or TypeScript
 - Node or Browser
 - App or Library
 - etc

This project aims to simplify both configuring and overriding ESLint configs.

## Install

```bash
yarn add --dev @nullvoxpopuli/eslint-configs
# or
npm install --save-dev @nullvoxpopuli/eslint-configs
```

And due to how ESLint resolves plugins,
you'll need to ensure that all the dependencies of `@nullvoxpopuli/eslint-configs` are installed in the root `node_modules` directory.

This is easier with either yarn workspaces or npm. Standalone yarn with non-monorepos nests `node_modules` which confuses eslint.

## Usage

**Ember**
```js
// .eslintrc.js
'use strict';

const { configs } = require('@nullvoxpopuli/eslint-configs');

// accommodates: JS, TS, App, and Addon
module.exports = configs.ember();
```

_overriding_
```js
// .eslintrc.js
'use strict';

const { configs } = require('@nullvoxpopuli/eslint-configs');
const config = configs.ember();

module.exports = {
  ...config,
  overrides: [
    ...config.overrides,
    // your modifications here
    // see: https://eslint.org/docs/user-guide/configuring/configuration-files#how-do-overrides-work
  ]
}
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

**Node**

This config is native ES Modules, and cjs is allowed via files with the *.cjs extension.
```js
// .eslintrc.js
'use strict';

const { configs } = require('@nullvoxpopuli/eslint-configs');

// accommodates: JS
module.exports = configs.node();
```

**Node (CJS as defaultl)**

This config is for when *.js is cjs, and ES Modules are used via the *.mjs extension.
```js
// .eslintrc.js
'use strict';

const { configs } = require('@nullvoxpopuli/eslint-configs');

// accommodates: JS
module.exports = configs.nodeCJS();
```

**Node (ES Modules in TypeScript)**
```js
// .eslintrc.js
'use strict';

const { configs } = require('@nullvoxpopuli/eslint-configs');

// accommodates: JS, TS
module.exports = configs.nodeTS();
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
