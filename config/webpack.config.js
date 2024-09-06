const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 配置index.html模板
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 将css模块提取为单独的文件
const {WebpackManifestPlugin} = require('webpack-manifest-plugin'); // 生成manifest.json
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer'); // 打包资源分析
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // 压缩css资源
const TerserPlugin = require('terser-webpack-plugin'); // 压缩js资源
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin'); // 压缩图片资源

module.exports = function (env) {
  const isEnvDevelopment = env === 'development';
  const isEnvProduction = env === 'production';

  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    entry: {
      main: './src/index.tsx',
    },
    devtool: isEnvDevelopment ? 'source-map' : false,
    resolve: {
      extensions: ['.ts', '.tsx', '.js', 'jsx', '...'],
      alias: {
        '@': path.resolve(process.cwd(), './src/'),
        src: path.resolve(process.cwd(), './src/'),
        utils: path.resolve(process.cwd(), './src/utils'),
      },
    },
    output: {
      path: path.resolve(process.cwd(), './build'),
      filename: 'js/[name].[contenthash].js',
      chunkFilename: 'js/[name].[contenthash].chunk.js',
      publicPath: isEnvProduction ? '/admin/' : isEnvDevelopment && '/',
      clean: true,
    },
    optimization: {
      minimize: true,
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
        // new ImageMinimizerPlugin({
        //   minimizer: {
        //     implementation: ImageMinimizerPlugin.sharpMinify,
        //     options: {
        //       encodeOptions: {
        //         /**
        //          * https://sharp.pixelplumbing.com/api-output
        //          * jpeg、webp默认为80，avif默认为50，因此需显示配置
        //          * png默认为100，相当于lossless，无需显示配置
        //          * gif不支持lossless
        //          */
        //         jpeg: {
        //           quality: 100,
        //         },
        //         webp: {
        //           lossless: true,
        //         },
        //         avif: {
        //           lossless: true,
        //         },
        //       },
        //     },
        //   },
        // }),
      ],
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.less$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],
        },
        {
          test: /\.(scss|sass)$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset',
          generator: {
            filename: 'images/[hash][ext]',
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[hash][ext]',
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(process.cwd(), 'src/assets/index.html'),
        title: '半米小站-后台管理系统',
        inject: 'body',
        filename: 'index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css',
        chunkFilename: 'css/[name].[contenthash].chunk.css',
      }),
      new WebpackManifestPlugin({
        fileName: 'manifest.json',
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        generateStatsFile: false,
        statsOptions: {source: false},
      }),
    ],
  };
};
