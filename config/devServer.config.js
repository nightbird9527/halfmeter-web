const path = require('path');

module.exports = function () {
  return {
    allowedHosts: 'all',
    port: 3000,
    open: true,
    hot: true,
    static: {
      directory: path.resolve(process.cwd(), './public'),
      publicPath: '/admin',
    },
    historyApiFallback: {
      rewrites: [
        {from: /\//, to: '/admin/index.html'},
        {from: /^\/admin\/?$/, to: '/admin/index.html'},
        {from: /^\/admin\/.*/, to: '/admin/index.html'},
      ],
    },
    proxy: {
      '/halfmeter-admin': 'http://localhost:8080',
    },
  };
};
