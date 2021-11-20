const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const buildWebpackConfig = merge(common, {
  mode: 'production',
});

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig);
});
