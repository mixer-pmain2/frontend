
type PatientUchetStore = {
    id: number
    category: number
    categoryS: string
    date: string
    diagnose: string
    diagnoseS: string
    dockId: number
    dockName: string
    reason: string
    reasonS: string
    section: number
}

type PatientVisitStore = {
    id: number
    date: string
    diagS: string
    dockName: string
    reason: string
    typeVisit: number
    unit: number
    where: string
}

type PatientHospitalStore = {
    dateEnd: string
    dateStart: string
    diagEnd: string
    diagEndS: string
    diagStart: string
    diagStartS: string
    historyNumber: number
    id: number
    otd: number
    where: string
}

type PatientSindromStore = {
    id: number
    date: string
    diagnose: string
    diagnoseT: string
    doctName: string
}

type PatientInvalidStore = {
    id: number
    dateBegin: string
    dateChange: string
    dateEnd: string
    kindS: string
    reasonS: string
}

type PatientStore = {
    id: number
    lname: string
    fname: string
    sname: string
    bday: string
    sex: string
    snils: string
    visibility: number
    address: string
    visit?: PatientVisitStore[]
    uchet?: PatientUchetStore[]
    hospital?: PatientHospitalStore[]
    sindrom?: PatientSindromStore[]
    invalid?: PatientInvalidStore[]
}
