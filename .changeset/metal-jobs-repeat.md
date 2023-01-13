---
"@nullvoxpopuli/eslint-configs": minor
---

Formally support the `.*gjs` and `*.gts` file formats in ember projects.

The same config you've used before, now supports gjs and gts:

```js
const { configs } = require("@nullvoxpopuli/eslint-configs");

module.exports = configs.ember();
```

Adding support for gjs and gts is what initially prompted the breaking change to
change the default of having prettierIntegration turned off -- because in order for
prettier to parse gjs / gts, we use this plugin: https://github.com/gitKrystan/prettier-plugin-ember-template-tag
But that plugin is incompatible with eslint-plugin-prettier.
