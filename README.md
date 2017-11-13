## webpack 3.X基本配置
#### 1.webpack.config.js
> webpack默认配置文件 
```javascript
const path = require('path')

module.exports = {
  entry: { //入口
    entry: './src/entry.js'
  },
  output: { //出口
    path: path.resolve(__dirname, 'dist'), //获取绝对路径
    filename: '[name].js' //[name]对应entry的文件名
  },
  module: {},//依赖模块
  plugins: [],//插件
  devServer: {}
}
```

#### 2.devServer配置
```javascript
devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: '127.0.0.1',
    compress: true, //服务器压缩
    port: 1988
  }
```

#### 3.压缩插件
```javascript
const uglify = require('uglifyjs-webpack-plugin');
```

#### 3.html生成插件
```javascript
const htmlPlugin = require('html-webpack-plugin'); //html插件
new htmlPlugin({
      minify: {
        removeAttributeQuotes: true //去掉属性引号
      },
      hash: true, //js带hash
      template: './src/index.html'
    })
```

#### 3.url-loader
```javascript
{
        test: /\.(png|jpg|gif)/,
        use: [{
          loader: 'url-loader', //配置options
          options: {
            limit: 1000
          }
        }]
      }
```
#### 4.css打包分离插件
```javascript
const extractTextPlugin = require('extract-text-webpack-plugin');//具体差异对比commit diff
```