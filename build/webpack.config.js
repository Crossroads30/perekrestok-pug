const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const PugPlugin = require('pug-plugin');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/',
};

const PAGES_DIR = `${PATHS.src}/pug/pages`;
const PAGES = fs.readdirSync(PAGES_DIR).filter((fileName) => fileName.endsWith('.pug'));

module.exports = {
    mode: 'development',
    entry: {
        app: PATHS.src,
        module: `${PATHS.src}/index.js`,
    },
    output: {
        filename: `js/[name].[hash].js`,
        path: PATHS.dist,
        publicPath: '/',
        clean: true,
        assetModuleFilename: '[name][ext]',
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'assets/favicon'),
        },
        port: 8080,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|mp3)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                // loader: PugPlugin.loader,
                // use: [
                //     {
                //       loader: "pug-loader",
                //     },
                //   ],
                // oneOf: [
                //     {
                //         use: ['pug-loader'],
                //     },
                // ],
            },
            {
                test: /\.(css|sass|scss)$/,
                use: ['css-loader', 'sass-loader'],
                //☝🏽 Load Sass files
            },
            {
                // To use images on pug files:
                test: /\.(png|jpg|jpeg|ico)/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/img/[name].[hash:8][ext]',
                },
            },
            {
                // To use fonts on pug files:
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext][query]',
                },
            },
        ],
    },
    resolve: {
        alias: {
            '~': PATHS.src,
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].[hash].css`,
        }),
        ...PAGES.map(
            (page) =>
                new HtmlWebpackPlugin({
                    template: `${PAGES_DIR}/${page}`,
                    filename: `./${page.replace(/\.pug/, '.html')}`,
                })
        ),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: `${PATHS.src}/style`,
                    to: `${PATHS.dist}/style`,
                },
                {
                    from: `${PATHS.src}/assets/fonts`,
                    to: `${PATHS.dist}/assets/fonts`,
                },
                {
                    from: `${PATHS.src}/assets/img`,
                    to: `${PATHS.dist}/assets/img`,
                },
                {
                    from: `${PATHS.src}/assets/favicon`,
                    to: `${PATHS.dist}`,
                },
            ],
        }),
        // new PugPlugin({
        //     pretty: true,
        //     //☝🏽 Format HTML (only in dev mode)
        //     extractCss: {
        //         filename: 'assets/css/[name].[contenthash:8].css',
        //     },
        // }),
    ],
};
