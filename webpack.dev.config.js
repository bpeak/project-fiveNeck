const path = require("path")
const webpack = require("webpack")

module.exports = { 
    mode : "development",
    entry : "./src/index.js",
    output : {
        filename : "index.js",
        path : path.join(__dirname, "dist"),
    },
    node : {
        __dirname : true,
    },
    module : {
        rules : [
            {
                test: /\.js$/,
                use : {
                    loader : "babel-loader",
                    options: {
                        presets : [
                            '@babel/preset-env'
                        ]
                    }
                }
            },
            {
                test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            publicPath : '/public/imgs', // file-loader 사용시에 이미지가 사용할 기준경로
                            outputPath : '../public/imgs', // file-lodaer 사용시에 결과물위치 ( dist 폴더기준 )
                            name: '[name].[ext]',
                            limit: 10000,
                        }
                    }
                ]
            }	
        ]
    },
}