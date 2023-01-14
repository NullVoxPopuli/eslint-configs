---
'@nullvoxpopuli/eslint-configs': patch
---

Rule fixes which affect typescript and ember projects:

in Ember projects, node files will be linted assuming at least Node 16.
(Node 16 is already a requirement to use eslint-configs v3)

in TypeScript projects, the "ban-types" lint has been turned off.
In my experience writing libraries, there are many cases where
"basic type and you just don't care, becausue it doesn't affect intellisense"
is the right choice -- these types include `object` and `Function`,
for example, and should be allowed.
It's true that using different types that are more specific would provide better intellisense,
if they are user facing -- but for non-user-facing types, these types are perfectly fine.
