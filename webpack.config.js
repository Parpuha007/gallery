const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
require("babel-core/register");
require("babel-polyfill");

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`
const jsLoaders = () => {
   const loaders = [
      {
         loader: 'babel-loader',
         options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
         }
      }
   ]
   return loaders
}
module.exports = {
   context: path.resolve(__dirname, 'src'),
   mode: "development",
   // entry: './index.js',
   entry: ['babel-polyfill', './index.js'],
   output: {
      filename: filename('js'),
      path: path.resolve(__dirname, 'dist'),
   },
   // resolve: {
   //    extentions: ['.js'],
   //    alias: {
   //       '@': path.resolve(__dirname, 'src'),
   //       '@core': path.resolve(__dirname, 'src/core')
   //    }
   // },
   plugins: [
      new HtmlWebpackPlugin({
         template: 'index.html',
         minify: {
            removeComments: isProd,
            collapseWhitespace: isProd
         }
      }),
      // new CopyPlugin({
      //    patterns: [
      //       {
      //          from: path.resolve(__dirname, 'src/favicon.ico'),
      //          to: path.resolve(__dirname, 'dist')
      //       }
      //    ]
      // }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
         filename: filename('css')
      }),
   ],
   module: {
      rules: [
         {
            test: /\.s[ac]ss$/i,
            use: [
               MiniCssExtractPlugin.loader,
               "css-loader",
               "sass-loader",
            ],
         },
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: jsLoaders()
         }
      ],
   },
   devServer: {
      contentBase: path.join(__dirname, 'src'),
      port: 9000,
      open: true,
   },
};