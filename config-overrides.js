const { override, fixBabelImports, addWebpackPlugin,addLessLoader  } = require('customize-cra');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const modifyVars=require("./src/modifyVars")
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addWebpackPlugin(new AntdDayjsWebpackPlugin()),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: modifyVars,
    })
);