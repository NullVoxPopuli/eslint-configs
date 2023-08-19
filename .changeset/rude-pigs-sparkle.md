---
'@nullvoxpopuli/eslint-configs': patch
---

```js
'@typescript-eslint/prefer-optional-chain': 'off',
```

we typically want this one enabled,
but in a major release of typescript-eslint,
it began to require that tsconfig.json be passed
which, means we need to disable the lint.
in a future release of `@nullvoxpopuli/eslint-configs`,
we can conditionally add the tsconfig-needing lints
if a tsconfig path is passed,
or a local tsconfig.json is present and detected

this capability will align with the upcoming eslint 9
config in the next major of eslint-configs
