import { createSlice } from '@reduxjs/toolkit'
import { saveToStore } from './_save'

const storeName = 'app'

const initialState: ApplicationStore = localStorage.getItem(storeName) ? JSON.parse(localStorage.getItem(storeName)) : {
    loading: false,
    loadingList: [],
    spr: {},
    params: null
}

export const applicationStore = createSlice({
    name: storeName,
    initialState,
    reducers: {
        loadingListAdd: (state, action) => {
            const l = state?.loadingList ? state?.loadingList : []
            state = {
                ...state,
                loadingList: [...l, action.payload]
            }
            return state
        },
        loadingListRemove: (state, action) => {
            state = {
                ...state,
                loadingList: state.loadingList.filter(v => v !== action.payload)
            }
            return state

        },
        loadingListReset: (state) => {
            state = {
                ...state,
                loadingList: []
            }
            return state
        },
        loadingEnable: (state) => {
            state = {
                ...state,
                loading: true
            }
            return state
        },
        loadingDisable: (state) => {
            state = {
                ...state,
                loading: false
            }
            return state
        },
        setSprPodr: (state, action) => {
            state = {
                ...state,
                spr: {
                    ...state.spr,
                    unit: action.payload
                }
            }
            return state
        },
        setSprPrava: (state, action) => {
            state = {
                ...state,
                spr: {
                    ...state.spr,
                    access: action.payload
                }
            }
            return state
        },
        setSprVisit: (state, action) => {
            state = {
                ...state,
                spr: {
                    ...state.spr,
                    visit: action.payload
                }
            }
            return state
        },
        setParams: (state, action) => {
            state = {
                ...state,
                params: action.payload
            }
            return state
        },
        setSprReason: (state, action) => {
            state = {
                ...state,
                spr: {
                    ...state.spr,
                    reason: action.payload
                }
            }
            return state
        },
        setSprInvalidKind: (state, action) => {
            state = {
                ...state,
                spr: {
                    ...state.spr,
                    inv_kind: action.payload
                }
            }
            return state
        },
        setSprInvalidChildAnomaly: (state, action) => {
            state = {
                ...state,
                spr: {
                    ...state.spr,
                    inv_anomaly: action.payload
                }
            }
            return state
        },
        setSprInvalidChildLimit: (state, action) => {
            state = {
                ...state,
                spr: {
                    ...state.spr,
                    inv_limit: action.payload
                }
            }
            return state
        },
        setSprInvalidReason: (state, action) => {
            state = {
                ...state,
                spr: {
                    ...state.spr,
                    inv_reason: action.payload
                }
            }
            return state
        },
        setSprCustodyWho: (state, action) => {
            state = {
                ...state,
                spr: {
                    ...state.spr,
                    custody: {
                        ...state.spr.custody,
                        who: action.payload
                    }
                }
            }
            saveToStore(state, storeName)
            return state
        },
    }
})

export const {
    loadingEnable,
    loadingDisable,
    setSprPodr,
    setSprPrava,
    loadingListAdd,
    loadingListRemove,
    loadingListReset,
    setSprVisit,
    setParams,
    setSprReason,
    setSprInvalidKind,
    setSprInvalidChildAnomaly,
    setSprInvalidChildLimit,
    setSprInvalidReason,
    setSprCustodyWho
} = applicationStore.actions
export default applicationStore.reducer
