import axios from "axios";

import Notify, {notifyType} from "../components/Notify";

export const API = (process.env.NODE_ENV === 'production') ? "/api/v0" : "http://localhost:80/api/v0"

export let basicAuth = "";

export const setBasic = (token) => {
    basicAuth = "Basic "+token
}

export const paramsToUrlQuery = (payload) => {
    return Object.keys(payload).map((v, i) => `${v}=${payload[v]}`).join("&")
}

export const request = (method, url, headers = {}, body = {}) => {
    console.log("request", method, url)
    method = method.toUpperCase()
    return axios({
        method,
        url,
        headers: {
            'Authorization': basicAuth,
            'Content-Type': "text/plain",
            ...headers
        },
        data: body
    })
        .then(res => {
            console.log(res)
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
            Notify(notifyType.ERROR, "Ошибка авторизации")()
            break
        default:
            Notify(notifyType.ERROR, err.message)()
    }

}

