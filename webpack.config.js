var path = require("path");
var webpack = require("webpack");
var fs = require("fs");
var url = require("url");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist/",
    filename: "build.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.sass$/,
        use: ["vue-style-loader", "css-loader", "sass-loader?indentedSyntax"]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            scss: ["vue-style-loader", "css-loader", "sass-loader"],
            sass: [
              "vue-style-loader",
              "css-loader",
              "sass-loader?indentedSyntax"
            ]
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]"
        }
      }
    ]
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js"
    },
    extensions: ["*", ".js", ".vue", ".json"]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,

    /**
     * 重要
     * @param {} app
     */
    before: function(app) {
      /**
       * 定义接口 commonList, 获取帖子列表数据
       * 请求时候路径就是 “commonList“
       */
      app.get("/commonList", (req, res) => {
        // 设置头
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-Type", "text/html");
        // 文件存取数据
        fs.readFile("./src/data/data.json", "utf-8", (err, data) => {
          // 获取到文件里面的json字符串，并返回
          res.end(data);
        });
      });

      /**
       * 定义 deleteById接口， 用来删除某条帖子
       */
      app.get("/deleteById", (req, res) => {
        //设置响应头
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-Type", "text/html");
        // 获取传递过来的参数
        let parseObj = url.parse(req.url, true);
        req.query = parseObj.query;
        // id 就是我们传递过来的参数
        let id = req.query.id;
        // 先读取到json
        fs.readFile("./src/data/data.json", "utf-8", (err, json) => {
          // 把json转换成数组
          let data = JSON.parse(json);
          // 过滤掉这个数组中 id 与我们传递过来的id相等的这条数据，返回一个新数组，
          // 这个result新数组就是删除了这条数据的数组
          let result = data.filter(item => {
            return item.id != id;
          });

          // 把这个新数组转换成json字符串，写入到文件里面
          fs.writeFile("./src/data/data.json", JSON.stringify(result), err => {
            if (err) {
              return;
            }
            // 写入成功后代表删除成功
            res.send({ code: 1, msg: "删除成功" });
          });
        });
      });

      /**
       * 发布帖子接口
       */
      app.get("/saveCommon", (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-Type", "text/html");
        // 防止参数中有中文乱码
        encodeURI(req.url);
        // 获取传递过来的数据
        let parseObj = url.parse(req.url, true);
        req.query = parseObj.query;
        console.log(req.query);

        // 还是读取这个文件，json代表文件里面的内容
        fs.readFile("./src/data/data.json", "utf-8", (err, json) => {
          // 这些就是请求此接口时传递过来的数据
          let content = req.query.content;
          let author = req.query.author;
          let time = req.query.time;
          let title = req.query.title;

          // 把文件里面的字符串转成一个数组，用data接收
          let data = JSON.parse(json);
          // 获取评论数量
          let commonNum = data.commonNum;
          if (typeof commonNum == "undefined") {
            // 如果没有评论数量， 那么默认是0
            commonNum = 0;
          }
          // 每条数据都有一个id， 如果文件中没有数据 ， 那么我们保存的时候设置id为1，否则我们设置 id 为最后一条数据的id+1
          let id = 0;
          if (data.length <= 0) id = 1;
          else id = data[data.length - 1].id + 1;
          // 然后把我们要保存的新数据放到对象里面
          let obj = {
            id: id,
            content: content,
            author: author,
            time: time,
            commonNum: commonNum,
            title: title
          };
          // 把这条数据放到数组中
          data.push(obj);
          // 把新数组转成json字符串，写入到文件里
          let responseStr = JSON.stringify(data);
          fs.writeFile("./src/data/data.json", responseStr, err => {
            if (err) {
              return;
            }
            // 写入成功代表发布帖子成功
            res.send({ code: 1, msg: "发布成功" });
          });
        });
      });
    }
  },

  performance: {
    hints: false
  },
  devtool: "#eval-source-map"
};

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "#source-map";
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}
