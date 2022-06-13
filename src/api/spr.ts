import {API, paramsToUrlQuery, request} from "./request";

export const getSprPodr = () => {
  const url = API + "/spr/podr/"
  return request('GET', url, {}, {})
}

export const getSprPrava = () => {
  const url = API + "/spr/prava/"
  return request('GET', url, {}, {})
}

export const getSprVisit = () => {
  const url = API + "/spr/visit/"
  return request('GET', url, {}, {})
}

export const getSprDiag = ({diag = ""}) => {
  const url = API + `/spr/diag/?diag=${diag}`
  return request('GET', url, {}, {})
}

export const getParams = () => {
  const url = API + `/service/`
  return request('GET', url, {}, {})
}

export const getSprReason = () => {
  const url = API + `/spr/reason/`
  return request('GET', url, {}, {})
}

export const getSprInvalidKind = () => {
  const url = API + `/spr/invalid/kind/`
  return request('GET', url, {}, {})
}

export const getSprInvalidChildAnomaly = () => {
  const url = API + `/spr/invalid/anomaly/`
  return request('GET', url, {}, {})
}

export const getSprInvalidChildLimit = () => {
  const url = API + `/spr/invalid/limit/`
  return request('GET', url, {}, {})
}

export const getSprInvalidReason = () => {
  const url = API + `/spr/invalid/reason/`
  return request('GET', url, {}, {})
}

export const getSprCustodyWho = () =>
  request('GET', API + `/spr/custody/who/`, {}, {})

export const findRepublic = (payload) =>
    request('GET', API + `/spr/address/republic/`, {}, payload)

export const findRegion = (payload) =>
    request('GET', API + `/spr/address/region/`, {}, payload)

export const findDistrict = (payload) =>
    request('GET', API + `/spr/address/district/`, {}, payload)

export const findArea = (payload) =>
    request('GET', API + `/spr/address/area/`, {}, payload)

export const findStreet = (payload) =>
    request('GET', API + `/spr/address/street/`, {}, payload)