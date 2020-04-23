const path = require("path");
const webpack = require("webpack");
const merge = require('webpack-merge');
const WriteFilePlugin = require('write-file-webpack-plugin');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: "development",
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, "dist/"),
    port: 3000,
    publicPath: "http://localhost:3000/",
    hotOnly: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new WriteFilePlugin(),
  ],
});
