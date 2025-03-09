export const disableTypedLints = {
  forTests: {
    files: ['**/*-test.{ts,gts}', '**/*.test.{ts,gts}'],
    rules: {
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/no-floating-promises': 0,
      '@typescript-eslint/require-await': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-redundant-type-constituents': 0,
      '@typescript-eslint/no-unsafe-enum-comparison': 0,
      '@typescript-eslint/no-unsafe-return': 0,
      '@typescript-eslint/no-unsafe-member-access': 0,
      '@typescript-eslint/no-unsafe-assignment': 0,
      '@typescript-eslint/no-unsafe-argument': 0,
      '@typescript-eslint/no-unsafe-call': 0,
      '@typescript-eslint/no-unused-vars': 0,
      '@typescript-eslint/unbound-method': 0,
      '@typescript-eslint/no-empty-object-types': 0,
    },
  },
};
