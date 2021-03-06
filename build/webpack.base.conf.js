const path = require('path');
const webpack = require('webpack');
const pkg = require('../package.json');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

function resolve(dir) {
    return path.resolve(__dirname, '..', dir)
}

module.exports = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: [
                            'vue-style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    compilerOptions: {
                                        preserveWhitespace: false
                                    }
                                }
                            }
                        ],
                        scss: [
                            'vue-style-loader',
                            {
                                loader: 'css-loader',
                            },
                            {
                                loader: 'sass-loader',
                            }
                        ]
                    },
                    postLoaders: {
                        html: 'babel-loader?sourceMap'
                    },
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loaders: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                ]
            },
            {
                test: /\.scss$/,
                loaders: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                    }
                ]
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
        }
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DefinePlugin({
            'process.env.VERSION': `${pkg.version}`
        }),
        new VueLoaderPlugin(),
        new ProgressBarPlugin(),
    ],
};