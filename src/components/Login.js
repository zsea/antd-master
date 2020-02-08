import React, { Component } from 'react';
import { Result } from 'antd';
import { LoadingIcon } from "../icons"
import qs from "querystring"
class Login extends Component {
    constructor(props) {
        super(props);
        this.Logining = this.Logining.bind(this);
    }
    componentDidMount() {
        this.Logining();
    }
    async Logining() {
        let search = window.location.search;
        if (search) {
            search = search.replace(/^\?/ig, '');
        }
        let query = qs.parse(search);
        let code = query.code;
        if (!code) {
            window.location.href = `http://login.tao11.la/login.html?redirect_uri=${encodeURIComponent(window.location.href)}&appkey=9`;
            return;
        }
        //开始登录
    }
    render() {
        return <Result
            icon={<span style={{ fontSize: '120px', color: "green" }}><LoadingIcon rotate={10} /></span>}
            title="正在登录..."
            subTitle="当前正在登录，若长时间没有响应，请刷新页面。"
            extra={[]}
        />

    }
}
export default Login;