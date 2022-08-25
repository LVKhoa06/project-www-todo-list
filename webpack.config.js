const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: [
    './assets/js/refactor/main-refactor.js',
  ],

  output: {
    filename: 'mini.js',
    path: path.resolve(__dirname, 'dist'),
  },

  plugins: [
    new MiniCssExtractPlugin({ filename: 'mini.css' }),
    new OptimizeCssAssetsPlugin()
  ],
  
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // extract css into files
          'css-loader'
        ]
      }
    ]
  }
};