import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from "axios"
import md5 from "md5"
import { setCookie, getCookie } from "../module/cookie"
class Login extends Component {
    state = {
        remember: false,
        username: ""
    }
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state.remember = getCookie("is_remember") !== "false";
        this.state.username = getCookie("remember_username") || "";
    }
    componentDidMount() {
        //this.Logining();
        this.setState({ remember: true });
    }
    async onSubmit(options) {
        message.success("正在登陆...");
        this.props.history.push("/");
        return;
        let form = {
            username: options.username,
            time: Date.now()
        }
        let pwd = md5(md5(`${options.username}#${options.password}`) + "#" + form.time);
        form["password"] = pwd;
        let response = await axios.post("/api/login", form);
        if (!response) return;
        response = response.data;
        if (!response.success) {
            message.error(response.message || "系统繁忙，请稍后再试。");
            return;
        }
        if (options.remember) {
            setCookie("remember_username", options.username, 365);
            setCookie("is_remember", "true", 365);
        }
        else {
            setCookie("remember_username", "", -1);
            setCookie("is_remember", "", -1);
        }
        this.props.history.push("/");
    }
    render() {
        return (<div style={{ width: "300px", margin: "0px auto" }}>
            <div style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold", height: "30px", margin: "15px 0px" }}>系统登陆</div>
            <Form
                initialValues={{ remember: this.state.remember, username: this.state.username }}
                onFinish={this.onSubmit}
                size="large"
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: '请输入登陆账号!' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="登陆账号" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入登陆密码!' }]}
                >
                    <Input
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="登陆密码"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>记住登陆账号</Checkbox>
                    </Form.Item>
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        立即登陆
                </Button>
                </Form.Item>
            </Form></div>
        );

    }
}
export default Login;