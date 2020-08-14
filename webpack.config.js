const fs = require("fs");
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require("webpack");

const userscriptHeader = fs.readFileSync("./userscript-header.js", "utf-8");
const styleRules = fs.readFileSync("./src/style.css", "utf-8");

module.exports = {
    mode: "development",
    //mode: "production",
    entry: './src/forums-of-loathing/main.ts',
    output: {
        filename: 'fmu.user.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        alias: {
            '@': path.resolve('src')
        },
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                use: [{
                    loader: "ts-loader",
                    options: {
                        appendTsSuffixTo: [/\.vue/]
                    }
                }],
                exclude: /node_modules/,

            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.vue$/, // ファイルが.vueで終われば...
                loader: 'vue-loader' // vue-loaderを使う
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader'] // css-loader -> vue-style-loaderの順で通していく
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.BannerPlugin({
            banner: userscriptHeader + "GM_addStyle(`" + styleRules + "`);",
            entryOnly: true,
            raw: true
        })],

    target: "web"
};