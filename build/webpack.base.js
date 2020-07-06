const path = require('path');
const librayName = 'element-ui-form';

module.exports = {
  entry: {
    lib: './src/main.js',
  },
  output: {
    filename: `${librayName}.js`,
    path: path.resolve(__dirname, '../lib'),
    library: librayName,
    libraryTarget: 'umd'
  },
  externals: {
    vue: 'vue',
    'element-ui': 'element-ui'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [{
      test: /\.(js|jsx)/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  }
}