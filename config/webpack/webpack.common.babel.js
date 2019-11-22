const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const paths = require('./paths');
const rules = require('./rules');

const clientDir = path.join(__dirname, '../../client');

module.exports = {
  entry: paths.entryPath,
  module: {
    rules
  },
  resolve: {
    modules: ['client', 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.scss', '.css'],
    alias: {
      reducers: path.join(clientDir, 'reducers'),
      actions: path.join(clientDir, 'actions'),
      components: path.join(clientDir, 'components'),
      pages: path.join(clientDir, 'pages'),
      layouts: path.join(clientDir, 'layouts'),
      constants: path.join(clientDir, 'constants'),
      hooks: path.join(clientDir, 'hooks')
    }
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: paths.templatePath,
      minify: {
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        preserveLineBreaks: true,
        minifyURLs: true,
        removeComments: true,
        removeAttributeQuotes: true
      }
    })
  ]
};
