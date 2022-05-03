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
