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
        rules: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['@babel/preset-react']
                }
            },
            { test: /\.xml$/,
              loader: 'xml-loader'
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    node: {
        fs: 'empty'
    }
};
