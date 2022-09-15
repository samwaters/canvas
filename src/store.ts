import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import createSagaMiddleware from '@redux-saga/core'
import bootstrapReducer from 'store/bootstrap.store'
import boxesReducer from 'store/boxes.store'
import fpsReducer from 'store/fps.store'
export const sagaMiddleware = createSagaMiddleware()

export const history = createBrowserHistory()

export const store = configureStore({
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        thunk: false
    }).concat(sagaMiddleware, logger, routerMiddleware(history)),
    reducer: {
        bootstrap: bootstrapReducer,
        boxes: boxesReducer,
        fps: fpsReducer,
        router: connectRouter(history)
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch