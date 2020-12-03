import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, message, Tabs, Row, Col, Modal } from 'antd';
import { UserOutlined, LockOutlined, MobileOutlined, MailOutlined } from '@ant-design/icons';
import axios from "axios"
import md5 from "md5"
import QRCode from 'qrcode.react'
import "./login.css"
class Login extends Component {
    state = {
        remember: false,
        username: ""
    }
    constructor(props) {
        super(props);
        this.onAccountLogin = this.onAccountLogin.bind(this);
        this.onMobileLogin = this.onMobileLogin.bind(this);
        this.state.remember = window.localStorage.getItem("antd-master-rember-user") === "true";
        this.state.username = window.localStorage.getItem("antd-master-username");
    }
    componentDidMount() {
        //this.Logining();
        this.setState({ remember: true });
    }
    async onAccountLogin(options) {
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
            window.localStorage.setItem("antd-master-rember-user", "true")
            window.localStorage.setItem("antd-master-username", options.username)
        }
        else {
            window.localStorage.removeItem("antd-master-rember-user");
            window.localStorage.removeItem("antd-master-username");
        }
        this.props.history.push("/");
    }
    async onMobileLogin(options) {
        Modal.error({
            title: "未实现",
            content: "当前功能未实现。"
        })
    }
    render() {
        return (<div className="login-box">
            <div className="login-box-title"><img className="login-box-title-logo" alt="" src="https://preview.pro.ant.design/static/logo.f0355d39.svg" />系统登陆</div>
            <Tabs defaultActiveKey="pwd_login">
                <Tabs.TabPane tab="账号密码登录" key="pwd_login">
                    <Form
                        initialValues={{ remember: this.state.remember, username: this.state.username }}
                        onFinish={this.onAccountLogin}
                        size="large"
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: '请输入登陆账号!' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="登陆账号" autoComplete="off" />
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
                    </Form>
                </Tabs.TabPane>
                <Tabs.TabPane tab="手机号码登录" key="mobile_login">
                    <Form
                        initialValues={{ remember: this.state.remember, username: this.state.username }}
                        onFinish={this.onMobileLogin}
                        size="large"
                    >
                        <Form.Item
                            name="mobile"
                            rules={[{ required: true, message: '请输入手机号码!' }]}
                        >
                            <Input prefix={<MobileOutlined />} placeholder="手机号码" />
                        </Form.Item>
                        <Form.Item>
                            <Row gutter={8}>
                                <Col span={16}>
                                    <Form.Item
                                        name="code"
                                        rules={[{ required: true, message: '请输入验证码!' }]}
                                        noStyle
                                    >
                                        <Input
                                            prefix={<MailOutlined />}
                                            type="text"
                                            placeholder="验证码"
                                            autoComplete="off"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Button>发送验证码</Button>
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>记住手机号码</Checkbox>
                            </Form.Item>
                        </Form.Item>

                        <Form.Item>
                            <Button block type="primary" htmlType="submit">
                                立即登陆
                </Button>
                        </Form.Item>
                    </Form>
                </Tabs.TabPane>
                <Tabs.TabPane tab="二维码登录" key="qr_login">
                    <div className="login-box-qr-warp">
                        <div className="login-box-qr">
                            <QRCode fgColor="#1DA57A" size={300} value="https://github.com/zsea/antd-master" />
                        </div>
                    </div>
                </Tabs.TabPane>
            </Tabs>
        </div>
        );

    }
}
export default Login;