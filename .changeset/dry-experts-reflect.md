---
"@nullvoxpopuli/eslint-configs": minor
---

Automatically support `@babel/eslint-parser`, when applicable in ember projects.

Typically, [`@babel/eslint-parser`](https://www.npmjs.com/package/@babel/eslint-parser)
requires that you either have a babel config co-located to your eslint config,
or disable requiring a config file entirely.

This change, allowing for linting ember projects with this parser,
manually configures the known-to-be-used syntax in Ember projects.
Which, is the old style of decorator (while we wait for the Spec-decorator to ship)
