const path = require("path")
const outputPath = path.join(__dirname, 'dist')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")

module.exports = {
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        path: outputPath,
        filename: "index.js"
    },
    plugins: [
        new CleanWebpackPlugin(),
        new TerserPlugin({extractComments:false}),
        new CopyWebpackPlugin({patterns: [{from: 'public', to: outputPath}]})
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [['@babel/preset-env', {targets: {chrome: 91}}], '@babel/preset-react'],
                    plugins: [
                        '@babel/plugin-proposal-class-properties',
                        ['import', {
                            libraryName: '@material-ui/core',
                            libraryDirectory: 'esm',
                            camel2DashComponentName: false
                        }, 'core'],
                        ['import', {
                            libraryName: '@material-ui/lab',
                            libraryDirectory: 'esm',
                            camel2DashComponentName: false
                        }, 'lab'],
                        ['import', {
                            libraryName: '@material-ui/icons',
                            libraryDirectory: 'esm',
                            camel2DashComponentName: false
                        }, 'icons']
                    ]
                }
            }
        ]
    }
}