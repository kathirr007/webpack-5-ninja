import path from 'node:path'
import type webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import CopyPlugin from 'copy-webpack-plugin'

// in case you run into any typescript error when configuring `devServer`
import 'webpack-dev-server'

// const CopyPlugin = require('copy-webpack-plugin')

const config: webpack.Configuration = {
  mode: 'production',
  entry: {
    index: './src/index.js',
    courses: './src/pages/courses.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // assetModuleFilename: 'images/[hash][ext]',
    // assetModuleFilename: (pathData: PathData) /** function to keep the original file name */ => {
    //   const filepath = path
    //     .dirname(pathData.filename as string)
    //     .split('/')
    //     .slice(1)
    //     .join('/')
    //   return `${filepath}/[name].[hash][ext][query]`
    // },
    clean: true,
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    // port: 3100,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(css)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { } },
        ],
        // use: ['style-loader', 'css-loader'], // loaders executed from right to left
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { } },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(ttf|woff|woff2)$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      // template: './src/index.html',
      chunks: ['index'],
      // inject: true,
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/pages/courses.html'),
      // template: './src/pages/courses.html',
      chunks: ['courses'],
      // inject: true,
      filename: 'courses.html',
    }),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'src/assets/images/'),
        // to: path.resolve(__dirname, 'dist'),
        to({ context, absoluteFilename }) {
          return `assets/images/${path.relative(context, absoluteFilename as string)}`
        },
      }],
    }),
  ],

}

export default config
