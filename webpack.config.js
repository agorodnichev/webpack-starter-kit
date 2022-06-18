const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const nodeModulesPath = path.resolve(__dirname, 'node_modules');

/**
 * TODO:
 *  1) Find a way to combine multiple HTML files in compile time with using CSS modules.
 */

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.ts',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
      hot: true,
  },
  module: {
      rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: [/node_modules/, nodeModulesPath],
          },
          {
            test: /\.(sa|sc|c)ss$/i,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                // // Uncomment below to use CSS Modules
                // options: {
                //   esModule: true,
                //   modules: {
                //     exportLocalsConvention: 'camelCaseOnly',
                //     localIdentName: '[path][name]__[local]', // use '[hash:base64]' for production
                //     namedExport: false,
                //   }
                // }
              },
              'postcss-loader',
              "sass-loader",
            ],
          },
          {
            test: /\.ejs$/i,
            use: ['html-loader', 'template-ejs-loader'],
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
          },
      ],
  },
  resolve: {
      extensions: ['.tsx', '.ts', '.js', '.scss', '.css'],
  },
  plugins: [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.ejs',
    }),
    new MiniCssExtractPlugin(),
  ],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
  },
};