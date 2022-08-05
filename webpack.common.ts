import * as path from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import { Configuration } from 'webpack';

const config: Configuration = {
  entry: {
    js: './src/index.tsx',
    css: './styles/index.scss',
  },
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
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'style-loader', // inject CSS to page
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS modules
          },
          {
            loader: 'postcss-loader', // Run post css actions
            options: {
              postcssOptions: {
                plugins: function () {
                  // post css plugins, can be exported to postcss.config.js
                  return [require('precss'), require('autoprefixer')];
                },
              },
            },
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
          },
        ],
      },
    ],
  },
  resolve: { extensions: ['.ts', '.tsx', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: ({ chunk }) => {
      return chunk?.name === 'js' ? 'bundle.js' : 'css/styles.css';
    },
  },
  plugins: [
    new CopyPlugin({
      patterns: [
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
