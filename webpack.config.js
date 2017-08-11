var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry:
        {
            index: './components/index.jsx'
        },
    output: {
        path: path.resolve(__dirname, 'public/javascripts/app/'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            { test: /\.xml$/,
              loader: 'xml-loader'
            }
        ]
    },
    node: {
        fs: 'empty'
    }
};
