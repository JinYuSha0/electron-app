import Immutable from 'immutable'
import { createAction, handleActions } from 'redux-actions'

export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

export const LOGOUT = 'LOGOUT'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

export const INITIAL_STATE = Immutable.fromJS({
    isLogin: false,
    userInfo: {
        level: null,
        nickName: null,
        headImg: null
    },
    lock: false
})

export default handleActions({
    [LOGIN_SUCCESS]: (state, {payload}) => (
        state.merge(payload).set('isLogin', true)
    ),
    [LOGOUT_SUCCESS]: state => INITIAL_STATE,
}, INITIAL_STATE)

