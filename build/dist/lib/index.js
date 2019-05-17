'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _antdSassLoader = require('./antdSassLoader');

var _sassVarsToLess = require('./sassVarsToLess');

var _sassVarsToLess2 = _interopRequireDefault(_sassVarsToLess);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  getThemeImporter: _antdSassLoader.getThemeImporter,
  sassVarsToLess: _sassVarsToLess2.default
};
module.exports = exports['default'];