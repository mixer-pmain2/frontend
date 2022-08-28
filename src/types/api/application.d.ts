type SuccessResponse = {
    success: boolean
    message: string
    error: number
    data?
}

type DataResponse = {}

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

type UKLData = {
    id: number,
    p1_1: number,
    p1_2: number,
    p1_3: number,
    p1_4: number,
    p1_5: number,
    p1_6: number,
    p1_7: number,
    p1_8: number,
    p1_9: number,
    p1_10: number,
    p1_11: number,
    p1_12: number,
    p1_13: number,
    p1_14: number,
    p1_15: number,
    p1_16: number,
    p1_17: number,
    p1_18: number,
    p1_19: number,
    p1_20: number,
    p1_21: number,
    p1_22: number,
    p1_23: number,
    p1_24: number,
    p1_25: number,
    p1_26: number,
    p1_27: number,
    p1_28: number,
    p1_29: number,
    p1_30: number,
    p1_31: number,
    p1_32: number,
    p1_33: number,
    p1_34: number,
    p1_35: number,
    p2_1: number,
    p2_2: number,
    p2_3: number,
    p2_4: number,
    p2_5: number,
    p2_6: number,
    p2_7: number,
    p2_8: number,
    p2_9: number,
    p2_10: number,
    p2_11: number,
    p2_12: number,
    p2_13: number,
    p2_14: number,
    p2_15: number,
    p2_16: number,
    p2_17: number,
    p2_18: number,
    p2_19: number,
    p2_20: number,
    p2_21: number,
    p2_22: number,
    p2_23: number,
    p2_24: number,
    p2_25: number,
    p2_26: number,
    p2_27: number,
    p2_28: number,
    p2_29: number,
    p2_30: number,
    p2_31: number,
    p2_32: number,
    p2_33: number,
    p2_34: number,
    p2_35: number,
    p3_1: number,
    p3_2: number,
    p3_3: number,
    p3_4: number,
    p3_5: number,
    p3_6: number,
    p3_7: number,
    p3_8: number,
    p3_9: number,
    p3_10: number,
    p3_11: number,
    p3_12: number,
    p3_13: number,
    p3_14: number,
    p3_15: number,
    p3_16: number,
    p3_17: number,
    p3_18: number,
    p3_19: number,
    p3_20: number,
    p3_21: number,
    p3_22: number,
    p3_23: number,
    p3_24: number,
    p3_25: number,
    p3_26: number,
    p3_27: number,
    p3_28: number,
    p3_29: number,
    p3_30: number,
    p3_31: number,
    p3_32: number,
    p3_33: number,
    p3_34: number,
    p3_35: number,
    registratId: number,
    visitId: number,
    user1: number,
    user2: number,
    user3: number,
    date1: string,
    date2: string,
    date3: string,
    doctor: number
}

type ForcedMData = {
    id: number
    number: number
    dateStart: string
    dateEnd: string
    watch: string
    mechanism: string
    state: string
}

type ForcedData = {
    id: number
    patientId: number
    number: number
    courtDate: string
    courtConclusionDate: string
    courtId: number
    typeCrimeId: number
    viewId: number
    forcedP: number
    sick: number
    mechanism: number
    doctorId1: number
    doctorId2: number
    dateView: string
    conclusionId: number
    actNumber: number
    actDate: string
    dateEnd: string
    typeId: number
    userId?: number
}

type ViewedData = {
    id: number
    number?: number
    viewDate: string
    doctorName1: string
    doctorName2: string
    conclusion: string
    actNumber: number
    actDate: string
    view: string
    courtDate: string
    courtConclusionDate: string
    type: string
    dateEnd: string
    courtName: string

}

type SprVisitN = {
    code: number
    name: string
}
