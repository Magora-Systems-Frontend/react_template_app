const webpackNodeExternals = require('webpack-node-externals');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const paths = require('./_paths');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: './server/index.js',
  output: {
    path: paths.appBuildServer,
    filename: 'server.js',
  },
  plugins: [
    new ProgressBarPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [['dynamic-import-node']],
          },
        },
      },
      {
        test: /\.(sass|css|scss|svg)$/,
        use: 'ignore-loader',
      }
    ],
  },
  externals: [webpackNodeExternals()],
};
