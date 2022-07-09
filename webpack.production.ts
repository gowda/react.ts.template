import merge from 'webpack-merge';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import common from './webpack.common';

const config: Configuration = merge(common, {
  mode: 'production',
  plugins: [new HtmlWebpackPlugin({ template: 'src/index.production.ejs' })],
});

export default config;
