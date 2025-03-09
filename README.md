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

And due to how ESLint resolves plugins,
you'll need to ensure that all the dependencies of `@nullvoxpopuli/eslint-configs` are installed in the root `node_modules` directory.

This is easier with either yarn workspaces or npm. Standalone yarn with non-monorepos nests `node_modules` which confuses eslint.

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
export default configs.ember(import.meta.dirname);
```

_overriding_
```js
// eslint.config.js  
import { configs } from '@nullvoxpopuli/eslint-configs';

const config = configs.ember(import.meta.dirname);

export default [
    ...config,
    // your modifications here
    // see: https://eslint.org/docs/user-guide/configuring/configuration-files#how-do-overrides-work
];
```

**Cross-Platform**

This config is ESM, as ESM is the most widely supported module format across different distributions (browser, node, etc).

```js 
// eslint.config.js  
import { configs } from '@nullvoxpopuli/eslint-configs';

export default configs.crossPlatform(import.meta.dirname);
```

**Node**

This config looks at your package.json to determine if your project is CommonJS or ES Modules.
```js
// eslint.config.js  
import { configs } from '@nullvoxpopuli/eslint-configs';

export default configs.node(import.meta.dirname);
```

_overriding_
```js
// eslint.config.js 
import { configs } from '@nullvoxpopuli/eslint-configs';

const config = configs.node();

export default [
    ...config,
    // your modifications here
    // see: https://eslint.org/docs/user-guide/configuring/configuration-files#how-do-overrides-work
]
```


### Disabling type-aware linting

```js
import { disableTypedLints } from '@nullvoxpopuli/eslint-configs';

export default [
    // ...
    disableTypedLints.forTests,
];
```
