
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
    diag: string
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

type PatientSyndromeStore = {
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

type PatientCustodyStore = {
    dateStart: string
    dateEnd: string
    who: string
}

type PatientVaccinationStore = {
    date: string
    vaccination: string
    number: string
    series: string
    result: string
    detached: string
}

type PatientInfectionStore = {
    date: string
    diagnose: string
}

type PatientSection22Store = {
    id: number
    patientId: number
    dateStart: string
    dateEnd: string
    section: number
    part: number
    insWho: number
    insDate: string
}

type PatientStore = {
    id?: number
    lname?: string
    fname?: string
    sname?: string
    bday?: string
    sex?: string
    snils?: string
    visibility?: number
    address?: string
    passportSeries?: string
    passportNumber?: number
    works?: number
    republic?: number
    region?: number
    district?: number
    area?: number
    street?: number
    house?: string
    build?: string
    flat?: string
    domicile?: number
    visit?: PatientVisitStore[]
    uchet?: PatientUchetStore[]
    hospital?: PatientHospitalStore[]
    syndrome?: PatientSyndromeStore[]
    invalid?: PatientInvalidStore[]
    custody?: PatientCustodyStore[]
    vaccination?: PatientVaccinationStore[]
    infection?: PatientInfectionStore[]
}
