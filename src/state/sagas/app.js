import { all, takeEvery, put, fork, call, select } from 'redux-saga/effects'
import { getFirebase } from 'react-redux-firebase'
import axios from 'axios'
import bowser from 'bowser'
import uuidv1 from 'uuid/v1'
import uuidv5 from 'uuid/v5'

import { types } from '../modules/app'
import { AuthActionTypes } from '../modules/auth'
import { getValue, multiUpdate } from '../../services/firebase'

export function* processWatchAll(action) {
  if (
    action.type.includes('FAILURE') ||
    action.type.includes('FAILED') ||
    action.type.includes('LOGOUT_EXPIRED_SUCCESS') ||
    action.type.includes('LOGOUT_CACHE_SUCCESS')
  ) {
    yield put({
      type: types.SHOW_SNACKBAR,
      payload: {
        message: action.payload.error,
        shouldRedirectToHome: action.payload.shouldRedirectToHome
      }
    })

    if (
      action.payload.error.includes('expired') ||
      action.payload.error.includes('unauthenticated') ||
      action.payload.error.includes('The custom token format is incorrect') ||
      action.payload.error.includes(`must be of the type string, none returned`) ||
      action.payload.error.includes(`Route [/] not defined.`)
    ) {
      yield put({ type: AuthActionTypes.LOGOUT_REQUEST })
    }
  }
}

export function* watchAll() {
  yield takeEvery('*', processWatchAll)
}

export function* handleSendLogActivity(action) {
  const { mode, data } = action.payload
  const { app, auth } = yield select()
  const { device } = app
  const { uuid, fullName } = auth.user
  const firebase = getFirebase()
  const sessionPath = `/session/${uuid}/log`
  if (data && uuid !== 0) {
    try {
      const log = {
        ...data,
        browser_platform: data.browser_platform || device.browser,
        log: `${fullName} ${data.log}`,
        ip: data.ip || device.ip
      }
      firebase.push(sessionPath, log)
    } catch (e) {
      console.log(data, mode, e)
    }
  }
}

export function* watchSendLogActivity() {
  yield takeEvery(types.SEND_LOG_ACTIVITY, handleSendLogActivity)
}

export function* handleSetUserDevice() {
  const state = yield select()
  const userAgent = bowser.getParser(window.navigator.userAgent)
  const { clientUniqueId: oldClientUniqueId } = state.app
  const { browser, os, platform } = userAgent.parsedResult
  const newDevice = { os: os.name, browser: browser.name, type: platform.type }
  let newClientUniqueId = oldClientUniqueId
  try {
    const request = yield call(
      axios.get,
      `https://us-central1-firetica-talentlytica.cloudfunctions.net/helper/ipaddress`
    )
    newDevice.ip = request.data.clientIP
    if (!newClientUniqueId) {
      const ID = `${newDevice.ip}|${newDevice.os}|${newDevice.browser}|${newDevice.type}`
      const NAME_SPACE = uuidv1()
      newClientUniqueId = uuidv5(ID, NAME_SPACE)
    }
    yield put({
      type: types.SET_USER_DEVICE_SUCCESS,
      payload: { device: newDevice, clientUniqueId: newClientUniqueId }
    })
  } catch (e) {
    yield put({
      type: types.SET_USER_DEVICE_FAILED,
      payload: { device: newDevice, error: e }
    })
  }
}

export function* watchSetUserDevice() {
  yield takeEvery(types.SET_USER_DEVICE_REQUEST, handleSetUserDevice)
}

export function* handleSendClientUniqueId() {
  const { app, auth } = yield select()
  const { uuid } = auth.user
  const { clientUniqueId } = app
  if (uuid !== 0) {
    const sessionPath = `/session/${uuid}/clientUniqueId/`
    const existCLientUniqueId = yield call(getValue, sessionPath)
    const update = {
      [`/session/${uuid}/validationDevice`]: false,
      [`/session/${uuid}/clientUniqueId/${clientUniqueId}`]: true
    }
    if (!existCLientUniqueId) {
      update[`/session/${uuid}/validationDevice`] = true
      return yield call(multiUpdate, update)
    }
    const uniqueKeys = Object.keys(existCLientUniqueId)
    if (uniqueKeys.length === 1 && uniqueKeys.includes(clientUniqueId)) {
      update[`/session/${uuid}/validationDevice`] = true
    }
    return yield call(multiUpdate, update)
  }
  return false
}

export default function* rootSaga() {
  yield all([
    fork(watchAll),
    fork(watchSendLogActivity),
    fork(watchSetUserDevice)
  ])
}
