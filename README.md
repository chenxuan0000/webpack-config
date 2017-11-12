## webpack 3.X基本配置
#### 1.webpack.config.js
> webpack默认配置文件 
```javascript
const path = require('path')

module.exports = {
  entry: { //入口
    entry: './src/entry.js',
    entry2: './src/entry2.js'
  },
  output: { //出口
    path: path.resolve(__dirname, 'dist'), //获取绝对路径
    filename: '[name].js' //[name]对应entry的文件名
  },
  module: {},
  plugins: [],//插件
  devServer: {}
}
```