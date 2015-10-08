"use strict";

var path = require("path");
var webpack = require("webpack");

var args = require("minimist")(process.argv.slice(2));

var debug = !(args.production || args.p);

var config = {
	target: "web",
	entry: [
		"!file?name=[path][name].[ext]&context=./src!./src/index.html",
		"./src/index.js",
	],
	output: {
		path: path.resolve("dist"),
		filename: "bundle.js",
	},
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel?stage=0" },
			{ test: /\.json$/, loader: "json" },
			{ test: /\.css$/, loader: "style!css" },
			{ test: /\.less$/, loader: "style!css!less" },
			{ test: /\.(eot|gif|svg|ttf|woff2?)(\?.*)?$/, loader: "url?limit=10000" },
			{ test: /\.png$/, loader: "url-loader?mimetype=image/png" },
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			DEBUG: debug,
		}),
	],
	progress: true,
};

if (debug) {
	config.output.pathinfo = true;
	config.debug = true;
	config.devtool = "source-map";
}

module.exports = config;
