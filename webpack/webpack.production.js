const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// css plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// bundle analyze
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const paths = require('./_paths');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name]-[chunkhash:8].js',
    path: paths.appBuild,
    publicPath: './assets/',
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: paths.appAssets, to: paths.appBuildAssets },
    ]),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      excludeChunks: ['app'],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        useShortDoctype: true,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new BundleAnalyzerPlugin(),
  ],

  optimization: {
    minimizer: [
      new TerserPlugin({ test: /\.js(\?.*)?$/i }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },

  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                path.resolve('../node_modules/bootstrap/scss/mixins')
              ]
            }
          }
        ]
      },
    ],
  },
});
