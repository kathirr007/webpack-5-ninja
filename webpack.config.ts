import path from 'node:path'
import type webpack from 'webpack'

// in case you run into any typescript error when configuring `devServer`
import 'webpack-dev-server'

const config: webpack.Configuration = {
  mode: 'production',
  entry: './src.index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
}

export default config
