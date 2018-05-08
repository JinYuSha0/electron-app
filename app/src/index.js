import './index.less'

import React, { Component } from 'react'
import { render } from 'react-dom'
import createStore from './redux/createStore'
import rootReducer from './redux/rootReducer'
import rootSaga from './saga/rootSaga'
import createHistory from 'history/createHashHistory'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Route, Switch, Link } from 'react-router-dom'
import { ipcRenderer } from 'electron'

import Header from './components/header/header'

import PageIndex from './page/index/index'
import PageLogin from './page/login/login'

const root = document.getElementById('app')
export const history = createHistory()
export const { store, persistor } = createStore(rootReducer, rootSaga, () => {
    ipcRenderer.send('show-window')
    render(<App/>, root)
})

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div className="layout">
                        <Header/>

                        <div className="layoutContent">
                            <Switch>
                                <Route exact path="/" component={PageIndex}/>
                                <Route path="/login" component={PageLogin}/>
                            </Switch>
                        </div>
                    </div>
                </ConnectedRouter>
            </Provider>
        )
    }
}