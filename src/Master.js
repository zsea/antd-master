import React, { Component } from 'react';
//import {BrowserRouter as Router, Route, Link ,withRouter} from 'react-router-dom';
import { Route, Redirect, Switch } from 'react-router-dom'

import routes from "./routes"
import MasterBody from "./Layout/MasterLayout"
import { getCookie } from "./module/cookie"



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
                        //var authed = ;
                        //console.log(getCookie("seller_nick"))
                        if (!route.requiresAuth || !!getCookie("account_info")) {
                            let MLayout = MasterBody;
                            if (route.layout) {
                                MLayout = route.layout;
                            }
                            return (
                                <MLayout props={props} route={route} />
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