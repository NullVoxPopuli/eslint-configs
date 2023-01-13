---
"@nullvoxpopuli/eslint-configs": major
---

prettier integration with all exported configs is now off by default.

To get the old behavior back, pass `prettierIntegration: true` in the
config object to each config helper.

```js
const { configs } = require("@nullvoxpopuli/eslint-configs");

module.exports = configs.ember({ prettierIntegration: true });
```

or

```js
const { configs } = require("@nullvoxpopuli/eslint-configs");

module.exports = configs.node({ prettierIntegration: true });
```

By default, either of these will read your local .prettierrc\* config files
(using the same tool prettier uses, cosmiconfig)
