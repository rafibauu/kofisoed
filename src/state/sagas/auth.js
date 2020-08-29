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
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

import { types as AppActionTypes } from '../modules/app'
import { AuthActionTypes } from '../modules/auth'
import { DashboardActionTypes } from '../modules/dashboard'
import { handleSendLogActivity, handleSendClientUniqueId } from './app'
import {
  getEmailMethod,
  createUser,
  getValue,
  getValueWhere,
  getAuthErrorMessage
} from '../../services/firebase'
import ENV from '../../env'

export function* handleAutoLoginRequest() {
  // const state = yield select()
  // const { jwt } = state.auth
  yield put({ type: AuthActionTypes.AUTO_LOGIN_FINISH })
}

export function* watchAutoLoginRequest() {
  yield takeEvery(AuthActionTypes.AUTO_LOGIN_REQUEST, handleAutoLoginRequest)
}

export function* handleRegisterRequest(action) {
  const { name, nim, email, password } = action.payload
  try {
    const [emailChecking, nimChecking] = yield all([
      call(getEmailMethod, email),
      call(getValueWhere, { path: 'users', key: 'nim', value: nim, limit: 1 })
    ])
    const isNotRegistered = !emailChecking[0] && !nimChecking
    if (isNotRegistered) {
      const create = yield call(
        createUser,
        { email, password, signIn: false },
        { username: name, email, nim }
      )
      console.log(create)
    } else {

    }
  } catch (e) {
    console.log(e.message)
  }
  // console.log(a)
  // const isNotExist = !emailChecking.i && !nimChecking
  // if (isNotExist) {
  //   const createUser = firebaseAuth.createUser(
  //     { email, password, signIn: false },
  //     { username: name, email, nim }
  //   )
  //   console.log(createUser)
  // }
}

export function* watchRegisterRequest() {
  yield takeEvery(AuthActionTypes.REGISTRATION_REQUEST, handleRegisterRequest)
}

export function* handleLoginRequest(action) {
  const firebase = getFirebase()
  const { email, password } = action.payload
  try {
    yield put({ type: AppActionTypes.SET_USER_DEVICE_REQUEST })
    yield take(AppActionTypes.SET_USER_DEVICE_SUCCESS)
    const login = yield call(firebase.login, { email, password })
    const { uid } = login.user.user
    const user = { uid, email, id: 0, uuid: 0, fullName: '' }
    const assessment = { hasAssessment: false, corporate: null, project: null }
    const assessmentList = yield call(getValue, `raw_assessment/${uid}`)
    const uuidKeys = Object.keys(assessmentList)
    const getAllAssessmentDetails = yield all(
      uuidKeys.map((uuid) => {
        return call(getValue, `raw_project/${uuid}`)
      })
    )
    const activeAssessment = getAllAssessmentDetails.find((detail, index) => {
      dayjs.extend(isBetween)
      const uuid = uuidKeys[index]
      const { user_id_real: id, user_full_name: fullName } = detail
      const { start_date: startDate, end_date: endDate } = detail.data
      const isActive = dayjs().isBetween(startDate, endDate, 'second')
      const isNotFinished = assessmentList[uuid].status === 0
      user.uuid = uuid
      user.id = id
      user.fullName = fullName
      return isActive && isNotFinished
    })
    if (activeAssessment) {
      assessment.hasAssessment = true
      assessment.corporate = {
        name: activeAssessment.corporate,
        id: activeAssessment.id_corporate,
        urlSite: activeAssessment.url_site
      }
      assessment.project = {
        items: activeAssessment.data.test,
        itemsCount: activeAssessment.count_test,
        id: activeAssessment.id_project,
        slug: activeAssessment.slug_project,
        startDate: activeAssessment.data.start_date,
        endDate: activeAssessment.data.end_date,
        verification: activeAssessment.verification
      }
    }
    yield put({
      type: AuthActionTypes.LOGIN_SET_INFO,
      payload: {
        user,
        expiredMilis: Date.now() + (ENV.APP_SESSION_EXPIRED_TIME - 3) * 1000
      }
    })
    yield put({
      type: DashboardActionTypes.LOAD_ASSESSMENT_SUCCESS,
      payload: { ...assessment }
    })
    yield call(handleSendClientUniqueId)
    yield call(handleSendLogActivity, {
      payload: {
        mode: 'direct',
        data: {
          type: 'activity',
          date: Date.now(),
          log: 'Berhasil login'
        }
      }
    })
    yield put({ type: AuthActionTypes.LOGIN_SUCCESS })
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
  const state = yield select()
  const { auth } = state
  const firebase = getFirebase()
  const firebaseAuth = state.firebase.auth.isEmpty

  if (auth.isLoggedIn || !firebaseAuth) {
    yield call(firebase.logout)
    yield put({ type: 'CHANGE_AUTH' })
  }

  yield put({
    type: AuthActionTypes.LOGIN_APP_REQUEST,
    payload: { ...action.payload, mode: 'token' }
  })
  yield take(AuthActionTypes.LOGIN_APP_SUCCESS)
  yield put({ type: AppActionTypes.SET_USER_DEVICE_REQUEST })
  yield take(AppActionTypes.SET_USER_DEVICE_FINISHED)
  yield put({ type: AuthActionTypes.LOGIN_FIREBASE_REQUEST })
  yield call(action.payload.callback, true)
}

export function* watchLoginTokenRequest() {
  yield takeEvery(AuthActionTypes.LOGIN_TOKEN_REQUEST, handleLoginTokenRequest)
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
  const firebase = yield getFirebase()
  const state = yield select()
  const { uid } = state.firebase.auth
  try {
    yield call(firebase.update, `/session/${uid}/deviceIds`, {
      [state.app.clientUniqueId]: false
    })
    yield call(handleSendLogActivity, {
      payload: {
        mode: 'indirect',
        data: {
          type: 'activity',
          date: Date.now(),
          log: 'Berhasil log out'
        }
      }
    })
    yield call(firebase.logout)
    yield put({ type: AuthActionTypes.LOGOUT_SUCCESS })
    yield put({ type: 'RESET' })
  } catch (e) {
    yield call(handleSendLogActivity, {
      payload: {
        mode: 'indirect',
        data: {
          type: 'error',
          date: Date.now(),
          log: 'Gagal log out'
        }
      }
    })
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
    fork(watchLoginRequest),
    fork(watchLoginTokenRequest),
    fork(watchLogoutExpiredRequest),
    fork(watchLogoutCacheRequest),
    fork(watchLogoutRequest)
  ])
}
