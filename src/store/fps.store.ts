import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface FPSState {
    currentFPS: number
    fpsHistory: number[]
}

const initialState: FPSState = {
    currentFPS: 0,
    fpsHistory: []
}

const fpsSlice = createSlice({
    initialState,
    name: 'fps',
    reducers: {
        update: (state, action: PayloadAction<number>) => {
            state.currentFPS = action.payload
            const history = state.fpsHistory.slice(-9)
            history.push(action.payload)
            state.fpsHistory = history
        }
    }
})

export const updateFPSAction = createAction<number>("fps/update")
export default fpsSlice.reducer