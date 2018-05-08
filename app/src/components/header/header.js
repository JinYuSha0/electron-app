import './header.less'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { jump } from '../../util/util'
import { ipcRenderer } from 'electron'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isMax: false
        }
    }

    onMinClick() {
        ipcRenderer.send('minimize-window')
    }

    onMaxClick() {
        ipcRenderer.send('maximize-window')
        this.setState({ isMax: true })
    }

    onUnMaxClick() {
        ipcRenderer.send('unmaximize-window')
        this.setState({ isMax: false })
    }

    onCloseClick() {
        ipcRenderer.send('close-all-window')
    }

    render() {
        const { isMax } = this.state
        return (
            <header className="layoutHeader">
                <div className="headerLogo" onClick={() => {jump('/')}}>
                    <span className="logo"/>
                    <h2>electron脚手架</h2>
                </div>

                <div className="headerController">
                    <span className="icon min" onClick={this.onMinClick}/>
                    {
                        isMax ? <span className="icon unmax" onClick={this.onUnMaxClick.bind(this)}/> :
                            <span className="icon max" onClick={this.onMaxClick.bind(this)}/>
                    }
                    <span className="icon close" onClick={this.onCloseClick}/>
                </div>
            </header>
        )
    }
}

export default connect(
    ({}) => ({}),
    (dispatch) => bindActionCreators({
    }, dispatch)
)(Header)
