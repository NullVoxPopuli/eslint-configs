/**
 * @type {import('#types').PartialConfig}
 */
export const rule = {
  name: 'nvp:typescript',
  rules: {
    // this isn't C#
    '@typescript-eslint/interface-name-prefix': 'off',

    // Having an empty interface is plausable when iterating on types,
    // extending from an existing type and "planning" to update.
    '@typescript-eslint/no-empty-interface': 'off',

    // type imports are removed in builds
    '@typescript-eslint/consistent-type-imports': 'error',

    // prefer inference, but it is recommended to declare
    // return types around public API
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // Unless a type actively harms the intellisense experience,
    // it's not worth banning types. Sure other types could provide
    // better intellisense experiences, but it doesn't mean that
    // using 'object' for example, or 'Function' is inherently bad.
    '@typescript-eslint/ban-types': 'off',

    // we typically want this one enabled,
    // but in a major release of typescript-eslint,
    // it began to require that tsconfig.json be passed
    // which, means we need to disable the lint.
    // in a future release of `@nullvoxpopuli/eslint-configs`,
    // we can conditionally add the tsconfig-needing lints
    // if a tsconfig path is passed,
    // or a local tsconfig.json is present and detected
    //
    // this capabilitiy will align with the upcoming eslint 9
    // config in the next major of eslint-configs
    '@typescript-eslint/prefer-optional-chain': 'off',

    // Maximum strictness
    '@typescript-eslint/no-non-null-assertion': 'error',

    // Allows placeholder args to still be defined for
    // documentation or "for later" purposes
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
};
