import * as patientApi from "../../api/patient"
import * as patientReducer from "../../store/reducers/patient"

export const newPatient = (payload) => dispatch =>
    patientApi.newPatient(payload)

export const findByFio = ({fio}) => dispatch =>
    patientApi.findByFio({fio})
        .then(res => {
            return res
        })

export const findById = ({id}) => dispatch =>
    patientApi.findByID({id})
        .then(res => {
            return res
        })

export const select = (item) => dispatch =>
    dispatch(patientReducer.select(item))

export const reset = () => dispatch =>
    dispatch(patientReducer.reset())

export const getUchet = (payload) => dispatch =>
    patientApi.findUchet(payload)
        .then(res => {
            dispatch(patientReducer.setUchet(res))
            return res
        })

export const getHistoryVisits = (payload) => dispatch =>
    patientApi.getVisits(payload)
        .then(res => {
            dispatch(patientReducer.setVisits(res))
            return res
        })

export const getHistoryHospital = (payload) => dispatch =>
    patientApi.getHospital(payload)
        .then(res => {
            dispatch(patientReducer.setHospital(res))
            return res
        })

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

export const getHistorySindrom = (payload) => dispatch =>
    patientApi.getSindrom(payload)
        .then(res => {
            dispatch(patientReducer.setSindrom(res))
            return res
        })

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

export const getInvalid = (payload) => dispatch =>
    patientApi.getInvalid(payload)
        .then(res => {
            dispatch(patientReducer.setInvalid(res))
            return res
        })

export const getAddress = (payload) => dispatch =>
    patientApi.getAddress(payload)
        .then(res => {
            return res
        })
