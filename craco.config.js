const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@src': path.resolve(__dirname, 'src/'),
      '@tests': path.resolve(__dirname, 'tests/'),
    },
  },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          webpackConfig.plugins = webpackConfig.plugins.filter(
            plugin => plugin.constructor.name !== 'CaseSensitivePathsPlugin'
          );

          webpackConfig.plugins = webpackConfig.plugins.filter(
            plugin => plugin.constructor.name !== 'IgnorePlugin'
          );

          return webpackConfig;
        },
      }
    }
  ]
};
