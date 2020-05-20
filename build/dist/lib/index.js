"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _antdSassLoader = require("./antdSassLoader");

var _sassVarsToLess = _interopRequireDefault(require("./sassVarsToLess"));

var _default = {
  getThemeImporter: _antdSassLoader.getThemeImporter,
  sassVarsToLess: _sassVarsToLess["default"]
};
exports["default"] = _default;