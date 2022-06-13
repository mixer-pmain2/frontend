import {API, paramsToUrlQuery, request} from "./request";


export const newPatient = (payload) => {
    const url = API + `/patient/new/`
    return request("POST", url, {}, payload)
}

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

export const getAddress = (payload) => {
    const url = API + `/patient/${payload.patientId}/address/?`+paramsToUrlQuery(payload)
    return request("GET", url, {}, {})
}

export const newInvalid = (payload) => {
    const url = API + `/patient/${payload.patientId}/invalid/`
    return request("POST", url, {}, payload)
}

export const updInvalid = (payload) => {
    const url = API + `/patient/${payload.patientId}/invalid/`
    return request("PUT", url, {}, payload)
}

export const getCustody = (payload) => {
    const url = API + `/patient/${payload.patientId}/custody/?`+paramsToUrlQuery(payload)
    return request("GET", url, {}, {})
}

export const addCustody = (payload) =>
    request("POST", API + `/patient/${payload.patientId}/custody/`, {}, payload)

export const cancelCustody = (payload) =>
    request("PUT", API + `/patient/${payload.patientId}/custody/`, {}, payload)

export const getVaccination = (payload) =>
    request("GET", API + `/patient/${payload.patientId}/vaccination/?`+paramsToUrlQuery(payload), {}, {})

export const getInfection = (payload) =>
    request("GET", API + `/patient/${payload.patientId}/infection/?`+paramsToUrlQuery(payload), {}, {})

export const updPassport = (payload) =>
    request("PUT", API + `/patient/${payload.id}/passport/`, {}, payload)

export const updAddress = (payload) =>
    request("PUT", API + `/patient/${payload.id}/address/`, {}, payload)

export const getSection22 = (payload) =>
    request("GET", API + `/patient/${payload.id}/section22/`, {}, payload)