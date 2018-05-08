import './index.less'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

class PageIndex extends Component {
    render() {
        return (
            <div>
                <h1>Hello World!</h1>
                <Link to="/login">login</Link>
            </div>
        )
    }
}

export default connect(
    ({}) => ({}),
    (dispatch) => bindActionCreators({
    }, dispatch)
)(PageIndex)