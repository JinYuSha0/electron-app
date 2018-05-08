import { combineReducers  } from 'redux'
import { routerReducer } from 'react-router-redux'
import user from './reducers/user'

export default combineReducers({
    router: routerReducer,
    user,
})