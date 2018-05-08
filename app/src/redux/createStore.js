import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import thunkMiddleware from 'redux-thunk'
import { persistReducer, persistStore } from 'redux-persist'
import persistConfig from '../config/persistConfig'

/**
 * 创建store
 * @param rootReducer
 * @param rootSaga
 * @returns {store, persistor}
 */

export default (rootReducer, rootSaga, onRehydrate) => {
    const middleware = []
    const enhancers = []

    // saga中间件
    const sagaMiddleware = createSagaMiddleware()
    middleware.push(sagaMiddleware)

    // log中间件
    const SAGA_LOGGING_BLACKLIST = ['EFFECT_TRIGGERED', 'EFFECT_RESOLVED', 'EFFECT_REJECTED']
    if (process.env.NODE_ENV !== 'production') {
        const logger = createLogger({
            predicate: (getState, { type }) => SAGA_LOGGING_BLACKLIST.indexOf(type) === -1
        })
        middleware.push(logger)
    }

    middleware.push(thunkMiddleware)

    // 合并中间件
    enhancers.push(applyMiddleware(...middleware))

    // persist
    const persistedReducer = persistReducer(persistConfig, rootReducer)

    const store = createStore(persistedReducer, compose(...enhancers))

    const persistor = persistStore(store, null, onRehydrate)

    sagaMiddleware.run(rootSaga)

    return { store, persistor }
}
