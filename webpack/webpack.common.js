const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

const paths = require('./_paths');

module.exports = {
  entry: {
    app: paths.appIndexJs,
  },
  target: 'web',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        IS_BROWSER: true,
      },
    }),
    new LoadablePlugin(),
    new ProgressBarPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: paths.appSrc,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|png|jpg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/',
          }
        }]
      }
    ]
  }
};
