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

#### 5.html中img的打包
```javascript
{
        test: /\.(html|htm)$/i,
        use: ['html-withimg-loader']
      }
```

#### 6.less编译打包分离 scss类似
```javascript
cnpm install --save-dev less less-loader
 {
        test: /\.less$/,
        use: extractTextPlugin.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'less-loader'
          }],
          fallback: 'style-loader'
        })
      }
```

#### 7.css自动加前缀
>postCSS推荐在项目根目录（和webpack.config.js同级），建立一个postcss.config.js文件。
```javascript
cnpm install --save-dev postcss-loader autoprefixer

//postcss.config.js
module.exports = {
    plugins: [
        require('autoprefixer')
    ]
}

//配置提取CSS的loader配置
{
    test: /\.css$/,
    use: extractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader'
        ]
    })
    
}

```

#### 8.消除未使用的CSS
>注意：使用这个插件必须配合extract-text-webpack-plugin这个插件，这个插件在前边的课程已经讲解过了。如果你还不会请自学一下。
```javascript
cnpm i -D purifycss-webpack purify-css

	
const glob = require('glob');
	
const PurifyCSSPlugin = require("purifycss-webpack");

 new PurifyCSSPlugin({
        // Give paths to parse for rules. These should be absolute!
        paths: glob.sync(path.join(__dirname, 'src/*.html')),
        })
```

#### 9.babel
```javascript
cnpm i -D babel-core babel-loader babel-preset-es2015
cnpm i -D babel-preset-env

{
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      }
      
//.babelrc
{
  "presets": ["env"]
}
```

#### 10.copy-webpack-plugin
> 工作中会有一些已经存在但在项目中没有引用的图片资源或者其他静态资源（比如设计图、开发文档），这些静态资源有可能是文档，也有可能是一些额外的图片。项目组长会要求你打包时保留这些静态资源，直接打包到制定文件夹。其实打包这些资源只需要用到copy-webpack-plugin。使用copy-webpack-plugin
```javascript
cnpm install --save-dev copy-webpack-plugin
const copyWebpackPlugin= require("copy-webpack-plugin");
new copyWebpackPlugin([{
              from:__dirname+'/src/public',
              to:'./public'
            }])
```
