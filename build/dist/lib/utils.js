"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compileThemeVariables = exports.loadScssThemeAsLess = exports.extractLessVariables = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _fs = _interopRequireDefault(require("fs"));

var _less = _interopRequireDefault(require("less"));

var _scssToJson = _interopRequireDefault(require("scss-to-json"));

var _extractVariablesLessPlugin = _interopRequireDefault(require("./extractVariablesLessPlugin"));

/**
 * Return values of compiled Less variables from a compilable entry point.
 * @param {string} lessEntryPath - Root Less file from which to extract variables.
 * @param {Object} variableOverrides - Variable overrides of the form { '@var': 'value' } to use
 *   during compilation.
 * @return {Object} Object of the form { 'variable': 'value' }.
 */
var extractLessVariables = function extractLessVariables(lessEntryPath) {
  var variableOverrides = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var lessEntry = _fs["default"].readFileSync(lessEntryPath, 'utf8');

  var extractedLessVariables = {};

  _less["default"].render(lessEntry, {
    filename: lessEntryPath,
    javascriptEnabled: true,
    modifyVars: variableOverrides,
    plugins: [new _extractVariablesLessPlugin["default"]({
      callback: function callback(variables) {
        extractedLessVariables = variables;
      }
    })],
    syncImport: true
  });

  return extractedLessVariables;
};
/**
 * Read variables from a SCSS theme file into an object with Less-style variable names as keys.
 * @param {string} themeScssPath - Path to SCSS file containing only SCSS variables.
 * @return {Object} Object of the form { '@variable': 'value' }.
 */


exports.extractLessVariables = extractLessVariables;

var loadScssThemeAsLess = function loadScssThemeAsLess(themeScssPath) {
  var rawTheme;

  try {
    rawTheme = (0, _scssToJson["default"])(themeScssPath);
  } catch (error) {
    throw new Error("Could not compile the SCSS theme file \"".concat(themeScssPath, "\" for the purpose of variable ") + 'extraction. This is likely because it contains a Sass error.');
  }

  var theme = {};
  Object.keys(rawTheme).forEach(function (sassVariableName) {
    var lessVariableName = sassVariableName.replace(/^\$/, '@');
    theme[lessVariableName] = rawTheme[sassVariableName];
  });
  return theme;
};
/**
 * Use SCSS theme file to seed a full set of Ant Design's theme variables returned in SCSS.
 * @param {string} themeScssPath - Path to SCSS file containing SCSS variables meaningful to Ant
 *   Design.
 * @return {string} A string representing an SCSS file containing all the theme and color
 *   variables used in Ant Design.
 * @return {string} A string representing a LESS file containing the default theme of
 *   ant to be overridden.
 */


exports.loadScssThemeAsLess = loadScssThemeAsLess;

var compileThemeVariables = function compileThemeVariables(themeScssPath, antDefaultThemePath) {
  var themeEntryPath = require.resolve(antDefaultThemePath);

  var variableOverrides = themeScssPath ? loadScssThemeAsLess(themeScssPath) : {};
  var variables = extractLessVariables(themeEntryPath, variableOverrides);
  return Object.entries(variables).map(function (_ref) {
    var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
        name = _ref2[0],
        value = _ref2[1];

    return "$".concat(name, ": ").concat(value, ";\n");
  }).join('');
};

exports.compileThemeVariables = compileThemeVariables;