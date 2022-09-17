import { createSlice } from '@reduxjs/toolkit'

export interface BoxesState {
    enabled: boolean
}

const initialState: BoxesState = {
    enabled: true,
}

const boxesSlice = createSlice({
    initialState,
    name: 'boxes',
    reducers: {
        disable: (state) => {
            state.enabled = false
        },
        enable: (state) => {
            state.enabled = true
        },
    },
})

export const { disable, enable } = boxesSlice.actions
export default boxesSlice.reducer
