type ApplicationStore = {
    loading: boolean
    loadingList: string[]
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
    }
}
