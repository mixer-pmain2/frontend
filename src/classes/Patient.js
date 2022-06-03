

export default class Patient {
    constructor(objPatient) {
        this.patient = objPatient
    }

    getLastUchet() {
        if (this.patient?.uchet?.length > 0)
            return this.patient.uchet[0]
        return {}
    }
    get lastUchet() {
        if (this.patient?.uchet?.length > 0)
            return this.patient.uchet[0]
        return {}
    }

    get lastVisit() {
        if (this.patient?.visit?.length > 0)
            return this.patient.visit[0]
        return {}
    }

    isUchet() {
        return Boolean(this.getLastUchet()?.reason && !this.getLastUchet()?.reason?.startsWith('S'))
    }

    isAnonim() {
        return Boolean(this.patient.lname?.startsWith('-'))
    }

}
