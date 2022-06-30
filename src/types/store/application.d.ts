type ApplicationStore = {
    loading: boolean
    loadingList: number[]
    params: {
        comment: string
        dateEnd: string
        dateStart: string
        param: string
        paramD: number
        paramI: number
        paramS: string
    }[]
    spr: {
        access: {
            unit: number
            code: number
            name: string
        }[]
        reason: {
            [name: string]: string
        }
        unit: {
            [name: number]: string
        }
        visit: {
            [name: number]: string
        }
        inv_kind?: {
            [name: number]: string
        }
        inv_anomaly?: {
            [name: number]: string
        }
        inv_limit?: {
            [name: number]: string
        }
        inv_reason?: {
            [name: number]: string
        }
        custody?: {
            who: {
                [name: string]: string
            }
        }
    }
}

type Tab = {
    component?
    id
    title
    img?
}
type SprUchN = {
    id
    section
    name
    plan
    hour
    spec
    unit
}

type LocationDoctor = {
    section
    spec
    doctId
    lname
    fname
    sname
    unit
}

type SectionDoctor = {
    section
    spec?
    doctorName?
    doctorId
}
