import React, { Component } from 'react';

class Index extends Component{
    componentDidMount(){
        setTimeout(()=>{
            let breadcrumbs=this.props.breadcrumbs||[];
            breadcrumbs.push("新增加的");
            this.props.setBreadcrums(breadcrumbs);
        },5000)
    }
    render(){
        console.log(this.props);
        return <div>欢迎使用antd模板。</div>
    }
}

export default Index;