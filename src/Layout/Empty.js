import React, { Component } from 'react';
class Empty extends Component {
    render() {
        return <this.props.route.component {...this.props.props} />
    }
}
export default Empty;