'use strict';

const { configs } = require('../index');

describe('configs', () => {
  describe('accessing each of the configs builds a valid ESLint config without error', () => {
    test('ember', () => {
      expect(configs.ember()).toMatchObject({ root: true });
    });

    test('nodeCJS', () => {
      expect(configs.nodeCJS()).toMatchObject({ root: true });
    });

    test('node', () => {
      expect(configs.node()).toMatchObject({ root: true });
    });

    test('nodeTS', () => {
      expect(configs.nodeTS()).toMatchObject({ root: true });
    });
  });
});
