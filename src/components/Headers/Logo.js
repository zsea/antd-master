import React, { Component } from 'react';

import "./Logo.css"
class Logo extends Component {
    state = {
        collapsed: false,
        broken: false,
        layout: "left"
    }
    constructor(props) {
        super(props);
        this.state.collapsed = props.collapsed;
        this.state.broken = props.broken;
        this.state.layout = props.layout;
    }
    static getDerivedStateFromProps(props, state) {
        return { ...props };
    }
    render() {
        return <div className="antd-master-logo">
            <a href="/">
                <img src="https://preview.pro.ant.design/static/logo.f0355d39.svg" alt="logo" />
                {this.state.collapsed || this.state.broken ? null : <h1>{process.env.REACT_APP_SYSTEMT_NAME}</h1>}
            </a>
        </div>
    }
}

export default Logo;