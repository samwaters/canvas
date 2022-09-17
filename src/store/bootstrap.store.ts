import { createAction, createSlice } from '@reduxjs/toolkit'

export interface BootstrapState {
    ready: boolean
}

const initialState: BootstrapState = {
    ready: false,
}

const bootstrapSlice = createSlice({
    initialState,
    name: 'bootstrap',
    reducers: {
        ready: (state) => {
            state.ready = true
        },
    },
})

export const bootstrapAction = createAction('bootstrap/bootstrap')
export const { ready } = bootstrapSlice.actions
export default bootstrapSlice.reducer
