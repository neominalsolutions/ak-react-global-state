const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.tsx',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	devServer: {
		historyApiFallback: true,
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx'],
	},
	module: {
		// dışarıdan webpack uygulanacak olan paketler. loaders
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/, // node_modules deki dosyaları hariç tut
				use: 'babel-loader',
			},
			{
				// düze css uzantılı dosya config css-loader ve style-loader
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				loader: 'file-loader',
				options: {
					outputPath: './assets/images',
				},
			},
			{
				// sass ve sass-loader paketleri üzerinden
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
	plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
};

// __dirname => nodejs root directory
// filename => uygulama paketleninceki isim
// entry => uygulamanın boostrapt edileceği ana dosya
// path => nodejs path module
// output => çıktının verisilmesi için gerekli olan ayar
