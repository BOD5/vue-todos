const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const PATHS = require('./paths');

const devWebpackConfig = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    static: {
      directory: `${PATHS.DIST}`,
    },
    open: true,
    compress: true,
    port: 8080,
  },
});

module.exports = new Promise((res, rej) => {
  res(devWebpackConfig);
});
