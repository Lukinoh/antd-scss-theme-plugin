import path from 'path';

import sass from 'node-sass';

import {
  themeImporter,
} from '../src/antdSassLoader';
import { compileThemeVariables } from '../src/utils';


describe('themeImporter', () => {
  it('produces an importer that allows importing compiled antd variables', async (done) => {
    const themePath = path.resolve(__dirname, 'data/theme.scss');
    const antDefaultThemePath = path.resolve(__dirname, '../node_modules/antd/lib/style/themes/default.less');
    const contents = await compileThemeVariables(themePath, antDefaultThemePath);
    sass.render({
      file: path.resolve(__dirname, 'data/test.scss'),
      importer: themeImporter(themePath, contents),
    }, (error, result) => {
      const compiledColor = result.css.toString().match(/background: (.*);/)[1];
      expect(compiledColor).toBe('#faad14');
      done();
    });
  });
});
