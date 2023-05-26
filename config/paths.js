const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
    appPath: resolveApp('.'),
    dotenv: resolveApp('.env'),
    appHtml: resolveApp('public/index.html'),
}