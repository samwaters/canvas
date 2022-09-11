import { all, put } from '@redux-saga/core/effects'

import { bootstrapAction, ready } from 'store/bootstrap.store'
import { bootstrapSaga } from './bootstrap.saga'

function * rootSaga() {
    yield all([
        bootstrapSaga(),
        put(bootstrapAction()),
        put(ready())
    ])
}

export { rootSaga }