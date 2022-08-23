const path = require('path');

const devMode = true;

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: [
      './assets/js/refactor/main-refactor.js', // file nguồn Webpack làm việc
    ],

  output: {
    filename: 'min.js',                 // tên file xuất ra
    path: path.resolve(__dirname, 'dist'),  // thư mục lưu
    library: 'mylib',                       // tên thư viện (tự đặt)
    libraryTarget: 'var',
  },

  optimization: {
    // We no not want to minimize our code.
    minimize: true
  },
};