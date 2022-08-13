import { request } from 'api/request'
import { API } from 'api/request'

export const newDoctorLocation = (payload) =>
    request('POST', API + `/administration/doctor/location/`, {}, payload)

export const newDoctorLeadSection = (payload) =>
    request('POST', API + `/administration/doctor/lead/`, {}, payload)
