import {API, paramsToUrlQuery, request} from "./request";


export const newPatient = (payload) => {
    const url = API + `/patient/new/`
    return request("POST", url, {}, payload)
}

export const findByFio = ({fio}) => {
    var [lname, fname, sname] = fio.split(" ")
    if (!lname) lname = ""
    if (!fname) fname = ""
    if (!sname) sname = ""

    const url = API + `/patient/find/`
    return request("GET", url, {}, {lname, fname, sname})
}

export const findByID = (payload) => {
    const url = API + `/patient/${payload.id}/`
    return request("GET", url, {}, payload)
}

export const findUchet = (payload) => {
    const url = API + `/patient/${payload.id}/uchet/`
    return request("GET", url, {}, payload)
}

export const getVisits = (payload) => {
    const url = API + `/patient/${payload.id}/visit/`
    return request("GET", url, {}, payload)
}

export const getHospital = (payload) => {
    const url = API + `/patient/${payload.id}/hospital/`
    return request("GET", url, {}, payload)
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

export const getSyndrome = (payload) => {
    const url = API + `/patient/${payload.id}/syndrome/`
    return request("GET", url, {}, payload)
}

export const deleteSyndrome = (payload) => {
    const url = API + `/patient/${payload.patientId}/syndrome/`
    return request("DELETE", url, {}, payload)
}

export const addSyndrome = (payload) => {
    const url = API + `/patient/${payload.patientId}/syndrome/`
    return request("POST", url, {}, payload)
}

export const getInvalid = (payload) => {
    const url = API + `/patient/${payload.patientId}/invalid/`
    return request("GET", url, {}, payload)
}

export const getAddress = (payload) => {
    const url = API + `/patient/${payload.patientId}/address/`
    return request("GET", url, {}, payload)
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
    const url = API + `/patient/${payload.patientId}/custody/`
    return request("GET", url, {}, payload)
}

export const addCustody = (payload) =>
    request("POST", API + `/patient/${payload.patientId}/custody/`, {}, payload)

export const cancelCustody = (payload) =>
    request("PUT", API + `/patient/${payload.patientId}/custody/`, {}, payload)

export const getVaccination = (payload) =>
    request("GET", API + `/patient/${payload.patientId}/vaccination/`, {}, payload)

export const getInfection = (payload) =>
    request("GET", API + `/patient/${payload.patientId}/infection/`, {}, payload)

export const updPassport = (payload) =>
    request("PUT", API + `/patient/${payload.id}/passport/`, {}, payload)

export const updAddress = (payload) =>
    request("PUT", API + `/patient/${payload.id}/address/`, {}, payload)

export const getSection22 = (payload) =>
    request("GET", API + `/patient/${payload.id}/section22/`, {}, payload)

export const addSection22 = (payload) =>
    request("POST", API + `/patient/${payload.patientId}/section22/`, {}, payload)

export const getSod = (payload) =>
    request("GET", API + `/patient/${payload.id}/sod/`, {}, payload)

export const getOodLast = (payload) =>
    request("GET", API + `/patient/${payload.id}/ood/last/`, {}, payload)

export const getFindSection29 = (payload) =>
    request("GET", API + `/patient/${payload.id}/section29/find/`, {}, payload)

export const addOod = (payload): Promise<SuccessResponse> =>
    request("POST", API + `/patient/${payload.patientId}/ood/`, {}, payload)

export const addSod = (payload): Promise<SuccessResponse> =>
    request("POST", API + `/patient/${payload.patientId}/sod/`, {}, payload)
