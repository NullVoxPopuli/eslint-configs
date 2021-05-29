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



**Node**
```js
// .eslintrc.js
'use strict';

const { configs } = require('@nullvoxpopuli/eslint-configs');

// accommodates: JS
module.exports = configs.node();
```

**Node (ES Modules)**
```js
// .eslintrc.js
'use strict';

const { configs } = require('@nullvoxpopuli/eslint-configs');

// accommodates: JS
module.exports = configs.nodeES();
```

**Node (ES Modules in TypeScript)**
```js
// .eslintrc.js
'use strict';

const { configs } = require('@nullvoxpopuli/eslint-configs');

// accommodates: JS, TS
module.exports = configs.nodeESTS();
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
