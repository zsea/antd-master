import React, { Component } from 'react';
//import {BrowserRouter as Router, Route, Link ,withRouter} from 'react-router-dom';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Button, Modal } from 'antd';
import './Master.less';
import routes from "./routes"
import { getCookie, setCookie } from "./module/cookie"
import token from "./module/token"
import sleep from "./module/sleep"
import modifyVars from './modifyVars';
const { Header, Content, Footer, Sider } = Layout;

const theme = modifyVars.system["@@theme-name"] || "dark";

function toRouters(item, routerList) {
    //let routerList=[];
    routerList.push(item);
    if (item.children && item.children.length) {
        for (let i = 0; i < item.children.length; i++) {
            toRouters(item.children[i], routerList);
        }
    }
}
function getRouters() {
    let routerList = [];
    for (let i = 0; i < routes.length; i++) {
        toRouters(routes[i], routerList);
    }
    return routerList;
}
const BreadcrumbComponent = props => {

    var breadcrumbs = props.breadcrumbs || [];
    return (<Breadcrumb style={{ margin: '16px 0' }}>
        {breadcrumbs.map((item, i) => <Breadcrumb.Item key={i}>{item}</Breadcrumb.Item>)}
    </Breadcrumb>);
};
const MenuItem = item => {
    let children = item.children;
    if (children && children.length) {
        children = children.filter(p => !!p.menu);
    }
    else {
        children = [];
    }
    if (children.length) {
        return <Menu.SubMenu key={item.id} title={<span>{item.menu && item.menu.icon ? <item.menu.icon /> : null}<span>{item.menu.text}</span></span>}>
            {children.map(MenuItem)}
        </Menu.SubMenu>
    }
    else {
        return <Menu.Item key={item.id} path={item.router.path}>
            {item.menu && item.menu.icon ? <item.menu.icon /> : null}
            <span>{item.menu.text}</span>
        </Menu.Item>;
    }
}
const TMenu = withRouter(props => {

    let menus = props.menus || [];
    let ext = {};
    ext["theme"] = theme;
    ext["defaultSelectedKeys"] = typeof props.selected === "string" ? [props.selected] : props.selected;
    ext["mode"] = "inline";
    ext["defaultOpenKeys"] = typeof props.opens === "string" ? [props.opens] : props.opens;
    ext["onClick"] = m => {
        props.history.push(m.item.props.path);
    }
    return (<Menu  {...ext} onOpenChange={props.onMenuOpenChange}>
        {
            menus.map(MenuItem)
        }
    </Menu>)
});
class MasterBody extends Component {
    state = {
        collapsed: false,
        system_visible: true,
        onMenuOpenChange: null,
        menu_open_keys: []
    };
    static getDerivedStateFromProps(props, state) {
        return {
            onMenuOpenChange: props.onMenuOpenChange,
            menu_open_keys: props.menu_open_keys,
            collapsed: state.collapsed,
            system_visible: state.system_visible
        };
    }
    onCollapse = async collapsed => {
        //console.log(Date.now(), collapsed);
        this.setState({ collapsed });
        //alert(collapsed);
        setCookie("collapsed", collapsed ? "true" : "false", 365);
        if (!collapsed) {
            await sleep(300);
        }
        this.setState({ system_visible: !collapsed });
    };
    constructor(props) {
        super(props);
        this.state.onMenuOpenChange = props.onMenuOpenChange;
        this.state.menu_open_keys = props.menu_open_keys;
        //console.log("aaa");
    }
    componentDidMount() {
        //fetch(configure.baseAPI + "/test/setjwt", { mode: 'cors', credentials: "include" })
        //setHistory(this.props.history);
        let collapsed = getCookie("collapsed");
        if (collapsed === "true") {
            this.setState({ collapsed: true, system_visible: false });
        }
        else if (collapsed === "false") {
            this.setState({ collapsed: false, system_visible: true });
        }
    }
    onLogout = async () => {
        var $continue = await new Promise(function (resolve) {
            Modal.confirm({
                title: "请确认",
                content: "你确定要退出登录吗？",
                onOk: function () {
                    resolve(true);
                },
                onCancel: function () {
                    resolve(false);
                }
            })
        });
        if (!$continue) return;
        //console.log(this.props);
        this.props.props.history.push("/logout");
    }
    render() {


        let accountInfo = token.getAccount();
        //console.log(this.props);
        let backgroud = "#FFFFFF";
        if (modifyVars.system['@@theme-name'] === "light") {
            backgroud = "#FFFFFF";
        }
        else if (modifyVars.system['@@theme-name'] === "dark") {
            backgroud = "#000000";
        }
        return <Layout style={{ minHeight: '100vh' }}>
            <Sider theme={theme} className="antd-master-menu-first-box" collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                <div className="ant-pro-sider-menu-logo" id="logo" style={{ backgroundColor: backgroud }}>
                    <a href="/">
                        <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjIwMHB4IiBoZWlnaHQ9IjIwMHB4IiB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNDcuMSAoNDU0MjIpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPHRpdGxlPkdyb3VwIDI4IENvcHkgNTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPgogICAgICAgIDxsaW5lYXJHcmFkaWVudCB4MT0iNjIuMTAyMzI3MyUiIHkxPSIwJSIgeDI9IjEwOC4xOTcxOCUiIHkyPSIzNy44NjM1NzY0JSIgaWQ9ImxpbmVhckdyYWRpZW50LTEiPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjNDI4NUVCIiBvZmZzZXQ9IjAlIj48L3N0b3A+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMyRUM3RkYiIG9mZnNldD0iMTAwJSI+PC9zdG9wPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IHgxPSI2OS42NDQxMTYlIiB5MT0iMCUiIHgyPSI1NC4wNDI4OTc1JSIgeTI9IjEwOC40NTY3MTQlIiBpZD0ibGluZWFyR3JhZGllbnQtMiI+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMyOUNERkYiIG9mZnNldD0iMCUiPjwvc3RvcD4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzE0OEVGRiIgb2Zmc2V0PSIzNy44NjAwNjg3JSI+PC9zdG9wPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMEE2MEZGIiBvZmZzZXQ9IjEwMCUiPjwvc3RvcD4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgICAgIDxsaW5lYXJHcmFkaWVudCB4MT0iNjkuNjkwODE2NSUiIHkxPSItMTIuOTc0MzU4NyUiIHgyPSIxNi43MjI4OTgxJSIgeTI9IjExNy4zOTEyNDglIiBpZD0ibGluZWFyR3JhZGllbnQtMyI+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNGQTgxNkUiIG9mZnNldD0iMCUiPjwvc3RvcD4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0Y3NEE1QyIgb2Zmc2V0PSI0MS40NzI2MDYlIj48L3N0b3A+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNGNTFEMkMiIG9mZnNldD0iMTAwJSI+PC9zdG9wPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IHgxPSI2OC4xMjc5ODcyJSIgeTE9Ii0zNS42OTA1NzM3JSIgeDI9IjMwLjQ0MDA5MTQlIiB5Mj0iMTE0Ljk0MjY3OSUiIGlkPSJsaW5lYXJHcmFkaWVudC00Ij4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0ZBOEU3RCIgb2Zmc2V0PSIwJSI+PC9zdG9wPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjRjc0QTVDIiBvZmZzZXQ9IjUxLjI2MzUxOTElIj48L3N0b3A+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNGNTFEMkMiIG9mZnNldD0iMTAwJSI+PC9zdG9wPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0ibG9nbyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIwLjAwMDAwMCwgLTIwLjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMjgtQ29weS01IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMC4wMDAwMDAsIDIwLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTI3LUNvcHktMyI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTI1IiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iMiI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNOTEuNTg4MDg2Myw0LjE3NjUyODIzIEw0LjE3OTk2NTQ0LDkxLjUxMjc3MjggQy0wLjUxOTI0MDYwNSw5Ni4yMDgxMTQ2IC0wLjUxOTI0MDYwNSwxMDMuNzkxODg1IDQuMTc5OTY1NDQsMTA4LjQ4NzIyNyBMOTEuNTg4MDg2MywxOTUuODIzNDcyIEM5Ni4yODcyOTIzLDIwMC41MTg4MTQgMTAzLjg3NzMwNCwyMDAuNTE4ODE0IDEwOC41NzY1MSwxOTUuODIzNDcyIEwxNDUuMjI1NDg3LDE1OS4yMDQ2MzIgQzE0OS40MzM5NjksMTU0Ljk5OTYxMSAxNDkuNDMzOTY5LDE0OC4xODE5MjQgMTQ1LjIyNTQ4NywxNDMuOTc2OTAzIEMxNDEuMDE3MDA1LDEzOS43NzE4ODEgMTM0LjE5MzcwNywxMzkuNzcxODgxIDEyOS45ODUyMjUsMTQzLjk3NjkwMyBMMTAyLjIwMTkzLDE3MS43MzczNTIgQzEwMS4wMzIzMDUsMTcyLjkwNjAxNSA5OS4yNTcxNjA5LDE3Mi45MDYwMTUgOTguMDg3NTM1OSwxNzEuNzM3MzUyIEwyOC4yODU5MDgsMTAxLjk5MzEyMiBDMjcuMTE2MjgzMSwxMDAuODI0NDU5IDI3LjExNjI4MzEsOTkuMDUwNzc1IDI4LjI4NTkwOCw5Ny44ODIxMTE4IEw5OC4wODc1MzU5LDI4LjEzNzg4MjMgQzk5LjI1NzE2MDksMjYuOTY5MjE5MSAxMDEuMDMyMzA1LDI2Ljk2OTIxOTEgMTAyLjIwMTkzLDI4LjEzNzg4MjMgTDEyOS45ODUyMjUsNTUuODk4MzMxNCBDMTM0LjE5MzcwNyw2MC4xMDMzNTI4IDE0MS4wMTcwMDUsNjAuMTAzMzUyOCAxNDUuMjI1NDg3LDU1Ljg5ODMzMTQgQzE0OS40MzM5NjksNTEuNjkzMzEgMTQ5LjQzMzk2OSw0NC44NzU2MjMyIDE0NS4yMjU0ODcsNDAuNjcwNjAxOCBMMTA4LjU4MDU1LDQuMDU1NzQ1OTIgQzEwMy44NjIwNDksLTAuNTM3OTg2ODQ2IDk2LjI2OTI2MTgsLTAuNTAwNzk3OTA2IDkxLjU4ODA4NjMsNC4xNzY1MjgyMyBaIiBpZD0iU2hhcGUiIGZpbGw9InVybCgjbGluZWFyR3JhZGllbnQtMSkiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik05MS41ODgwODYzLDQuMTc2NTI4MjMgTDQuMTc5OTY1NDQsOTEuNTEyNzcyOCBDLTAuNTE5MjQwNjA1LDk2LjIwODExNDYgLTAuNTE5MjQwNjA1LDEwMy43OTE4ODUgNC4xNzk5NjU0NCwxMDguNDg3MjI3IEw5MS41ODgwODYzLDE5NS44MjM0NzIgQzk2LjI4NzI5MjMsMjAwLjUxODgxNCAxMDMuODc3MzA0LDIwMC41MTg4MTQgMTA4LjU3NjUxLDE5NS44MjM0NzIgTDE0NS4yMjU0ODcsMTU5LjIwNDYzMiBDMTQ5LjQzMzk2OSwxNTQuOTk5NjExIDE0OS40MzM5NjksMTQ4LjE4MTkyNCAxNDUuMjI1NDg3LDE0My45NzY5MDMgQzE0MS4wMTcwMDUsMTM5Ljc3MTg4MSAxMzQuMTkzNzA3LDEzOS43NzE4ODEgMTI5Ljk4NTIyNSwxNDMuOTc2OTAzIEwxMDIuMjAxOTMsMTcxLjczNzM1MiBDMTAxLjAzMjMwNSwxNzIuOTA2MDE1IDk5LjI1NzE2MDksMTcyLjkwNjAxNSA5OC4wODc1MzU5LDE3MS43MzczNTIgTDI4LjI4NTkwOCwxMDEuOTkzMTIyIEMyNy4xMTYyODMxLDEwMC44MjQ0NTkgMjcuMTE2MjgzMSw5OS4wNTA3NzUgMjguMjg1OTA4LDk3Ljg4MjExMTggTDk4LjA4NzUzNTksMjguMTM3ODgyMyBDMTAwLjk5OTg2NCwyNS42MjcxODM2IDEwNS43NTE2NDIsMjAuNTQxODI0IDExMi43Mjk2NTIsMTkuMzUyNDQ4NyBDMTE3LjkxNTU4NSwxOC40Njg1MjYxIDEyMy41ODUyMTksMjAuNDE0MDIzOSAxMjkuNzM4NTU0LDI1LjE4ODk0MjQgQzEyNS42MjQ2NjMsMjEuMDc4NDI5MiAxMTguNTcxOTk1LDE0LjAzNDAzMDQgMTA4LjU4MDU1LDQuMDU1NzQ1OTIgQzEwMy44NjIwNDksLTAuNTM3OTg2ODQ2IDk2LjI2OTI2MTgsLTAuNTAwNzk3OTA2IDkxLjU4ODA4NjMsNC4xNzY1MjgyMyBaIiBpZD0iU2hhcGUiIGZpbGw9InVybCgjbGluZWFyR3JhZGllbnQtMikiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTUzLjY4NTYzMywxMzUuODU0NTc5IEMxNTcuODk0MTE1LDE0MC4wNTk2IDE2NC43MTc0MTIsMTQwLjA1OTYgMTY4LjkyNTg5NCwxMzUuODU0NTc5IEwxOTUuOTU5OTc3LDEwOC44NDI3MjYgQzIwMC42NTkxODMsMTA0LjE0NzM4NCAyMDAuNjU5MTgzLDk2LjU2MzYxMzMgMTk1Ljk2MDUyNyw5MS44Njg4MTk0IEwxNjguNjkwNzc3LDY0LjcxODExNTkgQzE2NC40NzIzMzIsNjAuNTE4MDg1OCAxNTcuNjQ2ODY4LDYwLjUyNDE0MjUgMTUzLjQzNTg5NSw2NC43MzE2NTI2IEMxNDkuMjI3NDEzLDY4LjkzNjY3NCAxNDkuMjI3NDEzLDc1Ljc1NDM2MDcgMTUzLjQzNTg5NSw3OS45NTkzODIxIEwxNzEuODU0MDM1LDk4LjM2MjM3NjUgQzE3My4wMjM2Niw5OS41MzEwMzk2IDE3My4wMjM2NiwxMDEuMzA0NzI0IDE3MS44NTQwMzUsMTAyLjQ3MzM4NyBMMTUzLjY4NTYzMywxMjAuNjI2ODQ5IEMxNDkuNDc3MTUsMTI0LjgzMTg3IDE0OS40NzcxNSwxMzEuNjQ5NTU3IDE1My42ODU2MzMsMTM1Ljg1NDU3OSBaIiBpZD0iU2hhcGUiIGZpbGw9InVybCgjbGluZWFyR3JhZGllbnQtMykiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2UgaWQ9IkNvbWJpbmVkLVNoYXBlIiBmaWxsPSJ1cmwoI2xpbmVhckdyYWRpZW50LTQpIiBjeD0iMTAwLjUxOTMzOSIgY3k9IjEwMC40MzY2ODEiIHJ4PSIyMy42MDAxOTI2IiByeT0iMjMuNTgwNzg2Ij48L2VsbGlwc2U+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==" alt="logo" />
                        {this.state.system_visible ? <h1>{modifyVars.system["@@system-name"]}</h1> : null}
                    </a>
                </div>
                <TMenu onMenuOpenChange={this.state.onMenuOpenChange} selected={this.props.route.id} opens={this.state.menu_open_keys} menus={routes.filter(p => p.menu && p.menu.text)} />
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: "0 32 0 0", textAlign: "right" }}>
                    {accountInfo ? <span>欢迎您！{accountInfo.nick || accountInfo.name || accountInfo.username}，<Button type="link" onClick={this.onLogout}>退出登录</Button></span> : <Button type="link" onClick={() => this.props.props.history.push("/login", { redirect: { location: this.props.props.location } })}>登录</Button>}
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <BreadcrumbComponent breadcrumbs={this.props.route.breadcrumb} />
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <this.props.route.component {...this.props.props} />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>{modifyVars.system["@@system-copyright"]}</Footer>
            </Layout>
        </Layout>;
    }
}

