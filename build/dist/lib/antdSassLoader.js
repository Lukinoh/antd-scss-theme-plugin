'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getThemeImporter = exports.themeImporter = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _loaderUtils = require('loader-utils');

var _importsToResolve = require('sass-loader/lib/importsToResolve');

var _importsToResolve2 = _interopRequireDefault(_importsToResolve);

var _loaderUtils2 = require('./loaderUtils');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
      done({ contents });
      return;
    }
  }
  done();
};

const getThemeImporter = exports.getThemeImporter = (() => {
  var _ref = _asyncToGenerator(function* (options) {
    const scssThemePath = (0, _loaderUtils2.getScssThemePath)(options);
    const antDefaultLessPath = (0, _loaderUtils2.getAntDefaultLessPath)(options);

    const contents = yield (0, _utils.compileThemeVariables)(scssThemePath, antDefaultLessPath);
    const extraImporter = themeImporter(scssThemePath, contents);
    return extraImporter;
  });

  return function getThemeImporter(_x) {
    return _ref.apply(this, arguments);
  };
})();