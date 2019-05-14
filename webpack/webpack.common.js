const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const paths = require('./_paths');

module.exports = {
  entry: {
    app: paths.appIndexJs,
  },
  plugins: [
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
  },
  // resolve: {
  //   extensions: ['.js', '.jsx', '.css'],
  //   plugins: [
  //     new DirectoryNamedWebpackPlugin({
  //       honorIndex: true,
  //       exclude: /node_modules/,
  //       transformFn(dirName) {
  //         return [dirName, dirName.toLowerCase()];
  //       }
  //     }),
  //     require('autoprefixer')
  //   ]
  // }
};
