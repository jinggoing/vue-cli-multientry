# vue-cli-multientry

### vue+vuex+vue-router 的多入口文件配置脚手架

所以的模块入口可在 src/ 下新建文件夹 

然后按照 about 或 test 的文件结构和命名规则去新建需要开发的模块即可

## 目录结构
基本与vue-cli webpack生成的模板一致除了 src下多了一级目录
### 要求：
  如在about目录下需要有about.html about.js App.vue 文件

  其它文件必须放到目录下的文件夹 可自定义创建一个文件夹存放文件
## 多js入口构建多页面思路
  0. utils 里添加 getEntries 方法
  
    ```
      var glob = require('glob') // 新增

      /* 用于多页面的模板 */
      exports.getEntries = function (globPath) {
        var entries = {}
        /**
        * 读取src目录,并进行路径裁剪
        */
        glob.sync(globPath).forEach(function (entry) {
          /**
          * path.basename 提取出用 ‘/' 隔开的path的最后一部分，除第一个参数外其余是需要过滤的字符串
          * path.extname 获取文件后缀
          */
          var basename = path.basename(entry, path.extname(entry))
          // 过滤掉非入口文件
          if (entry.split('/').length === 4) {
            entries[basename] = entry
          }
        })
        // console.log(entries);
        // 获取的主入口如下： { main: './src/module/index/main.js', test: './src/module/test/test.js' }
        return entries
      }

    ```
  1. 修改webpack.base.config.js 打包输入 webpack的entry参数 utils.getEntries('./src/**/*.js') （通过自定义函数获取src下各页面的入口js文件）

    ```
      entry: utils.getEntries('./src/**/*.js')

    ```

  2. 修改webpack.base.config.js 打包输出

    ```
      /* 用于构建多页面 */
      var pages = utils.getEntries('./src/**/*.html')
      for (var page in pages) {
        // 配置生成的html文件，定义路径等
        var conf = {
          filename: page + '.html',
          template: pages[page], // 模板路径
          inject: true,
          // excludeChunks 允许跳过某些chunks, 而chunks告诉插件要引用entry里面的哪几个入口
          // 如何更好的理解这块呢？举个例子：比如本demo中包含两个模块（index和about），最好的当然是各个模块引入自己所需的js，
          // 而不是每个页面都引入所有的js，你可以把下面这个excludeChunks去掉，然后npm run build，然后看编译出来的index.html和about.html就知道了
          // filter：将数据过滤，然后返回符合要求的数据，Object.keys是获取JSON对象中的每个key
          excludeChunks: Object.keys(pages).filter(item => {
            return (item !== page)
          })
        }
        // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
        webpackConfig.plugins.push(new HtmlWebpackPlugin(conf))
      }

    ```


