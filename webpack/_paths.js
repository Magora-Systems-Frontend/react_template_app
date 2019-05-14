const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  // src paths
  appSrc: resolveApp('src'), // App source
  appAssets: resolveApp('src/assets'), // For images and other assets
  appHtml: resolveApp('src/index.html'), // html template
  appIndexJs: resolveApp('src/index.js'), // Main entry point
  // build paths
  appBuildServer: resolveApp('build'), // Prod built server files end up here
  appBuild: resolveApp('build/assets'), // Prod built client files end up here
  appBuildAssets: resolveApp('build/assets'), // Prod build copy assets files end up here
};
