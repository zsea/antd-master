const { override, fixBabelImports, addWebpackPlugin,addLessLoader  } = require('customize-cra');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addWebpackPlugin(new AntdDayjsWebpackPlugin()),
    addLessLoader({
        lessOptions:{
            javascriptEnabled: true,
            modifyVars: {'@master-header-backgroud-color':"white", '@primary-color': '#1DA57A' },
        }
        
    })
);