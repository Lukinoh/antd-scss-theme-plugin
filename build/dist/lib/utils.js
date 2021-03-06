'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compileThemeVariables = exports.loadScssThemeAsLess = exports.extractLessVariables = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _less = require('less');

var _less2 = _interopRequireDefault(_less);

var _scssToJson = require('scss-to-json');

var _scssToJson2 = _interopRequireDefault(_scssToJson);

var _extractVariablesLessPlugin = require('./extractVariablesLessPlugin');

var _extractVariablesLessPlugin2 = _interopRequireDefault(_extractVariablesLessPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Return values of compiled Less variables from a compilable entry point.
 * @param {string} lessEntryPath - Root Less file from which to extract variables.
 * @param {Object} variableOverrides - Variable overrides of the form { '@var': 'value' } to use
 *   during compilation.
 * @return {Object} Object of the form { 'variable': 'value' }.
 */
const extractLessVariables = exports.extractLessVariables = (lessEntryPath, variableOverrides = {}) => {
  const lessEntry = _fs2.default.readFileSync(lessEntryPath, 'utf8');
  let extractedLessVariables = {};
  _less2.default.render(lessEntry, {
    filename: lessEntryPath,
    javascriptEnabled: true,
    modifyVars: variableOverrides,
    plugins: [new _extractVariablesLessPlugin2.default({
      callback: variables => {
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
const loadScssThemeAsLess = exports.loadScssThemeAsLess = themeScssPath => {
  let rawTheme;
  try {
    rawTheme = (0, _scssToJson2.default)(themeScssPath);
  } catch (error) {
    throw new Error(`Could not compile the SCSS theme file "${themeScssPath}" for the purpose of variable ` + 'extraction. This is likely because it contains a Sass error.');
  }
  const theme = {};
  Object.keys(rawTheme).forEach(sassVariableName => {
    const lessVariableName = sassVariableName.replace(/^\$/, '@');
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
const compileThemeVariables = exports.compileThemeVariables = (themeScssPath, antDefaultThemePath) => {
  const themeEntryPath = require.resolve(antDefaultThemePath);
  const variableOverrides = themeScssPath ? loadScssThemeAsLess(themeScssPath) : {};

  const variables = extractLessVariables(themeEntryPath, variableOverrides);
  return Object.entries(variables).map(([name, value]) => `$${name}: ${value};\n`).join('');
};