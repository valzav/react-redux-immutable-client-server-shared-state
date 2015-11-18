var path = require('path');
var webpack = require('webpack');
var clean = require("clean-webpack-plugin");

var root_dir = path.resolve(__dirname, ".");
var outputPath = path.join(root_dir, "dist");

module.exports = {
    entry: [
        'babel-polyfill',
        "./src/App",
        'webpack-dev-server/client?http://localhost:8080'
    ],
    output: {
        path: outputPath,
        filename: "app.js",
        pathinfo: true
    },
    debug: true,
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                include: path.join(root_dir, 'src'),
                loader: 'babel-loader',
                query: {
                    plugins: ['transform-runtime']
                }
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                loader: "style!css!autoprefixer!sass?outputStyle=expanded"
            }
        ]
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    devServer: {
        contentBase: "./src/assets"
    },
    plugins: [
        new clean(["dist"])
    ]
};


