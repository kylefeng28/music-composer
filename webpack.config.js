const webpack = require('webpack');
const path = require('path')

/*
// HTML
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: './index.html',
	filename: 'index.html',
	inject: 'body'
});
*/

module.exports = {
	entry: './index.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		// publicPath: '/dist',
	},

	externals: {
	},

	// Enable sourcemaps for debugging webpack's output
	devtool : 'source-map',

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions
		extensions: ['.ts', '.tsx', '.js', '.json']
	},

	module: {
		rules: [
			// Typescript
			{ test: /\.tsx?$/, loader: 'awesome-typescript-loader' },

			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'
			{ enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
		]
	},

	// plugins: [ HtmlWebpackPluginConfig ]

}
