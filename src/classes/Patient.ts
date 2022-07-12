

export default class Patient {
    private patient: PatientStore
    constructor(objPatient: PatientStore) {
        this.patient = objPatient
    }

    getLastUchet(): PatientUchetStore {
        return this.patient.uchet?.[0]
    }

    lastUchet() {
        if (this.patient?.uchet?.length > 0)
            return this.patient.uchet?.[0]
        return {}
    }

    lastVisit() {
        if (this.patient?.visit?.length > 0)
            return this.patient.visit?.[0]
        return {}
    }

    isUchet() {
        return Boolean(this.getLastUchet()?.reason && !this.getLastUchet()?.reason.startsWith('S'))
    }

    isAnonim() {
        return Boolean(this.patient.lname?.startsWith('-'))
    }

}
