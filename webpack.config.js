const path = require('path');

module.exports = {
  context: path.join(__dirname, 'client'),
  entry: "./js/main.js",
  output: {
    path: path.join(__dirname, 'client/js'),
    filename: "bundle.js"
  },
  module: {
    preLoaders: [
     {
       test: /\.js$/,
       exclude: /node_modules/,
       loader: 'jshint-loader'
     }
   ],
   loaders: [
     {
       test: /\.es6$/,
       exclude: /node_modules/,
       loader: 'babel-loader',
       query: {
         presets: ['es2015']
       }
     }
   ]
  },
  resolve: {
    extensions: ['', '.js', '.es6']
  },
  watch: true
}
