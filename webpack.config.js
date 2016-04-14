'use strict';


const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack  = require('webpack');
const path  = require('path');
module.exports = {
	// context: __dirname + '/vendor/js/',// обсалютный путь до папки с модулями, чтоб постоянно не писать в их адрес /frontend
	entry: './vendor/js/main.js',
	output:{
		path: __dirname + '/app/js',//т.к. собирается несколько модулей, то указывается обсалютный путь к папке с собранными модулями 
		filename: '[name].js', //название итоговых файлов
		library: '[name]'
	},
	// watch: true,//смотрит за файлами
	// watchOptions:{
	// 	agregateTimeoute: 100
	// },
	// devtool: NODE_ENV == 'development' ? '#source-map' : null,

	plugins:[
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			NODE_ENV:JSON.stringify(NODE_ENV)
		})//,
		// new webpack.optimize.CommonsChunkPlugin({  //оптимизирует 1 файл в несколько " Общий и Доп. "
		// 	name:'common'
		// })
	],
	resolve:{
		modulesDirectories:['node_modules'],
		extensions:['','.js']
	},

	resolveLoader:{
		modulesDirectories:['node_modules'],
		modulesTemplates:['*-loader'],
		extensions:['','.js']
	},

	module: {
	  loaders: [
	    {
	      test: /\.js$/,
	      exclude: /(node_modules|bower_components)/,
	      loader: 'babel',
	      query: {
	        presets: ['es2015']
	      }
	    }
	  ]
	}

};