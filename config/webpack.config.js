const path = require('path');
const paths = require('./paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = function (webpackEnv) {
	const isEnvDevelopment = webpackEnv === 'development';
	const isEnvProduction = webpackEnv === 'production';
	const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

	const getStyleLoaders = (cssLoaderOptions, preprocessor) => {
		const loaders = [
			isEnvDevelopment && require.resolve('style-loader'),
			isEnvProduction && MiniCssExtractPlugin.loader,
			{
				loader: require.resolve('css-loader'),
				options: cssLoaderOptions,
			},
			{
				loader: 'postcss-loader',
				options: {
					postcssOptions: {
						plugins: [
							[
								'postcss-preset-env',
							],
						],
					},
					sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
				}
			}
		].filter(Boolean)
		if (preprocessor) {
			loaders.push(
				{
					loader: require.resolve(preprocessor),
					options: {
						sourceMap: true,
					},
				}
			);
		}
		return loaders
	}

	return {
		// mode: webpackEnv,
		mode: 'development',
		entry: {
			main: './src/index.js',
		},
		devtool: isEnvDevelopment ? 'eval-source-map' : isEnvProduction && shouldUseSourceMap ? 'source-map' : false,
		module: {
			rules: [
				{
					test: /\.css$/,
					use: getStyleLoaders({
						importLoaders: 1,
						sourceMap: isEnvProduction
							? shouldUseSourceMap
							: isEnvDevelopment,
						modules: {
							mode: (resourcePath) => {
								if (/global.css$/i.test(resourcePath)) {
									return "global";
								}
								return "local";
							},
						},
					})
				},
				{
					test: /\.(scss|sass)$/,
					use: getStyleLoaders(
						{
							importLoaders: 3,
							sourceMap: isEnvProduction
								? shouldUseSourceMap
								: isEnvDevelopment,
							modules: {
								mode: (resourcePath) => {
									if (/global.(scss|sass)$/i.test(resourcePath)) {
										return "global";
									}
									return "local";
								},
							},
						},
						'sass-loader'
					)
				},
				{
					test: /\.less$/,
					use: getStyleLoaders(
						{
							importLoaders: 2,
							sourceMap: isEnvProduction && shouldUseSourceMap,
							modules: {
								mode: (resourcePath) => {
									if (/global.less$/i.test(resourcePath)) {
										return "global";
									}
									return "local";
								},
							},
						},
						"less-loader"
					)
				},
				{
					test: /\.(ts|tsx|js|jsx)$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							configFile: path.resolve(__dirname, 'babel.config.json')
						}
					}
				},
				{
					test: /\.(png|svg|jpg|jpeg|gif)$/i,
					type: 'asset/resource',
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/i,
					type: 'asset/resource',
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin(
				Object.assign(
					{},
					{
						inject: 'body',
						template: paths.appHtml,
					},
				)
			),
			new MiniCssExtractPlugin({
				filename: 'static/css/[name].[contenthash].css',
				chunkFilename: 'static/css/[name].[contenthash].chunk.css',
			}),
			new WebpackManifestPlugin({
				fileName: 'asset-manifest.json',
				// publicPath: paths.publicUrlOrPath,
				generate: (seed, files, entrypoints) => {
					const manifestFiles = files.reduce((manifest, file) => {
						manifest[file.name] = file.path;
						return manifest;
					}, seed);
					const entrypointFiles = entrypoints.main.filter(
						fileName => !fileName.endsWith('.map')
					);
					return {
						files: manifestFiles,
						entrypoints: entrypointFiles,
					};
				},
			})
		],
		optimization: {
			splitChunks: {
				cacheGroups: {
					vendors: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendors',
						chunks: 'all',
					},
				},
			},
		},
		output: {
			filename: 'static/js/[name].[contenthash].bundle.js',
			chunkFilename: 'static/js/[name].[contenthash].chunk.js',
			assetModuleFilename: 'static/media/[contenthash][ext]',
			path: path.resolve(process.cwd(), './build'),
			clean: true
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.jsx', '...']
		}
	}
}