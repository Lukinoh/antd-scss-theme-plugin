'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Get path to SCSS theme file specified in loader options or through the plugin's constructor.
 * @param {Object} options - Loader options.
 * @return {string} Path to SCSS theme file.
 */
// eslint-disable-next-line import/prefer-default-export
const getScssThemePath = exports.getScssThemePath = options => {
  if (!options.scssThemePath) {
    throw new Error('Path to an SCSS theme file must be specified through the scssThemePath loader option.');
  }

  return options.scssThemePath;
};

const getAntDefaultThemePath = exports.getAntDefaultThemePath = options => {
  // eslint-disable-next-line max-len
  if (!options.antDefaultThemePath) {
    throw new Error('Path to an LESS default theme file must be specified through the scssThemePath loader option');
  }

  return options.antDefaultThemePath;
};