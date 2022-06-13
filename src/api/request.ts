import axios from 'axios'
import Cookies from 'js-cookie'

import Notify, {notifyType} from '../components/Notify'

export const API = (process.env.NODE_ENV === 'production') ? '/api/v0' : 'http://localhost:80/api/v0'

export const setToken = (v) =>
    Cookies.set('token', v)

export const getToken = () =>
    Cookies.get('token')

export const removeToken = () =>
    Cookies.remove("token")

export const paramsToUrlQuery = (payload) => {
    return Object.keys(payload).map((v, i) => `${v}=${payload[v]}`).join('&')
}

export const request = async (method, url, headers = {}, body = {}): Promise<{ success: boolean }> => {
    method = method.toUpperCase()
    if (method === "GET") {
        url = url + "?" + paramsToUrlQuery(body)
        body = {}
    }
    return await axios({
        method,
        url,
        headers: {
            'Authorization': `Basic ${getToken()}`,
            'Content-Type': 'text/plain',
            ...headers
        },
        data: body
    })
        .then(res => {
            if (res.status === 200) {
                return res.data
            }
            return {}
        })
        .catch(reqError)
}

export const reqError = (err) => {
    const status = err.response?.status ? err.response?.status : 0

    switch (status) {
        case 401:
            Notify(notifyType.ERROR, 'Ошибка авторизации')()
            break
        default:
            Notify(notifyType.ERROR, err.message)()
    }
    return status

}

