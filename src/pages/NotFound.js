import React, { Component } from 'react';
import { Result } from 'antd';

class NotFound extends Component{
    render(){
        return <Result
        status="404"
        title="404"
        subTitle="对不起，你访问的页面不存在。"

      />
    }
}

export default NotFound;