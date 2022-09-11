import { put, takeEvery } from '@redux-saga/core/effects'

import { bootstrapAction } from 'store/bootstrap.store'

function * bootstrap() {
    // yield put(loadConfig())
}

export function * bootstrapSaga() {
    yield takeEvery(bootstrapAction, bootstrap)
}