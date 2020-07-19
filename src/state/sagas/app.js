import { all, takeEvery, put, fork, call, select } from 'redux-saga/effects'
import { getFirebase } from 'react-redux-firebase'
import axios from 'axios'
import bowser from 'bowser'
import uuidv1 from 'uuid/v1'
import uuidv5 from 'uuid/v5'

import { AppActionTypes } from '../modules/app'

export function* handleWatchAll(action) {
  if (
    action.type.includes('FAILED') ||
    action.type.includes('LOGOUT_EXPIRED_SUCCESS') ||
    action.type.includes('LOGOUT_CACHE_SUCCESS')
  ) {
    yield put({
      type: AppActionTypes.SHOW_SNACKBAR,
      payload: {
        snackbarMessage: action.payload.error,
        shouldRedirectToHome: action.payload.shouldRedirectToHome
      }
    })
  }
}

export function* watchAll() {
  yield takeEvery('*', handleWatchAll)
}

export function* handlePushUserLog(mode, data) {
  const { app, auth } = yield select()
  const { device } = app
  const { id: uid, name } = auth.user
  const firebase = getFirebase()
  const sessionPath = `/session/${uid}/log`
  const logDetails = mode === 'normal' ? data.payload : data
  if (logDetails) {
    try {
      const log = {
        ...logDetails,
        browser_platform: logDetails.browser_platform || device.browser,
        log: `${name} ${logDetails.log}`,
        ip: logDetails.ip || device.ip
      }
      firebase.push(sessionPath, log)
    } catch (e) {
      Error(data, mode, e)
    }
  }
}

export function* watchPushUserLog() {
  yield takeEvery(AppActionTypes.PUSH_USER_LOG, handlePushUserLog, 'normal')
}

export function* handleSetUserDevice() {
  const state = yield select()
  const userAgent = bowser.getParser(window.navigator.userAgent)
  const { clientUniqueId, device: oldDevice } = state.app
  const { browser, os, platform } = userAgent.parsedResult
  const newDevice = { os: os.name, browser: browser.name, type: platform.type }
  try {
    const request = yield call(
      axios.get,
      `https://us-central1-firetica-talentlytica.cloudfunctions.net/helper/ipaddress`
    )
    newDevice.ip = request.data.clientIP
    if (!clientUniqueId) {
      const ID = `${newDevice.ip}|${newDevice.os}|${newDevice.browser}|${newDevice.type}`
      const NAME_SPACE = uuidv1()
      const newClientUniqueId = uuidv5(ID, NAME_SPACE)
      yield call(handlePushUserLog, 'direct', {
        browser_platform: newDevice.browser,
        ip: newDevice.ip,
        type: 'activity',
        date: Date.now(),
        log: 'mengirimkan device details'
      })
      yield put({
        type: AppActionTypes.SET_USER_DEVICE_SUCCESS,
        payload: { device: newDevice, newClientUniqueId }
      })
    } else if (oldDevice.ip !== newDevice.ip) {
      yield call(handlePushUserLog, 'direct', {
        browser_platform: newDevice.browser,
        ip: newDevice.ip,
        type: 'activity',
        date: Date.now(),
        log: 'berganti IP Address'
      })
      yield put({ type: AppActionTypes.SET_USER_DEVICE_CHANGE_IP_ADDRESS })
    }
    yield put({
      type: AppActionTypes.SET_USER_DEVICE_FINISHED,
      payload: { device: newDevice }
    })
  } catch (e) {
    yield put({
      type: AppActionTypes.SET_USER_DEVICE_FAILED,
      payload: { device: newDevice, error: e }
    })
  }
}

export function* watchSetUserDevice() {
  yield takeEvery(AppActionTypes.SET_USER_DEVICE_REQUEST, handleSetUserDevice)
}

export default function* rootSaga() {
  yield all([fork(watchAll), fork(watchSetUserDevice), fork(watchPushUserLog)])
}
