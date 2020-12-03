import React, { Component } from 'react';
class LoginLayout extends Component {

    render() {
        return <div>
            <div style={{height:50}} />
            <this.props.route.component {...this.props.props} />
        </div>
    }
}
export default LoginLayout;