const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');//压缩插件
const htmlPlugin = require('html-webpack-plugin'); //html插件
const extractTextPlugin = require('extract-text-webpack-plugin'); //css打包分离插件
var webSite = {
  publicPath: 'http://127.0.0.1:1988/'
}

module.exports = {
  entry: { //入口
    entry: './src/entry.js'
  },
  output: { //出口
    path: path.resolve(__dirname, 'dist'), //获取绝对路径
    filename: '[name].js', //[name]对应entry的文件名
    publicPath: webSite.publicPath
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {loader: 'css-loader', options: {importLoaders: 1}},
            'postcss-loader'
          ]
        })
      }, {
        test: /\.(png|jpg|gif)/,
        use: [{
          loader: 'url-loader', //配置options
          options: {
            limit: 1000,
            outputPath: 'images/' //配置img输出路径
          }
        }]
      }, {
        test: /\.(html|htm)$/i,
        use: ['html-withimg-loader']
      }, {
        test: /\.less$/,
        use: extractTextPlugin.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'less-loader'
          }],
          fallback: 'style-loader'
        })
      }, {
        test: /\.scss/,
        use: extractTextPlugin.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }],
          fallback: 'style-loader'
        })
      }
    ]
  },//依赖模块
  plugins: [
    // new uglify()
    new htmlPlugin({
      minify: {
        removeAttributeQuotes: true //去掉属性引号
      },
      hash: true, //js带hash
      template: './src/index.html'
    }),
    new extractTextPlugin('css/index.css')
  ],//插件
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: '127.0.0.1',
    compress:
      true, //服务器压缩
    port:
      1988
  }
}