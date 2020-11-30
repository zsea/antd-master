import React, { Component } from 'react';
//import {BrowserRouter as Router, Route, Link ,withRouter} from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Modal, Row, Col } from 'antd';
import routes from "../routes"
import Logo from "../components/Headers/Logo"
import Right from "../components/Headers/Right"
import Center from "../components/Headers/Center"
import "../Master.css"
import "./Master.less"
const { Header, Content, Footer, Sider } = Layout;
const theme = process.env["REACT_APP_MENU_THEME"] || "dark";
const media_max_width = 1200;
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
        //console.log(m);
        props.history.push(m.item.props.path);
    }
    return (<Menu  {...ext} mode={props.layout === "top" ? "horizontal" : "inline"}>
        {
            menus.map(MenuItem)
        }
    </Menu>)
});

class MasterBody extends Component {
    state = {
        collapsed: window.localStorage.getItem("antd-master-collapsed") === "true",
        layout: "top",
        isbroken: false,

        //自适应相关
    };
    constructor(props) {
        super(props);


        this.onBreakpoint = this.onBreakpoint.bind(this);


        const mql = window.matchMedia(`(max-width: ${media_max_width}px)`);
        mql.addEventListener("change", this.onBreakpoint);
        //console.log("创建媒体查询");

        this.state.layout = props.layout || "left";
        this.state.isbroken = window.innerWidth < media_max_width;
    }
    onCollapse = collapsed => {
        this.setState({ collapsed });
        //setCookie("collapsed", collapsed ? "true" : "false", 365);
        window.localStorage.setItem("antd-master-collapsed", collapsed ? "true" : "false");
    };
    componentDidMount() {
        //fetch(configure.baseAPI + "/test/setjwt", { mode: 'cors', credentials: "include" })
        //setHistory(this.props.history);
        let collapsed = window.localStorage.getItem("antd-master-collapsed") === "true";
        if (collapsed) {
            this.setState({ collapsed: true });
        }
        else {
            this.setState({ collapsed: false });
        }
    }
    onBreakpoint({ matches }) {
        if (matches !== this.state.isbroken) {
            this.setState({ isbroken: matches });
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
        let stateLayout = this.state.layout;
        if (this.state.isbroken) {
            stateLayout = "top";
        }
        console.log(stateLayout, this.state.isbroken)
        switch (stateLayout) {
            case "left": {
                return <Layout style={{ minHeight: '100vh' }}>
                    <Sider theme={theme} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <Logo broken={this.state.isbroken} collapsed={this.state.collapsed} layout={this.state.layout} />
                        <TMenu broken={this.state.isbroken} layout={this.state.layout} selected={this.props.route.id} opens={this.props.route.menu ? this.props.route.menu.opens : []} menus={routes.filter(p => p.menu && p.menu.text)} />
                    </Sider>
                    <Layout>
                        <Header className="master-header">
                            <Row>
                                <Col span={16}><Center broken={this.state.isbroken} collapsed={this.state.collapsed} layout={this.state.layout} /></Col>
                                <Col span={8}><Right broken={this.state.isbroken} collapsed={this.state.collapsed} layout={this.state.layout} /></Col>
                            </Row>
                        </Header>
                        <Content style={{ margin: '0 16px' }}>
                            <BreadcrumbComponent breadcrumbs={this.props.route.breadcrumb} />
                            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                                <this.props.route.component {...this.props.props} />
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>{process.env.REACT_APP_COPYRIGHT}</Footer>
                    </Layout>
                </Layout>
            }
            case "top": {
                return <Layout style={{ minHeight: '100vh' }}>
                    <Header className="master-header">
                        <Row>
                            <Col span={2}>
                                <Logo broken={this.state.isbroken} collapsed={this.state.collapsed} layout={this.state.layout} />
                            </Col>
                            <Col span={14}>
                                <TMenu broken={this.state.isbroken} layout={this.state.layout} selected={this.props.route.id} opens={this.props.route.menu ? this.props.route.menu.opens : []} menus={routes.filter(p => p.menu && p.menu.text)} />
                            </Col>
                            <Col span={8}><Right broken={this.state.isbroken} collapsed={this.state.collapsed} layout={this.state.layout} /></Col>
                        </Row>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <BreadcrumbComponent breadcrumbs={this.props.route.breadcrumb} />
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <this.props.route.component {...this.props.props} />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>{process.env.REACT_APP_COPYRIGHT}</Footer>
                </Layout>
            }
            case "mix": {
                return <Layout style={{ minHeight: '100vh' }}>
                    <Header className="master-header">
                        <Row>
                            <Col span={8}><Logo broken={this.state.isbroken} collapsed={this.state.collapsed} layout={this.state.layout} /></Col>
                            <Col span={8}><Center broken={this.state.isbroken} collapsed={this.state.collapsed} layout={this.state.layout} /></Col>
                            <Col span={8}><Right broken={this.state.isbroken} collapsed={this.state.collapsed} layout={this.state.layout} /></Col>
                        </Row>
                    </Header>
                    <Layout>
                        <Sider theme={theme} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                            <TMenu broken={this.state.isbroken} layout={this.state.layout} selected={this.props.route.id} opens={this.props.route.menu ? this.props.route.menu.opens : []} menus={routes.filter(p => p.menu && p.menu.text)} />
                        </Sider>
                        <Layout>
                            <Content style={{ margin: '0 16px' }}>
                                <BreadcrumbComponent breadcrumbs={this.props.route.breadcrumb} />
                                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                                    <this.props.route.component {...this.props.props} />
                                </div>
                            </Content>
                            <Footer style={{ textAlign: 'center' }}>{process.env.REACT_APP_COPYRIGHT}</Footer>
                        </Layout>
                    </Layout>
                </Layout>
            }
            default:
                break;
        }
        return <span />
    }
}

export default MasterBody;
