'use strict';

const { ember } = require('./configs/ember');
const { nodeCJS, nodeESModules, nodeMTS } = require('./configs/node');
const { json } = require('./configs/json');
const { configCreator } = require('./utils');

module.exports = {
  configs: {
    ember: configCreator(ember, json),
    node: configCreator(nodeCJS, json),
    nodeES: configCreator(nodeESModules, json),
    nodeESTS: configCreator(nodeESModules, nodeMTS, json),
  },
};
