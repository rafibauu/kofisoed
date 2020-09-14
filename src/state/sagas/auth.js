import {
  all,
  call,
  fork,
  put,
  select,
  take,
  takeEvery
} from 'redux-saga/effects'

import { AuthActionTypes } from '../modules/auth'
import { handleSendLogActivity } from './app'
import {
  getEmailMethod,
  createUser,
  loginFirebase,
  logoutFirebase,
  getValue,
  updateValue,
  getAuthErrorMessage
} from '../../services/firebase'

export function* handleAutoLoginRequest() {
  // const state = yield select()
  // const { jwt } = state.auth
  yield put({ type: AuthActionTypes.AUTO_LOGIN_FINISH })
}

export function* watchAutoLoginRequest() {
  yield takeEvery(AuthActionTypes.AUTO_LOGIN_REQUEST, handleAutoLoginRequest)
}

export function* handleRegisterRequest(action) {
  const { name, nim, email, password, callback } = action.payload
  try {
    const [emailChecking, nimChecking] = yield all([
      call(getEmailMethod, email),
      call(getValue, `userRegistered/${nim}/status`)
    ])
    const emailIsRegistered = emailChecking[0] !== undefined
    const nimIsRegistered = nimChecking !== null
    if (nimIsRegistered) {
      callback().failed()
      yield put({
        type: AuthActionTypes.REGISTRATION_FAILED,
        payload: { error: 'NIM sudah diregistrasi oleh akun lain.' }
      })
    } else if (emailIsRegistered) {
      callback().failed()
      yield put({
        type: AuthActionTypes.REGISTRATION_FAILED,
        payload: { error: 'Email sudah terdaftar.' }
      })
    } else {
      yield call(
        createUser,
        { email, password },
        { username: name, email, nim }
      )
      callback().success()
      yield put({ type: AuthActionTypes.REGISTRATION_SUCCESS })
    }
  } catch (e) {
    yield put({
      type: AuthActionTypes.REGISTRATION_FAILED,
      payload: { error: `Terjadi kesalahan, error: ${e.message}` }
    })
  }
}

export function* watchRegisterRequest() {
  yield takeEvery(AuthActionTypes.REGISTRATION_REQUEST, handleRegisterRequest)
}

export function* handleRegisterSucceed() {
  const state = yield select()
  const firebaseAuth = state.firebase
  const { nim } = firebaseAuth.profile
  const { uid } = firebaseAuth.auth
  try {
    yield call(updateValue, `userRegistered/${nim}/`, {
      uid,
      status: true,
      timestamp: Date.now()
    })
    yield call(logoutFirebase)
    return true
  } catch (e) {
    return e.message
  }
}

export function* watchRegisterSucceed() {
  yield takeEvery(AuthActionTypes.REGISTRATION_SUCCESS, handleRegisterSucceed)
}

export function* handleLoginRequest(action) {
  const { email, password } = action.payload
  try {
    yield call(loginFirebase, { email, password })
    yield put({ type: AuthActionTypes.LOGIN_SUCCESS })
  } catch (e) {
    // console.log(e.message)
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

export function* handleLogoutExpiredRequest() {
  yield call(handleSendLogActivity, {
    payload: {
      mode: 'indirect',
      data: {
        type: 'activity',
        date: Date.now(),
        log: 'Session telah berakhir, logout otomatis'
      }
    }
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

export function* handleLogoutCacheRequest() {
  yield call(handleSendLogActivity, {
    payload: {
      mode: 'indirect',
      data: {
        type: 'activity',
        date: Date.now(),
        log: 'Kehilangan local storage aplikasi'
      }
    }
  })
  yield put({ type: AuthActionTypes.LOGOUT_REQUEST })
  yield take('RESET')
  yield put({
    type: AuthActionTypes.LOGOUT_CACHE_SUCCESS,
    payload: { error: 'Mohon gunakan cookies anda, lakukan refresh halaman.' }
  })
}

export function* watchLogoutCacheRequest() {
  yield takeEvery(
    AuthActionTypes.LOGOUT_CACHE_REQUEST,
    handleLogoutCacheRequest
  )
}

export function* handleLogoutRequest() {
  try {
    yield call(logoutFirebase)
    yield put({ type: AuthActionTypes.LOGOUT_SUCCESS })
    yield put({ type: 'RESET' })
  } catch (e) {
    yield put({ type: AuthActionTypes.LOGOUT_SUCCESS })
    yield put({ type: 'RESET' })
  }
}

export function* watchLogoutRequest() {
  yield takeEvery(AuthActionTypes.LOGOUT_REQUEST, handleLogoutRequest)
}

export default function* rootSaga() {
  yield all([
    fork(watchAutoLoginRequest),
    fork(watchRegisterRequest),
    fork(watchRegisterSucceed),
    fork(watchLoginRequest),
    fork(watchLogoutExpiredRequest),
    fork(watchLogoutCacheRequest),
    fork(watchLogoutRequest)
  ])
}
