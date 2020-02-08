import React from 'react';
import ReactDOM from 'react-dom';
import Master from './Master';
import { BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import {ConfigProvider} from "antd"
import zhCN from 'antd/es/locale/zh_CN';

const supportsHistory = !!window.history["pushState"];
ReactDOM.render((
    <Router forceRefresh={!supportsHistory}>
        <ConfigProvider locale={zhCN}>
            <Master />
        </ConfigProvider>
    </Router>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
