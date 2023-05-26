const path = require('path');
const paths = require('./paths');

module.exports = function () {
    return {
        allowedHosts: 'all',
        port: 3001,
        open: true,
        hot: true,
        static: {
            directory: path.resolve(paths.appPath, './public'),
            publicPath: '/'
        },
    }
}