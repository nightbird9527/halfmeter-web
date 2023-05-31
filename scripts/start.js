const chalk = require('chalk');
const webpack = require('webpack');
const webpackConfigFactory = require('../config/webpack.config');
const WebpackDevServer = require('webpack-dev-server');
const devServerConfigFactory = require('../config/webpackDevServer.config');

const env = process.env.NODE_ENV;
const webpackConfig = webpackConfigFactory(env);
const compiler = webpack(webpackConfig);
const devServerConfig = devServerConfigFactory();
const server = new WebpackDevServer(devServerConfig, compiler);

const runServer = async () => {
    console.log(chalk.cyan('Starting the development server...'));
    await server.startCallback(() => {
        console.log(chalk.cyan(`Development server is running at localhost:${devServerConfig.port}...`));
    });
}

runServer();