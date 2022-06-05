type UserStore = {
    access: {
        [name: number]: number
    }
    fname: string
    id: number
    isAuth: true
    lname: string
    section: {
        [name: number]: number[]
    }
    sname: string
    token: string
    unit: number
}
