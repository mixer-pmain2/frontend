import {API, request} from "./request";

export const getRate = (payload: DoctorFindParam) =>
    request("GET", API + `/doctor/${payload.doctorId}/rate`, {}, payload)

export const getVisitCountPlan = (payload: DoctorFindParam) =>
    request("GET", API + `/doctor/${payload.doctorId}/visit/count`, {}, payload)

export const getUnits = (payload: DoctorFindParam) =>
    request("GET", API + `/doctor/${payload.doctorId}/units`, {}, payload)

export const updRate = (payload: DoctorQueryUpdRate) =>
    request("PUT", API + `/doctor/${payload.doctorId}/rate`, {}, payload)

export const deleteRate = (payload: DoctorQueryUpdRate) =>
    request("DELETE", API + `/doctor/${payload.doctorId}/rate`, {}, payload)

