const path = require('path');

module.exports = function () {
  return {
    host: 'localhost',
    port: 3000,
    open: true,
    hot: true,
    allowedHosts: 'all',
    static: {
      directory: path.resolve(process.cwd(), 'public'),
      publicPath: '/',
    },
    historyApiFallback: true,
    proxy: {
      '/halfmeter-admin': 'http://localhost:8080',
    },
  };
};
