import * as path from 'path';
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
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-query': 'ReactQuery',
  },
};

export default config;
