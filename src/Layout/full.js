import React, { Component } from 'react';
import { Layout } from 'antd';
import './full.css';
const { Header, Content, Footer } = Layout;

class FullLayout extends Component {
    render() {
        return <Layout className="layout">
            <Header>
                <div className="logo" />
                
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div style={{margin:"16px 0px",height:"22px"}}></div>
                <div className="site-layout-content"> <this.props.route.component {...this.props.props} /></div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>{process.env.REACT_APP_COPYRIGHT}</Footer>
        </Layout>
    }
}
export default FullLayout;