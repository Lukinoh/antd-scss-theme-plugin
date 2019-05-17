'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class AntdScssThemePlugin {

  constructor(scssThemePath, antDefaultLessPath) {
    AntdScssThemePlugin.SCSS_THEME_PATH = scssThemePath;
    AntdScssThemePlugin.ANT_DEFAULT_LESS_PATH = antDefaultLessPath;
  }

  /**
   * Explicitly add the SCSS theme file to file dependencies.
   * @param {Object} compiler - A webpack compiler.
   * @return {undefined}
   */
  apply(compiler) {
    const afterEmit = (compilation, callback) => {
      // Watch the theme file for changes.
      const theme = AntdScssThemePlugin.SCSS_THEME_PATH;
      if (theme) {
        if (Array.isArray(compilation.fileDependencies) && !compilation.fileDependencies.includes(theme)) {
          compilation.fileDependencies.push(theme);
        } else if (compilation.fileDependencies instanceof Set && !compilation.fileDependencies.has(theme)) {
          compilation.fileDependencies.add(theme);
        }
      }
      callback();
    };

    const plugin = { name: 'AntdScssThemePlugin' };
    compiler.hooks.afterEmit.tapAsync(plugin, afterEmit);
  }
}

exports.default = AntdScssThemePlugin;
module.exports = exports['default'];