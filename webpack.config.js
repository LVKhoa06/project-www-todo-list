const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: [
    './assets/js/refactor/main-refactor.js', // file nguồn Webpack làm việc
  ],

  output: {
    filename: '[name].js',                 // tên file xuất ra
    path: path.resolve(__dirname, 'dist'),  // thư mục lưu
  },

  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].css' }),
  ],
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin()],
  },
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