type SuccessResponse = {
    success?
    message?
    error?
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
