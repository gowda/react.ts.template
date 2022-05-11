import * as path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { Configuration } from 'webpack';

const config: Configuration = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
  resolve: { extensions: ['.ts', '.tsx', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: process.env.NODE_ENV === 'test' ? '' : '/',
    filename: 'bundle.js',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'styles/**/*.css', to: 'css/[name][ext]' },
        {
          from: 'node_modules/todomvc-common/*.css',
          to: 'css/todomvc-common/[name][ext]',
        },
        {
          from: 'node_modules/todomvc-app-css/*.css',
          to: 'css/todomvc-app-css/[name][ext]',
        },
      ],
    }),
    new HtmlWebpackPlugin({ template: 'src/index.ejs' }),
  ],
};

export default config;
