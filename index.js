// @ts-check
'use strict';

const { configCreator } = require('./utils');

module.exports = {
  // by using getters here we don't force projects to install
  // dependencies of each of these configs if they are not needed
  configs: {
    get ember() {
      const { ember } = require('./configs/ember');
      const { json } = require('./configs/json');

      let defaultConfig = configCreator(ember, json);

      return () => {
        return {
          plugins: ['ember'],
          extends: ['plugin:ember/recommended'],
          ...defaultConfig(),
        };
      };
    },
    get nodeCJS() {
      const { nodeCJS } = require('./configs/node');
      const { json } = require('./configs/json');

      return configCreator(nodeCJS, json);
    },
    get node() {
      const { nodeESM } = require('./configs/node');
      const { json } = require('./configs/json');

      return configCreator(nodeESM, json);
    },
    get nodeTS() {
      const { nodeESM, nodeMTS } = require('./configs/node');
      const { json } = require('./configs/json');

      return configCreator(nodeESM, nodeMTS, json);
    },
  },
};
