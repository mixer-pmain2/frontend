import * as appReducer from "../reducers/application"
import * as appApi from "../../api/spr"


export const enableLoading = () => dispatch =>
    dispatch(appReducer.loadingEnable())

export const disableLoading = () => dispatch =>
    dispatch(appReducer.loadingDisable())

export const loadingAdd = (payload) => dispatch =>
    dispatch(appReducer.loadingListAdd(payload))

export const loadingReset = (payload) => dispatch =>
    dispatch(appReducer.loadingListReset())

export const loadingRemove = (payload) => dispatch =>
    dispatch(appReducer.loadingListRemove(payload))

export const getSprPodr = () => dispatch => {
    return appApi.getSprPodr()
        .then(r => dispatch(appReducer.setSprPodr(r)))
}

export const getSprPrava = () => dispatch => {
    return appApi.getSprPrava()
        .then(r => dispatch(appReducer.setSprPrava(r)))
}

export const getSprVisit = () => dispatch => {
    return appApi.getSprVisit()
        .then(r => dispatch(appReducer.setSprVisit(r)))
}

export const getParams = () => dispatch => {
    return appApi.getParams()
        .then(r => dispatch(appReducer.setParams(r)))
}

export const getSprReason = () => dispatch => {
    return appApi.getSprReason()
        .then(r => dispatch(appReducer.setSprReason(r)))
}

export const getSprInvalidKind = () => dispatch => {
    return appApi.getSprInvalidKind()
        .then(r => {
            dispatch(appReducer.setSprInvalidKind(r))
            return r
        })
}

export const getSprInvalidChildAnomaly = () => dispatch => {
    return appApi.getSprInvalidChildAnomaly()
        .then(r => {
            dispatch(appReducer.setSprInvalidChildAnomaly(r))
            return r
        })
}

export const getSprInvalidChildLimit = () => dispatch => {
    return appApi.getSprInvalidChildLimit()
        .then(r => {
            dispatch(appReducer.setSprInvalidChildLimit(r))
            return r
        })
}

export const getSprInvalidReason = () => dispatch => {
    return appApi.getSprInvalidReason()
        .then(r => {
            dispatch(appReducer.setSprInvalidReason(r))
            return r
        })
}

export const getSprCustodyWho = () => dispatch => {
    return appApi.getSprCustodyWho()
        .then(r => {
            dispatch(appReducer.setSprCustodyWho(r))
            return r
        })
}

export const findRepublic = (payload) => dispatch => {
    return appApi.findRepublic(payload)
        .then(r => {
            return r
        })
}

export const findRegion = (payload) => dispatch => {
    return appApi.findRegion(payload)
        .then(r => {
            return r
        })
}

export const findDistrict = (payload) => dispatch => {
    return appApi.findDistrict(payload)
        .then(r => {
            return r
        })
}

export const findArea = (payload) => dispatch => {
    return appApi.findArea(payload)
        .then(r => {
            return r
        })
}

export const findStreet = (payload) => dispatch => {
    return appApi.findStreet(payload)
        .then(r => {
            return r
        })
}


