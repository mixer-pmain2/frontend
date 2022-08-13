import * as adApi from 'api/administration'

export const newDoctorLocation = (payload) => dispatch => {
    return adApi.newDoctorLocation(payload)
        .then(r => {
            return r
        })
}

export const newDoctorLeadSection = (payload) => dispatch => {
    return adApi.newDoctorLeadSection(payload)
        .then(r => {
            return r
        })
}
