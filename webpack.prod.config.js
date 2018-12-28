const path = require('path')
const webpack = require('webpack')

module.exports = {
    mode : 'development',
    entry: [path.join(__dirname, '/src/index.js')],
    output: {
        filename: "client.js",
        path: path.join(__dirname, '/dist'),
    },
	// module: {
	// 	rules: [
	// 		{
    //             test: /\.js$/,
    //             // exclude : /node_modules/,
	// 			loader: "babel-loader",
    //             options: {
    //                 presets: ['@babel/preset-env', '@babel/preset-react'],
    //                 plugins: ["@babel/plugin-proposal-class-properties"]
    //             }
	// 		},	
	// 	]
	// },
}

