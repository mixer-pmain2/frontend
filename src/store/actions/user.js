import * as userReducer from '../reducers/user'
import * as userApi from 'api/user'
import { getToken, removeToken, setToken } from 'api/request'
import Cookie from 'js-cookie'

export const signIn = ({ username, password }) => dispatch => {
    const token = btoa(unescape(encodeURIComponent(username + ':' + password)))
    return userApi.signIn({ token })
        .then(res => {

            if (res?.id) {
                setToken(token)
                dispatch(userReducer.login({ ...res, token }))
            }
            return res
        })
}

export const logout = () => dispatch => {
    dispatch(userReducer.logout())
    removeToken()
}

export const checkUser = () => dispatch => {
    const token = getToken()
    return userApi.signIn({ token })
        .then(res => {
            if (res?.id) {
                dispatch(userReducer.login({ ...res, token }))
            } else {
                dispatch(logout())
            }
            return res
        })
        .catch(err => {
            console.log(err.getMessage)
        })
}

export const getPrava = (payload) => dispatch => {
    return userApi.getPrava(payload)
        .then(res => {
            dispatch(userReducer.setPrava(res))
            return res
        })
}

export const setCurrentPodr = (payload) => dispatch => {
    dispatch(userReducer.setCurrentPodr(payload))
}

export const getUch = (payload) => dispatch => {
    return userApi.getUch(payload)
        .then(res => {
            dispatch(userReducer.setUch(res))
            return res
        })
}
