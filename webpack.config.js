// 1.配置打包入口
// 2.配置打包出口
// 这个文件，使用时node.js的语法
// 需要使用node.js提供的方法，来读取当前目录的绝对路径
const path = require("path")

// 引入vue-loader@15.x所依赖的插件
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
    entry: path.join(__dirname, "./src/main.js"),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    module: {//专门用于配置所有的第三方模块的 loader 加载器
        rules: [//这里是设置第三方加载器的匹配规则
            { test: /\.css$/, use: ["style-loader", "css-loader"] },
            { test: /\.(png|jpg|gif)$/, use: "url-loader" },
            { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"] },
            { test: /\.(otf|eot|svg|ttf|woff|woff2)$/, use: "url-loader" },
            // 必须除去这个文件，
            { test: /\.js$/, use: "babel-loader", exclude: /node_modules/ },
            // 处理以vue结尾的文件
            { test: /\.vue$/, use: "vue-loader" }

        ]
    },
    // 配置 指定加载包时，指定加载哪个包
    // resolve: {
    //     alias: {
    //         // 如果import引进来的包，是以vue结尾的，那么就加载这个文件
    //         "vue$": "./node_modules/vue/dist/vue.js"
    //     }
    // },
    plugins: [
        new VueLoaderPlugin()//1.配置插件节点
    ],
    // 以下配置是打包成手机端所用的
    mode: "production",
    performance: {
        hints: "warning",
        maxAssetSize: 3000000,//扩充单位字节，默认250kb(250000),
        maxEntrypointSize: 3000000
    }
}