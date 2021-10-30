'use strict';

const { cleanDependencies, pluginInfo, configInfo, cleanRules } = require('../utils').__private__;

describe('pluginInfo', () => {
  test('handles invalid input', () => {
    let result = pluginInfo(null, () => false);

    expect(result).toEqual({
      present: [],
      missing: [],
    });
  });

  test('with no plugins, everything is missing', () => {
    let result = pluginInfo({ plugins: ['@typescript-eslint'] }, () => false);

    expect(result).toEqual({
      present: [],
      missing: ['@typescript-eslint'],
    });
  });
});

describe('configInfo', () => {
  test('handles invalid input', () => {
    let result = configInfo(null, () => false);

    expect(result).toEqual({
      present: [],
      missing: [],
    });
  });

  test('with no plugins, everything is missing', () => {
    let result = configInfo({ extends: ['prettier'] }, () => false);

    expect(result).toEqual({
      present: [],
      missing: ['prettier'],
    });
  });
});

describe('cleanRules', () => {
  test('overrides omitted when no extends or rules', () => {
    expect(cleanRules([{}])).toEqual([]);
  });

  test('when no empty set and one sole extending set', () => {
    expect(cleanRules([{}, { extends: 'hi' }])).toEqual([{ extends: 'hi' }]);
  });

  test('no extends, but rules', () => {
    expect(cleanRules([{ rules: { a: 1 } }])).toEqual([{ rules: { a: 1 } }]);
  });

  test('empty rules', () => {
    expect(cleanRules([{ rules: {} }])).toEqual([]);
  });

  test('empty extends', () => {
    expect(cleanRules([{ extends: [] }])).toEqual([]);
  });

  test('string extends', () => {
    expect(cleanRules([{ extends: 'prettier' }])).toEqual([{ extends: 'prettier' }]);
  });

  test('array extends', () => {
    expect(cleanRules([{ extends: ['prettier'] }])).toEqual([{ extends: ['prettier'] }]);
  });
});

describe('cleanDependencies', () => {
  test('with no plugins, no plugin rules are included', () => {
    let result = cleanDependencies(
      [
        {
          plugins: ['@typescript-eslint'],
          rules: {
            '@typescript-eslint/consistent-type-imports': 'error',
          },
        },
      ],
      () => false
    );

    expect(cleanRules(result)).toEqual([]);
  });

  test('only available plugins are included', () => {
    let result = cleanDependencies(
      [
        {
          plugins: ['@typescript-eslint', 'prettier'],
          rules: {
            '@typescript-eslint/consistent-type-imports': 'error',
            'prettier/prettier': 'error',
          },
        },
      ],
      (name) => name.includes('typescript')
    );

    expect(cleanRules(result)).toEqual([
      {
        plugins: ['@typescript-eslint'],
        rules: {
          '@typescript-eslint/consistent-type-imports': 'error',
        },
        extends: [],
      },
    ]);
  });
});
