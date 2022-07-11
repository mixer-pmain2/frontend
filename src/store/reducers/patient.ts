import {createSlice} from "@reduxjs/toolkit";
import {saveToStore} from "./_save";

const storeName = "patient"

const initialState: PatientStore = localStorage.getItem(storeName) ? JSON.parse(localStorage.getItem(storeName)) : {

}

export const patientStore = createSlice({
    name: storeName,
    initialState,
    reducers: {
        select: (state, action) => {
            state = {
                ...action.payload
            }
            saveToStore(state, storeName)
            return state
        },
        reset: (state: {}) => {
            state = {}
            return state
        },
        setUchet: (state, action) => {
            state = {
                ...state,
                uchet: action.payload
            }
            return state
        },
        setVisits: (state, action) => {
            state = {
                ...state,
                visit: action.payload
            }
            return state
        },
        setHospital: (state, action) => {
            state = {
                ...state,
                hospital: action.payload
            }
            return state
        },
        setSyndrome: (state, action) => {
            state = {
                ...state,
                syndrome: action.payload
            }
            return state
        },
        setInvalid: (state, action) => {
            state = {
                ...state,
                invalid: action.payload
            }
            return state
        },
        setCustody: (state, action) => {
            state = {
                ...state,
                custody: action.payload
            }
            return state
        },
        setVaccination: (state, action) => {
            state = {
                ...state,
                vaccination: action.payload
            }
            return state
        },
        setInfection: (state, action) => {
            state = {
                ...state,
                infection: action.payload
            }
            return state
        },
    }
})

export const {
    select,
    reset,
    setUchet,
    setVisits,
    setHospital,
    setSyndrome,
    setInvalid,
    setCustody,
    setVaccination,
    setInfection
} = patientStore.actions
export default patientStore.reducer
