import 'regenerator-runtime/runtime'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
// Router
import { Provider } from 'react-redux'
// Redux
import { sagaMiddleware, store } from './store'
// Components
import { App } from './app'
import { rootSaga } from './sagas'

const root = createRoot(document.getElementById('app'))
root.render(
    <Provider store={store}>
        <App />
    </Provider>
)

sagaMiddleware.run(rootSaga)
