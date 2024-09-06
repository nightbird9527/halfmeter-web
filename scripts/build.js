const fs = require('node:fs/promises');
const path = require('node:path');
const chalk = require('chalk');
const webpack = require('webpack');
const webpackConfigFactory = require('../config/webpack.config');

const env = process.env.NODE_ENV;
const webpackConfig = webpackConfigFactory(env);
const compiler = webpack(webpackConfig);
const statsFileName = 'stats.json';
const statsDirectory = webpackConfig.output.path;
const statsPath = path.resolve(statsDirectory, statsFileName);

// 格式化字节数
function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

compiler.run((error, stats) => {
  if (error) return console.error(error);
  stats = stats.toJson({
    chunks: false,
    modules: false,
    children: false,
  });
  // 输出assets信息
  stats.assets.forEach((asset) => {
    const {type, name, size} = asset;
    const typeInfo = chalk.greenBright.bold(type);
    const nameInfo = chalk.cyan.bold(name);
    const sizeInfo = chalk.hex('#3949ab').bold(formatBytes(size));
    const assetInfo = `${typeInfo} ${nameInfo} => ${sizeInfo}`;
    console.log(assetInfo);
  });
  process.stdout.write(`\n${'-'.repeat(process.stdout.columns)} \n`);
  // 输出wornings信息
  fs.writeFile(statsPath, JSON.stringify(stats))
    .then(() => {
      const info1 = `File ${statsFileName} has been generated at ${statsDirectory}.`;
      const info2 = `Check it for more information.\n`;
      console.log(chalk.green.bold(info1));
      console.log(chalk.green.bold(info2));
    })
    .catch((error) => {
      console.error(error);
    });
});
