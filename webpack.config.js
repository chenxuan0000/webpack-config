const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const PurifyCSSPlugin = require('purifycss-webpack');
const uglify = require('uglifyjs-webpack-plugin');//压缩插件
const htmlPlugin = require('html-webpack-plugin'); //html插件
const extractTextPlugin = require('extract-text-webpack-plugin'); //css打包分离插件
const entry = require('./webpack_config/entry.js'); //入口配置文件

if (process.env.type === 'build') {
  var webSite = {
    publicPath: 'http://www.chenxuan.com:8888/'
  }
} else {
  var webSite = {
    publicPath: 'http://127.0.0.1:1988/'
  }
}
// console.log(encodeURIComponent(process.env.type))
module.exports = {
  // devtool: 'source-map',
  entry: entry.path,
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
          }, {
            loader: 'postcss-loader'
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
          }, {
            loader: 'postcss-loader'
          }],
          fallback: 'style-loader'
        })
      }, {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
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
    new extractTextPlugin('css/index.css'),
    new PurifyCSSPlugin({
      // Give paths to parse for rules. These should be absolute!
      paths: glob.sync(path.join(__dirname, 'src/*.html')),
    }),
    new webpack.BannerPlugin("常清文群翁无群二群翁！！！！") //公共注释插件
  ],//插件
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: '127.0.0.1',
    compress:
      true, //服务器压缩
    port:
      1988
  },
  watchOptions: {
    poll: 3000, //watch 监测修改的时间
    aggregeateTimeout: 500, //500ms内重复ctrl+s不会重复打包
    ignored: /node_modules/, //忽略文件夹
  }
}