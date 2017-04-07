var ExtractTextPlugin = require("extract-text-webpack-plugin");
var WebpackNotifierPlugin = require("webpack-notifier");
var webpack = require("webpack");

module.exports = {
	entry: {
		app: './src/app/app.ts',
		bootstrap: './src/app/bootstrap.less',
		main: './src/app/main.less'
	},
	resolve: {
		extensions: [
			'.ts',
			'.less'
		]
	},
	output: {
		path: './dist/',
		filename: 'Scripts/[name].js',
		chunkFilename: "Scripts/[id].js",
		sourceMapFilename: "[file].map",
		devtoolModuleFilenameTemplate: "file://[absolute-resource-path]",
		devtoolFallbackModuleFilenameTemplate: "file://[absolute-resource-path]?[hash]"
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [
					{
						loader: 'ts-loader'
					},
					{
						loader: 'tslint-loader'
					}
				]
			},
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					fallback: {
						loader: 'style-loader',
						options: {
							sourceMap: true
						}
					},
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true,
								context: "/"
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								sourceMap: true
							}
						},
						{
							loader: 'less-loader',
							options: {
								sourceMap: true
							}
						}
					]
				})
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				use: [
						{
							loader: 'file-loader',
							options: {
								name: '/fonts/[name].[ext]'
							}
						}
				]
			},
			{
				test: /\.(jpg|gif|png)$/,
				use: [
						{
							loader: 'url-loader',
							options: {
								limit: '10000',
								mimetype: 'image/[ext]'
							}
						}
				]
			}
		]
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [
                    require("autoprefixer")
				],
				tslint: {
					failOnHint: false
				}
			}
		}),
		new ExtractTextPlugin({
			filename: "css/[name].css",
			allChunks: true
		}),
		new WebpackNotifierPlugin(),
		new SuppressEntryChunksPlugin(['bootstrap', 'main'])
	],
	devtool: "source-map"
};

function SuppressEntryChunksPlugin(options) {
	this.options = options;
}

SuppressEntryChunksPlugin.prototype.apply = function (compiler) {
	const options = this.options;

	compiler.plugin('emit', function (compilation, callback) {
		compilation.chunks.forEach(function (chunk) {
			if (options.indexOf(chunk.name) >= 0) {
				chunk.files.forEach(function (file) {
					if (file.indexOf('.js') !== -1) {
						delete compilation.assets[file];
					}
				});
			}
		});
		callback();
	});
};
