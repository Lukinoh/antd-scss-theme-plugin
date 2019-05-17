'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (source) {
  return source.replace(/\$/ig, '@');
};

module.exports = exports['default']; // This loader will simply replace all $something sass-variable with @something less-variables