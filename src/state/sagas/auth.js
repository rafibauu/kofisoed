import {
  all,
  call,
  fork,
  put,
  select,
  take,
  takeEvery
} from 'redux-saga/effects'
import { getFirebase } from 'react-redux-firebase'
import axios from 'axios'

import { AuthActionTypes } from '../modules/auth'
import { handlePushUserLog } from './app'
import { getAuthErrorMessage } from '../../services/firebase'
import ENV from '../../env'

export function* handleAutoLoginRequest() {
  // const state = yield select()
  yield put({ type: AuthActionTypes.AUTO_LOGIN_FINISH })
}

export function* watchAutoLoginRequest() {
  yield takeEvery(AuthActionTypes.AUTO_LOGIN_REQUEST, handleAutoLoginRequest)
}

export function* handleLoginRequest(action) {
  const firebase = getFirebase()
  const { email, password } = action.payload
  try {
    const login = yield call(firebase.login, { email, password })
    const { user } = login.user
    const { uid, email: trueEmail } = user
    yield put({
      type: AuthActionTypes.LOGIN_SUCCESS,
      payload: {
        uid,
        email: trueEmail,
        expiredMilis: Date.now() + (ENV.APP_SESSION_EXPIRED_TIME - 3) * 1000
      }
    })
  } catch (e) {
    const message = getAuthErrorMessage(e)
    yield put({
      type: AuthActionTypes.LOGIN_FAILED,
      payload: { error: message }
    })
  }
}

export function* watchLoginRequest() {
  yield takeEvery(AuthActionTypes.LOGIN_REQUEST, handleLoginRequest)
}

export function* handleLoginTokenRequest(action) {
  const { callback, token } = action.payload
  const { success, failed } = callback()
  const state = yield select()
  const { auth } = state
  const firebase = getFirebase()
  const firebaseAuth = state.firebase.auth.isEmpty

  if (auth.isLoggedIn || !firebaseAuth) {
    yield call(firebase.logout)
    yield put({ type: 'CHANGE_AUTH' })
  }

  try {
    const requestDecrypt = yield call(
      axios.post,
      `https://us-central1-multirater-pegadaian.cloudfunctions.net/api/v1/decrypt`,
      { tokenLogin: token }
    )
    const { token: tokenBase64 } = requestDecrypt.data
    if (tokenBase64) {
      const parseToken = JSON.parse(window.atob(tokenBase64))
      const { email, password } = parseToken
      const login = yield call(firebase.login, { email, password })
      const { user } = login.user
      const { uid, email: trueEmail } = user
      success()
      yield put({
        type: AuthActionTypes.LOGIN_SUCCESS,
        payload: {
          uid,
          email: trueEmail,
          expiredMilis: Date.now() + (ENV.APP_SESSION_EXPIRED_TIME - 3) * 1000
        }
      })
    } else {
      failed()
      yield put({
        type: AuthActionTypes.LOGIN_TOKEN_FAILED,
        payload: { error: 'Token is invalid' }
      })
    }
  } catch (e) {
    failed()
    const message = getAuthErrorMessage(e)
    yield put({
      type: AuthActionTypes.LOGIN_TOKEN_FAILED,
      payload: { error: message }
    })
  }
}

export function* watchLoginTokenRequest() {
  yield takeEvery(AuthActionTypes.LOGIN_TOKEN_REQUEST, handleLoginTokenRequest)
}

export function* handleLogoutExpiredRequest() {
  yield call(handlePushUserLog, 'direct', {
    type: 'activity',
    date: Date.now(),
    log: 'Session habis, logout otomatis'
  })
  yield put({ type: AuthActionTypes.LOGOUT_REQUEST })
  yield take('RESET')
  yield put({
    type: AuthActionTypes.LOGOUT_EXPIRED_SUCCESS,
    payload: { error: 'Session anda telah berakhir, silakan login kembali.' }
  })
}

export function* watchLogoutExpiredRequest() {
  yield takeEvery(
    AuthActionTypes.LOGOUT_EXPIRED_REQUEST,
    handleLogoutExpiredRequest
  )
}

// export function* handleLogoutCacheRequest(action) {
//   yield call(handlePushUserLog, 'direct', {
//     type: 'activity',
//     date: Date.now(),
//     log: 'kehilangan cache aplikasi'
//   })
//   yield put({ type: AuthActionTypes.LOGOUT_REQUEST })
//   yield take('RESET')
//   yield put ({
//     type: AuthActionTypes.LOGOUT_CACHE_SUCCESS,
//     payload: { error: 'Mohon gunakan cookies anda, lakukan refresh halaman.' }
//   })
// }

// export function* watchLogoutCacheRequest() {
//   yield takeEvery(AuthActionTypes.LOGOUT_CACHE_REQUEST, handleLogoutCacheRequest)
// }

export function* handleLogoutRequest() {
  // const state = yield select()
  const firebase = getFirebase()
  // const { uid } = state.firebase.auth
  // const { clientUniqueId } = state.app
  try {
    // yield call(
    //   firebase.update,
    //   `/session/${uid}/deviceIds`,
    //   { [clientUniqueId]: false }
    // )
    // yield call(handlePushUserLog, 'direct', {
    //   type: 'activity',
    //   date: Date.now(),
    //   log: 'berhasil log out'
    // })
    yield call(firebase.logout)
    yield put({ type: AuthActionTypes.LOGOUT_SUCCESS })
    yield put({ type: 'RESET' })
  } catch (e) {
    // yield call(handlePushUserLog, 'direct', {
    //   type: 'error',
    //   date: Date.now(),
    //   log: 'gagal log out'
    // })
    yield put({
      type: AuthActionTypes.LOGOUT_FAILED,
      payload: { error: `Error: ${e}` }
    })
  }
}

export function* watchLogoutRequest() {
  yield takeEvery(AuthActionTypes.LOGOUT_REQUEST, handleLogoutRequest)
}

export default function* rootSaga() {
  yield all([
    fork(watchAutoLoginRequest),
    fork(watchLoginRequest),
    fork(watchLoginTokenRequest),
    fork(watchLogoutExpiredRequest),
    // fork(watchLogoutCacheRequest),
    fork(watchLogoutRequest)
  ])
}
