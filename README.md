淘易易用户中心，包括店群的一些功能。

> 该项目基于```create-react-app```创建。

# 标题

在```public/index.html```中设置。

# 路由和菜单

在```src/routes.js```设置。

## 配置

|配置项|默认值|描述|
|---|---|---|
|id| |在所有配置项中必须唯一|
|router| |路由相关配置|
|router.path| | 访问路径|
|router.exact| | |
|router.strict| | |
|requiresAuth|false|是否需要登录认证|
|breadcrumb| |导航面包销，类型为数组|
|component| |对应的React部件|
|icon| |图标|
|menu| |菜单设置，若没有该项，则不会在左则菜单栏显示|
|menu.text| |菜单名称|
|menu.icon| |菜单图标|
|menu.opens|[]|需要展开的菜单项|
|children|[]|子菜单项|
|layout|MasterBody|母版页|

# 变量设置

> 变量通过根目录下```.env```文件进行设置。

|名称|默认值|描述|
|---|---|---|
|REACT_APP_COPYRIGHT| |页面脚部版权信息的设置|
|REACT_APP_SYSTEMT_NAME| |系统名称设置|

# 目录结构

* /src/ 源代码目录
    * /src/components/ 用户编写的组件。
    * /src/Layout/ 布局文件，目前仅有```FullLayout```。
    * /src/module/ 一些常用的模块
    * /src/icons.js 图标配置
    * /src/Master.js 母版页
    * /src/routes.js 路由配置
    * /src/NotFound.js 404页面配置
* /public/ 页面结构设置
