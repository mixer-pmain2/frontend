type SuccessResponse = {
    success: boolean
    message: string
    error: number
    data?
}

type DataResponse = {

}

type QueryParams = {
    cache
}

type Doctor = {
    id
    lname: string
    fname: string
    sname: string
}

type DoctorFindParam = {
    doctorId
    month?
    year?
    unit?
}

type DoctorRate = {
    doctorId
    id
    rate
    unit
}

type DoctorVisitCountPlan = {
    unit
    visit
    plan
}

type DoctorQueryUpdRate = {
    doctorId
    year
    month
    rate

}

type ChangePassword = {
    userId
    password
    newPassword
}

type SOD = {
    patientId
    date
    section
    part
}

type OOD = {
    danger
    syndrome
    difficulties
    attitude
    userId
    patientId
}

type FindSection29 = {
    dateStart
    diagnose
    dateEnd
    section
}

type Section22 = {
    dateStart
    dateEnd
    section
    part
}
