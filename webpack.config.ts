/* eslint-disable import/no-extraneous-dependencies */
// @ts-ignore
import { gzip } from '@gfx/zopfli';
import CompressionPlugin from 'compression-webpack-plugin';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

const config: webpack.Configuration = {
 cache: true,
 devtool: 'source-map',
 module: {
  rules: [
   {
    test: /\.(j|t)sx?$/,
    exclude: /node_modules/,
    use: 'babel-loader',
   },
   {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
   },
   {
    test: /\.(jpe?g|png|gif)$/,
    use: 'file-loader',
   },
   {
    test: /\.svg$/,
    use: '@svgr/webpack',
   },
  ],
 },
 optimization: {
  splitChunks: {
   cacheGroups: {
    vendors: {
     test: /node_modules\/.pnpm\/(?!react-icons.*\/).*/,
     name: 'vendors',
     chunks: 'all',
    },
    ui: {
     test: /node_modules\/.pnpm\/(react-icons.*\/).*/,
     name: 'ui',
     chunks: 'all',
    },
   },
  },
  runtimeChunk: {
   name: 'manifest',
  },
 },
 output: {
  path: path.resolve(__dirname, 'build'),
  filename: '[name].bundle.js',
 },
 plugins: [
  new HtmlWebPackPlugin({
   template: path.resolve(__dirname, 'public/index.html'),
  }),
  // @ts-ignore
  new CompressionPlugin({
   algorithm: gzip,
   deleteOriginalAssets: false,
   filename: '[path][base].gz',
   test: /\.(js|css|html|svg)$/i,
  }),
  // @ts-ignore
  new CompressionPlugin({
   algorithm: 'brotliCompress',
   compressionOptions: {
    level: 11,
   },
   deleteOriginalAssets: false,
   filename: '[path][base].br',
   test: /\.(js|css|html|svg)$/i,
  }),
 ],
 resolve: {
  extensions: ['.ts', '.tsx', '.js'],
  modules: [path.resolve(__dirname, 'src'), 'node_modules'],
 },
};

export default config;
