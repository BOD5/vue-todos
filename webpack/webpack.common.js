const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const PATHS = require('./paths');

module.exports = {
  entry: ['@babel/polyfill', `${PATHS.SRC}/index.js`],
  output: {
    path: `${PATHS.DIST}`,
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(vue)$/,
        use: ['vue-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.PUBLICK}/index.html`,
      filename: 'index.html',
    }),
    new VueLoaderPlugin(),
  ],
};