class Master extends Component {
    state = {
        menu_open_keys: [],
        routerList: [],
        access_info: null
    }
    componentDidMount() {
        let routerList = getRouters();
        let menu_open_keys = [];
        for (let i = 0; i < routerList.length; i++) {
            if (routerList[i].menu && routerList[i].menu.opens) {
                menu_open_keys = menu_open_keys.concat(routerList[i].menu.opens);
            }
        }
        this.setState({
            routerList: routerList,
            menu_open_keys: menu_open_keys,
            access_info: token.getAccount()
        })
    }
    render() {
        //let routerList = getRouters();
        return (<Switch>
            {this.state.routerList.map((route, i) => (
                <Route
                    key={route.key || i}
                    path={route.router.path}
                    exact={route.router.exact}
                    strict={route.router.strict}
                    render={(props) => {
                        //var authed = ;
                        //console.log(getCookie("seller_nick"))
                        if (!route.requiresAuth || this.state.access_info) {
                            let MLayout = MasterBody;
                            if (route.layout) {
                                MLayout = route.layout;
                            }
                            return (
                                <MLayout props={props} route={route} onMenuOpenChange={(openKeys) => {
                                    //console.log(openKeys)
                                    this.setState({
                                        menu_open_keys: openKeys
                                    })
                                }} menu_open_keys={this.state.menu_open_keys} />
                            );
                        }
                        return <Redirect to={{ pathname: "/login", redirect: { location: props.location } }} />
                    }}
                />
            ))}
        </Switch>
        );
    }
}

export default Master;