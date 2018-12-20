const webpack = require('webpack')
const path = require('path')
const isProduction = process.env.NODE_ENV === 'production'

const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const DIST_PATH = path.resolve('./dist')

const config = {
    mode: isProduction ? 'production' : 'development',
    entry: {
        build: './src/main.js'
    },
    output: {
        path: DIST_PATH,
        filename: '[name].js',
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                extractCSS: false
            }
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [/src/, /fontawesome/]
        }, {
            test: /\.css$/,
            oneOf: [
                {
                    resourceQuery: /module/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        { loader: 'css-loader', options: { modules: true } }
                    ]
                }, {
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        { loader: 'css-loader' }
                    ]
                }
            ],
        }, {
            test: /\.(ttf|eot|svg|woff2?)/,
            loader: 'url-loader'
        }]
    },
    externals: {
        'AMap': 'window.AMap'
    },
    resolve: {
        extensions: ['.vue', '.js', '.css'],
        alias: {
            '@fortawesome/fontawesome-free-solid$': '@fortawesome/fontawesome-free-solid/shakable.es.js'
        }
    },
    plugins: [
        // expose and write the allowed env vars on the compiled bundle
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inlineSource: isProduction ? '.(js|css)$' : '',
            // favicon: path.resolve(__dirname, './src/favicon.png')
        }),
        new HtmlWebpackInlineSourcePlugin(),
        new MiniCssExtractPlugin({ filename: '[name].css' }),
        new VueLoaderPlugin()
    ],
    devtool: isProduction ? '' : '#source-map',
    devServer: {
        port: 2333,
        contentBase: DIST_PATH,
        historyApiFallback: {
            index: '/index.html'
        }
    }
}


if (isProduction) {
    config.plugins.push(new webpack.optimize.ModuleConcatenationPlugin())
}


module.exports = config