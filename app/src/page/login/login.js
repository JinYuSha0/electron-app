import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class PageLogin extends Component {
    render() {
        return (
            <h1>login</h1>
        )
    }
}

export default connect(
    ({}) => ({}),
    (dispatch) => bindActionCreators({
    }, dispatch)
)(PageLogin)