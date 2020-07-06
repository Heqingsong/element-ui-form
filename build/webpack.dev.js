const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base');

module.exports = merge(base, {
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, '../lib'),
    compress: true,
    port: 8081
  }
});