var path = require('path');
var webpack = require('webpack');
var postcss = require('postcss');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: [
		"./sources/app.js"
	],

	output: {
		path: path.resolve(__dirname, 'app/js/'),
		publicPath: '/js',
        filename: 'app.js',
        pathinfo: true,
	},

	resolve: {
		modules: [path.resolve(__dirname, 'sources'), 'node_modules'],
	},

	module: {
		rules: [
			{
				test: /\.js(x?)$/,
				exclude: /node_modules/,
				loader: "babel-loader",
			},
			{
				test: /\.scss/,
				use: [
					'style-loader',
					'css-loader?sourceMap',
					'sass-loader?sourceMap',
				]
				/*use: ExtractTextPlugin.extract({ 
					fallback: 'style-loader', 
					use: [
						'css-loader',
						'sass-loader',
					]
				})*/
			},
		],
	},
	plugins: [
		new ExtractTextPlugin('../css/styles.css'),
		new webpack.DefinePlugin({
			'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		}),
	],

	devServer: {
	  contentBase: path.join(__dirname, "app"),
	  port: 8080
	},

	/*postcss: function() {
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
	},*/
}
