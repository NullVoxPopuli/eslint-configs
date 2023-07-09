import { describe, expect, test } from 'vitest';

import { configs } from '../index.js';
import { findRule } from './-helpers.js';

describe('configs', () => {
  describe('accessing each of the configs builds a valid ESLint config without error', () => {
    test('ember', () => {
      expect(configs.ember()).toMatchObject({ root: true });
    });

    test('nodeCJS', () => {
      expect(configs.nodeCJS()).toMatchObject({ root: true });
    });

    test('nodeESM', () => {
      expect(configs.nodeESM()).toMatchObject({ root: true });
    });
  });
});

describe('with settings', () => {
  describe('defaults', () => {
    test('ember', () => {
      let matches = findRule(configs.ember(), 'prettier/prettier');

      expect(matches).toHaveLength(0);
    });

    test('nodeESM', () => {
      let matches = findRule(configs.nodeESM(), 'prettier/prettier');

      expect(matches).toHaveLength(0);
    });

    test('nodeCJS', () => {
      let matches = findRule(configs.nodeCJS(), 'prettier/prettier');

      expect(matches).toHaveLength(0);
    });
  });

  describe('prettierIntegration', () => {
    test('ember', () => {
      let matches = findRule(
        configs.ember({
          prettierIntegration: true,
        }),
        'prettier/prettier'
      );

      expect(matches).toHaveLength(8);
    });

    test('nodeESM', () => {
      let matches = findRule(
        configs.nodeESM({
          prettierIntegration: true,
        }),
        'prettier/prettier'
      );

      expect(matches).toHaveLength(4);
    });

    test('nodeCJS', () => {
      let matches = findRule(
        configs.nodeCJS({
          prettierIntegration: true,
        }),
        'prettier/prettier'
      );

      expect(matches).toHaveLength(4);
    });
  });
});
