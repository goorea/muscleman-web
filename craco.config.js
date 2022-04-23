const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@src': path.resolve(__dirname, 'src/'),
      '@tests': path.resolve(__dirname, 'tests/'),
    },
  },
};
