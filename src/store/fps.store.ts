import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface FPSState {
    currentFPS: number
    fpsHistory: number[]
    timerId: number
}

const initialState: FPSState = {
    currentFPS: 0,
    fpsHistory: [],
    timerId: -1,
}

const fpsSlice = createSlice({
    initialState,
    name: 'fps',
    reducers: {
        setTimerId: (state, action: PayloadAction<number>) => {
            state.timerId = action.payload
        },
        update: (state, action: PayloadAction<number>) => {
            state.currentFPS = action.payload
            const history = state.fpsHistory.slice(-9)
            history.push(action.payload)
            state.fpsHistory = history
        },
    },
})

export const setTimerId = createAction<number>('fps/setTimerId')
export const updateFPSAction = createAction<number>('fps/update')
export default fpsSlice.reducer
