import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects'
import moment from 'moment'

import { DashboardActiontypes } from '../modules/dashboard'
import api, { handleError } from '../../services/back-admin'
import { getValue, multiUpdate } from '../../services/firebase'
import { handlePushUserLog } from './app'
import { getActiveDataByKey, getDateStatus } from '../../utils/helper'

export function* handleLoadAssessmentRequest(action) {
  const nowMilis = Date.now()
  const { mode } = action.payload
  const state = yield select()
  const { uid } = state.auth.user
  const isFirstLoad = mode === 'load'
  const isSyncLoad = mode === 'sync'
  if (isFirstLoad || isSyncLoad) {
    try {
      const assessments = yield call(getValue, `users_data/${uid}`)
      let activeUsersProject = getActiveDataByKey(['status', 0], assessments)
      if (!activeUsersProject) {
        const assessmentKeys = Object.keys(assessments)
        const lastAssessmentKeys = assessmentKeys[assessmentKeys.length - 1]
        activeUsersProject = assessments[lastAssessmentKeys]
      }
      const { idProject } = activeUsersProject
      const fetchProject = yield call(getValue, `project/${idProject}`)
      const startMilis = moment(fetchProject.started_at).format('x')
      const endMilis = moment(fetchProject.ended_at).format('x')
      const activeStatus = getDateStatus(nowMilis, startMilis, endMilis)
      yield put({
        type: DashboardActiontypes.LOAD_ASSESSMENT_SUCCESS,
        payload: {
          project: {
            id: fetchProject.id,
            name: fetchProject.name,
            slug: fetchProject.slug,
            startDate: fetchProject.started_at,
            endDate: fetchProject.ended_at,
            markAsFinished: fetchProject.markAsFinished,
            status: activeStatus
          },
          username: activeUsersProject.userName,
          status: activeUsersProject.status,
          usersMapping: activeUsersProject.usersMapping
        }
      })
    } catch (e) {
      const errorMessage = handleError(e)
      yield put({
        type: DashboardActiontypes.LOAD_ASSESSMENT_FAILED,
        payload: { error: errorMessage }
      })
    }
  } else {
    // yield put({ type: DashboardActiontypes.LOAD_SUCCESS, payload: { items } })
  }
}

export function* watchLoadAssessmentRequest() {
  yield takeEvery(
    DashboardActiontypes.LOAD_ASSESSMENT_REQUEST,
    handleLoadAssessmentRequest
  )
}

export function* handleSendAssessmentRequest(action) {
  const { data, callback } = action.payload
  const { uid, tid, rawProject, rawStatus, rawAssessment } = data
  const projectIndex = rawProject.activeIndex
  const update = {
    [`raw_project/${uid}/data/test/${projectIndex}/status`]: 1,
    [`raw_status/${uid}/${tid}`]: rawStatus
  }
  if (rawAssessment) {
    update[`raw_assessment/${uid}/`] = rawAssessment
  }
  try {
    yield call(api.post, `save-raw-input`, rawStatus.data)
    yield call(multiUpdate, update)
    yield call(handlePushUserLog, 'direct', {
      type: 'activity',
      date: Date.now(),
      log: `berhasil memperbaharui raw status dan raw assessment subtest ${rawStatus.title}`
    })
    yield call(callback.success)
    yield put({ type: DashboardActiontypes.SEND_RAW_INPUT_SUCCESS })
  } catch (e) {
    const errorMessage = handleError(e)
    yield call(handlePushUserLog, 'direct', {
      type: 'error',
      date: Date.now(),
      log: `gagal memperbaharui raw status dan
        raw assessment subtest ${rawStatus.title}`
    })
    yield call(callback.failed)
    yield put({
      type: DashboardActiontypes.SEND_RAW_INPUT_FAILURE,
      payload: { error: `Tidak bisa mengirim data: ${errorMessage}` }
    })
  }
}

export function* watchSendAssessmentRequest() {
  yield takeEvery(
    DashboardActiontypes.SEND_ASSESSMENT_REQUEST,
    handleSendAssessmentRequest
  )
}

export default function* rootSaga() {
  yield all([
    fork(watchLoadAssessmentRequest),
    fork(watchSendAssessmentRequest)
  ])
}
