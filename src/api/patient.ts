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

export const findByAddress = (payload) => {

    const url = API + `/patient/findByAddress/`
    return request("GET", url, {}, payload)
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

export const getSod = (payload): Promise<SOD[]> =>
    request("GET", API + `/patient/${payload.id}/sod/`, {}, payload)

export const getOodLast = (payload) =>
    request("GET", API + `/patient/${payload.id}/ood/last/`, {}, payload)

export const getFindSection29 = (payload) =>
    request("GET", API + `/patient/${payload.id}/section29/find/`, {}, payload)

export const addOod = (payload): Promise<SuccessResponse> =>
    request("POST", API + `/patient/${payload.patientId}/ood/`, {}, payload)

export const addSod = (payload: SOD): Promise<SuccessResponse> =>
    request("POST", API + `/patient/${payload.patientId}/sod/`, {}, payload)

export const getDoctorVisitByPatient = (payload): Promise<Doctor[]> =>
    request("GET", API + `/ukl/doctors/visit/`, {}, payload)

export const getUKLVisitByPatient = (payload): Promise<UKLData> =>
    request("GET", API + `/ukl/visit/`, {}, payload)

export const saveUKLVisitByPatient = (payload): Promise<SuccessResponse> =>
    request("POST", API + `/ukl/visit/`, {}, payload)

export const getUKLSuicide = (payload): Promise<UKLData> =>
    request("GET", API + `/ukl/suicide/`, {}, payload)

export const saveUKLSuicide = (payload): Promise<SuccessResponse> =>
    request("POST", API + `/ukl/suicide/`, {}, payload)

export const getUKLPsychotherapy = (payload): Promise<UKLData> =>
    request("GET", API + `/ukl/psychotherapy/`, {}, payload)

export const saveUKLPsychotherapy = (payload): Promise<SuccessResponse> =>
    request("POST", API + `/ukl/psychotherapy/`, {}, payload)

export const getUKL = (payload): Promise<UKLData[]> =>
    request("GET", API + `/ukl/`, {}, payload)

export const getForcedM = (payload): Promise<ForcedMData[]> =>
    request("GET", API + `/patient/${payload.patientId}/forced/`, {}, payload)

export const getViewed = (payload): Promise<ViewedData[]> =>
    request("GET", API + `/patient/${payload.patientId}/viewed/`, {}, payload)

export const getForced = (payload: {id: number, cache?: boolean}): Promise<ForcedData> =>
    request("GET", API + `/patient/forced/`, {}, payload)

export const postForced = (payload: ForcedData): Promise<SuccessResponse> =>
    request("POST", API + `/patient/${payload.patientId}/forced/`, {}, payload)

export const getForcedNumber = (payload): Promise<{number: number}> =>
    request("GET", API + `/patient/${payload.patientId}/forced/number/`, {}, payload)

export const postNewForced = (payload: ForcedData): Promise<SuccessResponse> =>
    request("POST", API + `/patient/${payload.patientId}/forced/new/`, {}, payload)

export const postEndForced = (payload: ForcedData): Promise<SuccessResponse> =>
    request("POST", API + `/patient/${payload.patientId}/forced/end/`, {}, payload)

export const getPolicy = (payload: {patientId}): Promise<PatientPolicyStore&SuccessResponse> =>
    request("GET", API + `/patient/${payload.patientId}/policy/`, {}, payload)

export const savePolicy = (payload: PatientPolicyStore): Promise<SuccessResponse> =>
    request("PUT", API + `/patient/${payload.patientId}/policy/`, {}, payload)
