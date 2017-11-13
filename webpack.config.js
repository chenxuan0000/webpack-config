const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');//压缩插件
const htmlPlugin = require('html-webpack-plugin'); //html插件

module.exports = {
  entry: { //入口
    entry: './src/entry.js'
  },
  output: { //出口
    path: path.resolve(__dirname, 'dist'), //获取绝对路径
    filename: '[name].js' //[name]对应entry的文件名
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }]
      }, {
        test: /\.(png|jpg|gif)/,
        use: [{
          loader: 'url-loader', //配置options
          options: {
            limit: 1000
          }
        }]
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
    })
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