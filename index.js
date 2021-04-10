'use strict';

const { ember } = require('./configs/ember');
const { nodeCJS, nodeESModules } = require('./configs/node');
const { json } = require('./configs/json');
const { configCreator } = require('./utils');

module.exports = {
  configs: {
    ember: configCreator(ember, json),
    node: configCreator(nodeCJS, json),
    nodeES: configCreator(nodeESModules, json),
  },
};
