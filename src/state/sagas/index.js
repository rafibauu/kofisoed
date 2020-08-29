import { all } from 'redux-saga/effects'

import appSaga from './app'
import authSaga from './auth'
import dashboardSaga from './dashboard'
import skillsSaga from './skills'

export default function* rootSaga() {
  yield all([appSaga(), authSaga(), dashboardSaga(), skillsSaga()])
}
