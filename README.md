一个基于antd的模板

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

> 通过目录```/src/modifyVars.js```进行设置。

变量分为两种类型，```antd```字段的变量为```antd```自定义皮肤的设置，请参考```antd```[文档](https://ant.design/docs/react/customize-theme-cn)。```system```为系统变量设置，通这该字段进行系统的相关配置。

|名称|默认值|描述|
|---|---|---|
|@@system-copyright| |页面脚部版权信息的设置|
|@@system-name| |系统名称设置|
|@@theme-name|dark |菜单样式，可选值：```light\|dark```|

# 目录结构

* /src/ 源代码目录
    * /src/components/ 用户编写的组件。
    * /src/Layout/ 布局文件，目前仅有```FullLayout```与```EmptyLayout```。
    * /src/module/ 一些常用的模块
    * /src/icons.js 图标配置
    * /src/Master.js 母版页
    * /src/routes.js 路由配置
    * /src/NotFound.js 404页面配置
    * /src/modifyVars.js 变量设置文件
* /public/ 页面结构设置

# 网络请求

通过```npm```安装了```axios```插件，在```axios```请求时，自动显示```正在请求，请稍后...```文字，可以通过文件```/src/module/nethook.js```进行修改，也可以在```/src/index.js```中，移除```netHook()```的调用。

# 身份认证

默认读取```cookie```中，名称为```token```的值进做为身份认证信息，使用```JWT```进行编码。在身份判断时，通过判断```exp```值判断身份信息是否过期。

> 身份认证仅在客户端进行预判断，你在服务端仍然需要进行身份认证校验。

若你要使用其它身份认证方式，请修改```/src/module/token.js```。
