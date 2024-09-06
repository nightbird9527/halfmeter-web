const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfigFactory = require('../config/webpack.config');
const devServerConfigFactory = require('../config/devServer.config');

const env = process.env.NODE_ENV;
const webpackConfig = webpackConfigFactory(env);
const compiler = webpack(webpackConfig);
const devServerConfig = devServerConfigFactory();
const server = new WebpackDevServer(devServerConfig, compiler);

const runServer = () => {
  console.log(chalk.cyan('Starting the development server...'));
  server.startCallback(() => {
    console.log(chalk.cyan(`Development server is running at localhost:${devServerConfig.port}`));
  });
};

runServer();
