// @ts-check
'use strict';

const { ember } = require('./configs/ember');
const { nodeCJS, nodeESM, nodeMTS } = require('./configs/node');
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
      return configCreator(nodeESM, json);
    },
    get nodeTS() {
      return configCreator(nodeESM, nodeMTS, json);
    },
  },
};
