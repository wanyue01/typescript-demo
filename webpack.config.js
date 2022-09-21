// 引入管理路径的包
const path = require('path');
// 引入插件自动生成html
const HTMLWebpackPlugin = require('html-webpack-plugin')

const { CleanWebpackPlugin }  = require('clean-webpack-plugin')

// webpack中的所有配置信息都应该卸载module.exports中
module.exports = {
    // 指定入口文件
    entry: "./src/index.ts",

    // 指定打包文件所在的目录
    output: {
        // 指定打包文件的目录
        path: path.resolve(__dirname, 'dist'),
        // 打包后的文件
        filename: "bundle.js",
        // 告诉webpack不使用箭头函数
        environment: {
            arrowFunction: false
        }
    },

    // 指定webpack打包时要使用的模块
    module: {
        rules: [
            {
                // test指定规则生效的文件
                test: /\.ts$/,
                // 要使用的loader
                use: [
                    // 配置babel
                    {
                        // 指定加载器
                        loader: 'babel-loader',
                        // 配置babel
                        options: {
                            // 设置预定义的环境
                            presets: [
                                [
                                    // 指定环境的插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        // 要兼容的目标浏览器
                                        targets: {
                                            "chrome": "88"
                                        },
                                        // 指定core.js的版本
                                        "corejs": "3",
                                        // 使用core-js的方式 usage表示按需加载
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                // 要排除的文件
                exclude: /node_modules/
            },

          // 设置less文件的处理
            {
                test: /\.less$/,
                use: [
                  "style-loader",
                  "css-loader",
                  // 引入postcss
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                  [
                                    "postcss-preset-env",
                                      {
                                          browsers: 'last 2 versions'
                                      }
                                  ]
                                ]
                            }
                        }
                    },
                  "less-loader"
                ]
            }
        ]
    },

    mode: 'production',

    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            // title: 'hi',
            template: './src/index.html'
        }),
    ],

    // 设置哪些文件可以作为模块使用
    resolve: {
        extensions: ['.ts', '.js']
    }

}