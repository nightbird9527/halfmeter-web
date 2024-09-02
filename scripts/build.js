require('../config/env');

const chalk = require('chalk');
const webpack = require('webpack');
const webpackConfigFactory = require('../config/webpack.config');

const env = process.env.NODE_ENV;
const webpackConfig = webpackConfigFactory(env);
const compiler = webpack(webpackConfig);

compiler.run((err, stats) => {
  if (!err) {
    // console.log(process.env);
    return console.log(chalk.green.bold('Build Successfully!'));
  }
  console.log(err);
});
