const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');//压缩插件

module.exports = {
  entry: { //入口
    entry: './src/entry.js',
    entry2: './src/entry2.js'
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
      }
    ]
  },//依赖模块
  plugins: [
    new uglify()
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