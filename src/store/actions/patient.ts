import * as patientApi from '../../api/patient'
import * as patientReducer from '../../store/reducers/patient'
import {loadingAdd, loadingRemove} from "./application";
import {loadComponent} from "../../consts/app";
import * as appActions from "./application";

export const newPatient = (payload) => dispatch =>
    patientApi.newPatient(payload)

export const findByFio = ({fio}) => dispatch => {
    dispatch(appActions.loadingAdd(loadComponent.find_by_fio))
    return patientApi.findByFio({fio})
        .then(res => {
            return res
        })
        .finally(() =>
            dispatch(loadingRemove(loadComponent.find_by_fio))
        )
}

export const findById = ({id}) => dispatch => {
    dispatch(appActions.loadingAdd(loadComponent.find_by_id))
    return patientApi.findByID({id})
        .then(res => {
            dispatch(select(res))
            return res
        })
        .finally(() =>
            dispatch(loadingRemove(loadComponent.find_by_id))
        )
}

export const select = (item) => dispatch =>
    dispatch(patientReducer.select(item))

export const reset = () => dispatch =>
    dispatch(patientReducer.reset())

export const getUchet = (payload) => dispatch => {
    dispatch(loadingAdd(loadComponent.history_uchet))
    return patientApi.findUchet(payload)
        .then(res => {
            dispatch(patientReducer.setUchet(res))
            return res
        })
        .finally(() =>
            dispatch(loadingRemove(loadComponent.history_uchet))
        )
}

export const getHistoryVisits = (payload) => dispatch => {
    dispatch(loadingAdd(loadComponent.history_visit))
    return patientApi.getVisits(payload)
        .then(res => {
            dispatch(patientReducer.setUchet(res))
            dispatch(patientReducer.setVisits(res))
            return res
        })
        .finally(() =>
            dispatch(loadingRemove(loadComponent.history_visit))
        )
}

export const getHistoryHospital = (payload) => dispatch => {
    dispatch(loadingAdd(loadComponent.history_hospital))
    return patientApi.getHospital(payload)
        .then(res => {
            dispatch(patientReducer.setHospital(res))
            return res
        })
        .finally(() =>
            dispatch(loadingRemove(loadComponent.history_hospital))
        )
}

export const newReg = (payload) => dispatch =>
    patientApi.newReg(payload)
        .then(res => {
            dispatch(getUchet({...{...payload, id: payload.patientId}, cache: false}))
            return res
        })

export const newRegTransfer = (payload) => dispatch =>
    patientApi.newRegTransfer(payload)
        .then(res => {
            dispatch(getUchet({...payload, cache: false}))
            return res
        })

export const getHistorySindrom = (payload) => dispatch => {
    dispatch(loadingAdd(loadComponent.history_sindrom))
    return patientApi.getSindrom(payload)
        .then(res => {
            dispatch(patientReducer.setSindrom(res))
            return res
        })
        .finally(() =>
            dispatch(loadingRemove(loadComponent.history_sindrom))
        )
}

export const deleteSindrom = (payload) => dispatch =>
    patientApi.deleteSindrom(payload)
        .then(res => {
            dispatch(getHistorySindrom({...payload, id: payload.patientId, cache: false}))
            return res
        })

export const addSindrom = (payload) => dispatch =>
    patientApi.addSindrom(payload)
        .then(res => {
            dispatch(getHistorySindrom({...payload, id: payload.patientId, cache: false}))
            return res
        })

export const getInvalid = (payload) => dispatch => {
    dispatch(loadingAdd(loadComponent.history_invalid))
    return patientApi.getInvalid(payload)
        .then(res => {
            dispatch(patientReducer.setInvalid(res))
            return res
        })
        .finally(() =>
            dispatch(loadingRemove(loadComponent.history_invalid))
        )
}

export const getAddress = (payload) => dispatch =>
    patientApi.getAddress(payload)
        .then(res => {
            return res
        })

export const addInvalid = payload => dispatch =>
    patientApi.newInvalid(payload)
        .then(res => {
            dispatch(getInvalid({...payload, cache: false}))
            return res
        })

export const updInvalid = payload => dispatch =>
    patientApi.updInvalid(payload)
        .then(res => {
            dispatch(getInvalid({...payload, cache: false}))
            return res
        })

export const getCustody = payload => dispatch => {
    dispatch(loadingAdd(loadComponent.history_custody))
    return patientApi.getCustody(payload)
        .then(res => {
            dispatch(patientReducer.setCustody(res))
            return res
        })
        .finally(() =>
            dispatch(loadingRemove(loadComponent.history_custody))
        )
}

export const addCustody = payload => dispatch =>
    patientApi.addCustody(payload)
        .then(res => {
            dispatch(getCustody({...payload, cache: false}))
            return res
        })

export const cancelCustody = payload => dispatch =>
    patientApi.cancelCustody(payload)
        .then(res => {
            dispatch(getCustody({...payload, cache: false}))
            return res
        })

export const getVaccination = payload => dispatch => {
    dispatch(loadingAdd(loadComponent.history_vaccination))
    return patientApi.getVaccination(payload)
        .then(res => {
            dispatch(patientReducer.setVaccination(res))
            return res
        })
        .finally(() =>
            dispatch(loadingRemove(loadComponent.history_vaccination))
        )
}

export const getInfection = payload => dispatch =>
    patientApi.getInfection(payload)
        .then(res => {
            dispatch(patientReducer.setInfection(res))
            return res
        })

export const updPassport = payload => dispatch =>
    patientApi.updPassport(payload)
        .then(res => {
            dispatch(findById(payload))
            return res
        })

export const updAddress = payload => dispatch =>
    patientApi.updAddress(payload)
        .then(res => {
            dispatch(findById(payload))
            return res
        })

export const getSection22 = payload => dispatch =>
    patientApi.getSection22(payload)
        .then(res => {
            return res
        })
