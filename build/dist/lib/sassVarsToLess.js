"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

// This loader will simply replace all $something sass-variable with @something less-variables
function _default(source) {
  return source.replace(/\$/ig, '@');
}