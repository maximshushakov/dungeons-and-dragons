var path = require('path');
var webpack = require('webpack');
var postcss = require('postcss');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: [
		"./sources/app.js",
	],

	output: {
		filename: "./app/js/app.js",
		pathinfo: true
	},

	resolve: {
		root: path.resolve(__dirname, 'sources'),
	},

	module: {
		loaders: [
			{
				test: /\.js(x?)$/,
				exclude: /node_modules/,
				loader: "babel?presets=es2015",
			},
			{
				test: /\.scss/,
				loader: ExtractTextPlugin.extract("style", "css!sass?outputStyle=expanded")
				//loader: 'style!css!sass?outputStyle=expanded'
			},
		],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin('./app/css/styles.css'),
		new webpack.DefinePlugin({
			'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		}),
	],

	postcss: function() {
		return [
			autoprefixer({
				browsers: [
					'last 2 Chrome versions',
					'last 2 Firefox versions',
					'last 2 Safari versions',
					'last 2 Explorer versions'
				]
			})
		];
	},
}
