import path from 'node:path'
import type webpack from 'webpack'
import type { PathData } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

// in case you run into any typescript error when configuring `devServer`
import 'webpack-dev-server'

const config: webpack.Configuration = {
  mode: 'production',
  entry: {
    index: './src/index.js',
    product: './src/products.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    port: 3100,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      chunks: ['index'],
      inject: true,
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/products.html'),
      chunks: ['product'],
      inject: true,
      filename: 'products.html',
    }),
  ],
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
          { loader: 'css-loader', options: { modules: true } },
        ],
        // use: ['style-loader', 'css-loader'], // loaders executed from right to left
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { modules: true } },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|webp)$/,
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
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // assetModuleFilename: 'images/[hash][ext]',
    assetModuleFilename: (pathData: PathData) /** function to keep the original file name */ => {
      const filepath = path
        .dirname(pathData.filename as string)
        .split('/')
        .slice(1)
        .join('/')
      return `${filepath}/[name].[hash][ext][query]`
    },
    clean: true,
  },
}

export default config
