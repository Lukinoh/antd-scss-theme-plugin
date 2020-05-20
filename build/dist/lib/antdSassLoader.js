"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getThemeImporter = exports.themeImporter = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _loaderUtils = require("loader-utils");

var _importsToResolve = _interopRequireDefault(require("sass-loader/dist/importsToResolve"));

var _loaderUtils2 = require("./loaderUtils");

var _utils = require("./utils");

/**
 * Utility returning a node-sass importer that provides access to all of antd's theme variables.
 * @param {string} themeScssPath - Path to SCSS file containing Ant Design theme variables.
 * @param {string} contents - The compiled content of the SCSS file at themeScssPath.
 * @returns {function} Importer that provides access to all compiled Ant Design theme variables
 *   when importing the theme file at themeScssPath.
 */
var themeImporter = function themeImporter(themeScssPath, contents) {
  return function (url, previousResolve, done) {
    var request = (0, _loaderUtils.urlToRequest)(url);
    var pathsToTry = (0, _importsToResolve["default"])(request);

    var baseDirectory = _path["default"].dirname(previousResolve);

    for (var i = 0; i < pathsToTry.length; i += 1) {
      var potentialResolve = pathsToTry[i];

      if (_path["default"].resolve(baseDirectory, potentialResolve) === themeScssPath) {
        _fs["default"].writeFileSync(themeScssPath.replace('.scss', '-generated.scss'), contents, 'utf8');

        done({
          contents: contents
        });
        return;
      }
    }

    done();
  };
};

exports.themeImporter = themeImporter;

var getThemeImporter = function getThemeImporter(options) {
  var scssThemePath = (0, _loaderUtils2.getScssThemePath)(options);
  var antDefaultThemePath = (0, _loaderUtils2.getAntDefaultThemePath)(options);
  var contents = (0, _utils.compileThemeVariables)(scssThemePath, antDefaultThemePath);
  var extraImporter = themeImporter(scssThemePath, contents);
  return extraImporter;
};

exports.getThemeImporter = getThemeImporter;