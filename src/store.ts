import { configureStore } from '@reduxjs/toolkit'
import bootstrapReducer from 'store/bootstrap.store'
import fpsReducer from 'store/fps.store'
import createSagaMiddleware from '@redux-saga/core'
import logger from 'redux-logger'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
export const sagaMiddleware = createSagaMiddleware()

export const history = createBrowserHistory()

export const store = configureStore({
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        thunk: false
    }).concat(sagaMiddleware, logger, routerMiddleware(history)),
    reducer: {
        bootstrap: bootstrapReducer,
        fps: fpsReducer,
        router: connectRouter(history)
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch