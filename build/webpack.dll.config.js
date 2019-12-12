const webpack = require('webpack');
const path = require('path');
/**
 * 以vue2 为核心的dll包，应该主要包括vue，axios，lodash.
 * 像vue-router,vuex,我们非spa项目，基本用不到。vue-router可以用，方便在同一个页面
 * 切换不同的view
 * 像echart，主要是一个页面使用，不需要打入到vue包中。externals就可以了
 * @type {string[]}
 */

const vendors = [
    'vue/dist/vue.esm.js',
    'vue-router',
    'axios',
    'element-ui'
];
const dllPath = path.resolve(__dirname, '../public/assets/vendors/dll');

module.exports = {
    output: {
        path: dllPath,
        filename: '[name].js',
        library: '[name]_[chunkhash]',
    },
    entry: {
        vue_base_dll: vendors,
    },
    plugins: [
        new webpack.DllPlugin({
            path:  path.join(dllPath,"[name]-manifest.json"),
            name: '[name]_[chunkhash]',
            context: dllPath,
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ],
};
