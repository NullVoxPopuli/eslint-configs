'use strict';

const { ember } = require('./configs/ember');
const { nodeCJS, nodeESModules, nodeMTS } = require('./configs/node');
const { json } = require('./configs/json');
const { configCreator } = require('./utils');

module.exports = {
  // by using getters here we don't force projects to install
  // dependencies of each of these configs if they are not needed
  configs: {
    get ember() {
      return configCreator(ember, json);
    },
    get nodeCJS() {
      return configCreator(nodeCJS, json);
    },
    get node() {
      return configCreator(nodeESModules, json);
    },
    get nodeTS() {
      return configCreator(nodeESModules, nodeMTS, json);
    },
  },
};
