import path from 'path';

import { urlToRequest } from 'loader-utils';
import importsToResolve from 'sass-loader/lib/importsToResolve';

import { getAntDefaultLessPath, getScssThemePath } from './loaderUtils';
import {
  compileThemeVariables,
} from './utils';


/**
 * Utility returning a node-sass importer that provides access to all of antd's theme variables.
 * @param {string} themeScssPath - Path to SCSS file containing Ant Design theme variables.
 * @param {string} contents - The compiled content of the SCSS file at themeScssPath.
 * @returns {function} Importer that provides access to all compiled Ant Design theme variables
 *   when importing the theme file at themeScssPath.
 */
export const themeImporter = (themeScssPath, contents) => (url, previousResolve, done) => {
  const request = urlToRequest(url);
  const pathsToTry = importsToResolve(request);

  const baseDirectory = path.dirname(previousResolve);
  for (let i = 0; i < pathsToTry.length; i += 1) {
    const potentialResolve = pathsToTry[i];
    if (path.resolve(baseDirectory, potentialResolve) === themeScssPath) {
      done({ contents });
      return;
    }
  }
  done();
};

export const getThemeImporter = (options) => {
  const scssThemePath = getScssThemePath(options);
  const antDefaultLessPath = getAntDefaultLessPath(options);

  const contents = compileThemeVariables(scssThemePath, antDefaultLessPath);
  const extraImporter = themeImporter(scssThemePath, contents);
  return extraImporter;
};
