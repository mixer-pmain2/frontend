import {API, paramsToUrlQuery, request} from "./request";


export const findByFio = ({fio}) => {
    const [lname, fname, sname] = fio.split(" ")
    const url = API + `/patient/find/?lname=${lname||""}&fname=${fname||""}&sname=${sname||""}`
    return request("GET", url, {}, {})
}

export const findByID = ({id}) => {
    const url = API + `/patient/${id}/`
    return request("GET", url, {}, {})
}

export const findUchet = (payload) => {
    const url = API + `/patient/${payload.id}/uchet/?`+paramsToUrlQuery(payload)
    return request("GET", url, {}, {})
}

export const getVisits = (payload) => {
    const url = API + `/patient/${payload.id}/visit/?`+paramsToUrlQuery(payload)
    return request("GET", url, {}, {})
}

export const getHospital = (payload) => {
    const url = API + `/patient/${payload.id}/hospital/?`+paramsToUrlQuery(payload)
    return request("GET", url, {}, {})
}

export const newVisit = (payload) => {
    const url = API + `/patient/${payload.patientId}/visit/`
    return request("POST", url, {}, {...payload})
}

export const newProf = (payload) => {
    const url = API + `/patient/prof/`
    return request("POST", url, {}, {...payload})
}

export const newReg = (payload) => {
    const url = API + `/patient/${payload.patientId}/uchet/`
    return request("POST", url, {}, {...payload})
}

export const newRegTransfer = (payload) => {
    const url = API + `/patient/${payload.patientId}/uchet/transfer/`
    return request("POST", url, {}, {...payload})
}

export const getSindrom = (payload) => {
    const url = API + `/patient/${payload.id}/sindrom/?`+paramsToUrlQuery(payload)
    return request("GET", url, {}, {})
}

export const deleteSindrom = (payload) => {
    const url = API + `/patient/${payload.patientId}/sindrom/`
    return request("DELETE", url, {}, payload)
}

export const addSindrom = (payload) => {
    const url = API + `/patient/${payload.patientId}/sindrom/`
    return request("POST", url, {}, payload)
}

export const getInvalid = (payload) => {
    const url = API + `/patient/${payload.patientId}/invalid/?`+paramsToUrlQuery(payload)
    return request("GET", url, {}, {})
}
