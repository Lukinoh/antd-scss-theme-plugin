'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getThemeImporter = exports.themeImporter = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _loaderUtils = require('loader-utils');

var _importsToResolve = require('sass-loader/lib/importsToResolve');

var _importsToResolve2 = _interopRequireDefault(_importsToResolve);

var _loaderUtils2 = require('./loaderUtils');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Utility returning a node-sass importer that provides access to all of antd's theme variables.
 * @param {string} themeScssPath - Path to SCSS file containing Ant Design theme variables.
 * @param {string} contents - The compiled content of the SCSS file at themeScssPath.
 * @returns {function} Importer that provides access to all compiled Ant Design theme variables
 *   when importing the theme file at themeScssPath.
 */
const themeImporter = exports.themeImporter = (themeScssPath, contents) => (url, previousResolve, done) => {
  const request = (0, _loaderUtils.urlToRequest)(url);
  const pathsToTry = (0, _importsToResolve2.default)(request);

  const baseDirectory = _path2.default.dirname(previousResolve);
  for (let i = 0; i < pathsToTry.length; i += 1) {
    const potentialResolve = pathsToTry[i];
    if (_path2.default.resolve(baseDirectory, potentialResolve) === themeScssPath) {
      _fs2.default.writeFileSync(themeScssPath.replace('.scss', '-generated.scss'), contents, 'utf8');
      done({ contents });
      return;
    }
  }
  done();
};

const getThemeImporter = exports.getThemeImporter = options => {
  const scssThemePath = (0, _loaderUtils2.getScssThemePath)(options);
  const antDefaultThemePath = (0, _loaderUtils2.getAntDefaultThemePath)(options);

  const contents = (0, _utils.compileThemeVariables)(scssThemePath, antDefaultThemePath);
  const extraImporter = themeImporter(scssThemePath, contents);
  return extraImporter;
};