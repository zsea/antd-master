import React, { Component } from 'react';
//import {BrowserRouter as Router, Route, Link ,withRouter} from 'react-router-dom';
import { message, Result, Button } from "antd"
import { Route, Switch } from 'react-router-dom'
import routes from "./routes"
import MasterBody from "./Layout/MasterLayout"
import { IsNeedAuthorization, Authorization } from "./power"

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
class Power extends Component {
    state = {
        STATUS: "AUTH",
        REFRESH: false
    }
    constructor(props) {
        super(props);
        this.innerAuthorization = this.innerAuthorization.bind(this);
    }
    async componentDidMount() {
        this.innerAuthorization();
    }
    async innerAuthorization() {
        let { id } = this.props.route;
        let isNeedAuthorization = await IsNeedAuthorization(id);
        if (!isNeedAuthorization) {
            this.setState({ STATUS: "OK" });
            return;
        }
        let closer = message.loading("正在加载，请稍后...", 0);
        let ok = await Authorization(id);
        closer();
        if (!ok) {
            this.setState({ STATUS: "NOACCESS" });
            return;
        }
        else {
            this.setState({ STATUS: "OK" });
            return;
        }
    }
    render() {
        if (this.state.STATUS === "AUTH") {
            return <span />
        }
        else if (this.state.STATUS === "NOACCESS") {
            return <Result
                status="error"
                title="禁止访问"
                subTitle="你没有权限进行当前操作，请与管理员进行确认。"
                extra={[
                    <Button type="primary" disabled={this.state.REFRESH} key="refresh" onClick={async () => {
                        this.setState({ REFRESH: true });
                        await this.innerAuthorization();
                        this.setState({ REFRESH: false });
                    }}>
                        刷新
              </Button>,
                    <Button key="login" onClick={() => {
                        this.props.props.history.push("/login");
                    }}>登陆</Button>,
                ]}
            />
        }
        else if (this.state.STATUS === "OK") {
            let Layout = this.props.layout;
            return <Layout props={this.props.props} route={this.props.route} />
        }
        else {
            return <Result
                status="error"
                title="禁止访问"
                subTitle="你没有权限进行当前操作，请与管理员进行确认。"
                extra={[
                    <Button type="primary" disabled={this.state.REFRESH} key="refresh" onClick={async () => {
                        this.setState({ REFRESH: true });
                        await this.innerAuthorization();
                        this.setState({ REFRESH: false });
                    }}>
                        刷新
              </Button>,
                    <Button key="login" onClick={() => {
                        this.props.props.history.push("/login");
                    }}>登陆</Button>,
                ]}
            />
        }
    }
}
class Master extends Component {
    render() {
        let routerList = getRouters();
        return (<Switch>
            {routerList.map((route, i) => (
                <Route
                    key={route.key || i}
                    path={route.router.path}
                    exact={route.router.exact}
                    strict={route.router.strict}
                    render={(props) => {
                        let MLayout = MasterBody;
                        if (route.layout) {
                            MLayout = route.layout;
                        }
                        return <Power layout={MLayout} props={props} route={route} />;
                    }}
                />
            ))}
        </Switch>
        );
    }
}

export default Master;