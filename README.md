# ESLint Configs

ESLint has grown complicated for projects with variance:
 - JavaScript or TypeScript
 - Node or Browser
 - App or Library
 - etc

This project aims to simplify both configuring and overriding ESLint configs.

## Install

```bash
yarn add --dev @nullvoxpopuli/eslint-configs
```

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

## Why use overrides for everything?

With traditional ESLint configs, you end up having cascading rules, where plugins, extends all get piled on top of each other.
By having no base config, and _only_ targeting files matching patterns, we can have much more control over what lint rules
we work with, and avoid the problem of disabling rules for specific files in too many places.
