import * as apiDoctor from "../../api/doctor";


export const getRate = (payload: DoctorFindParam & QueryParams) => dispatch =>
    apiDoctor.getRate(payload)

export const getVisitCountPlan = (payload: DoctorFindParam & QueryParams) => dispatch =>
    apiDoctor.getVisitCountPlan(payload)

export const getUnits = (payload: DoctorFindParam) => dispatch =>
    apiDoctor.getUnits(payload)

export const updRate = (payload: DoctorQueryUpdRate) => dispatch =>
    apiDoctor.updRate(payload)

export const deleteRate = (payload: DoctorQueryUpdRate) => dispatch =>
    apiDoctor.deleteRate(payload)
