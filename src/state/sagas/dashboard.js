import {
  all,
  call,
  delay,
  fork,
  put,
  race,
  select,
  takeEvery
} from 'redux-saga/effects'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

import { DashboardActionTypes } from '../modules/dashboard'
import { getValue, multiUpdate } from '../../services/firebase'
import functions from '../../services/functions'
import { handleSendLogActivity } from './app'

export function* handleLoadAssessmentRequest() {
  const state = yield select()
  const { uid, uuid } = state.auth.user
  try {
    const details = {
      hasAssessment: false,
      corporate: null,
      project: null
    }

    const [rawAssessment, rawProject] = yield all([
      call(getValue, `raw_assessment/${uid}/${uuid}`),
      call(getValue, `raw_project/${uuid}`)
    ])

    dayjs.extend(isBetween)
    const { start_date: startDate, end_date: endDate } = rawProject.data
    const isNotFinished = rawAssessment.status === 0
    const isActive = dayjs().isBetween(startDate, endDate, 'second')

    if (isNotFinished && isActive) {
      details.hasAssessment = true
      details.corporate = {
        name: rawProject.corporate,
        id: rawProject.id_corporate,
        urlSite: rawProject.url_site
      }
      details.project = {
        items: rawProject.data.test,
        itemsCount: rawProject.count_test,
        id: rawProject.id_project,
        slug: rawProject.slug_project,
        startDate: rawProject.data.start_date,
        endDate: rawProject.data.end_date,
        verification: rawProject.verification
      }
    }

    yield put({
      type: DashboardActionTypes.LOAD_ASSESSMENT_SUCCESS,
      payload: { ...details }
    })
  } catch (e) {
    yield put({
      type: DashboardActionTypes.LOAD_ASSESSMENT_FAILED,
      payload: { error: 'Kesalahan dalam memuat assessment.' }
    })
  }
}

export function* watchLoadAssessmentRequest() {
  yield takeEvery(
    DashboardActionTypes.LOAD_ASSESSMENT_REQUEST,
    handleLoadAssessmentRequest
  )
}

export function* handleInstructionLoadRequest(action) {
  const { title } = action.payload
  try {
    const { instruction } = yield race({
      // instruction: call(api.get, `instruction?file=${backAdminParam}`),
      timeout: delay(30000)
    })

    if (instruction) {
      yield call(handleSendLogActivity, {
        payload: {
          mode: 'indirect',
          data: {
            type: 'activity',
            date: Date.now(),
            log: `berhasil memuat instruksi soal subtest ${title}`
          }
        }
      })
      yield put({
        type: DashboardActionTypes.INSTRUCTION_LOAD_SUCCESS,
        payload: { instruction: instruction.data }
      })
    } else {
      yield call(handleSendLogActivity, {
        payload: {
          mode: 'indirect',
          data: {
            type: 'error',
            date: Date.now(),
            log: `gagal memuat instruksi soal subtest ${title} : Timeout 30 detik`
          }
        }
      })
      yield put({
        type: DashboardActionTypes.INSTRUCTION_LOAD_FAILURE,
        payload: { error: `Tidak bisa memuat data : Timeout 30 detik` }
      })
    }
  } catch (e) {
    // const errorMessage = handleError(e)
    const errorMessage = 'error'
    yield call(handleSendLogActivity, {
      payload: {
        mode: 'indirect',
        data: {
          type: 'error',
          date: Date.now(),
          log: `gagal memuat instruksi soal subtest ${title} : ${errorMessage}`
        }
      }
    })
    yield put({
      type: DashboardActionTypes.INSTRUCTION_LOAD_FAILURE,
      payload: { error: `Tidak bisa memuat data : ${errorMessage}` }
    })
  }
}

export function* watchInstructionLoadRequest() {
  yield takeEvery(
    DashboardActionTypes.INSTRUCTION_LOAD_REQUEST,
    handleInstructionLoadRequest
  )
}

export function* handleSimulationLoadRequest(action) {
  const { slug, testId } = action.payload
  const state = yield select()
  const {
    simulation: currentSimulation,
    testId: currentTestId
  } = state.dashboard
  const keys = Object.keys(currentSimulation)
  if (keys.length === 0 || currentTestId !== testId) {
    try {
      const { simulation } = yield race({
        // simulation: call(api.get, `simulation?subtest=${slug}`),
        timeout: delay(30000)
      })

      if (simulation) {
        yield call(handleSendLogActivity, {
          payload: {
            mode: 'indirect',
            data: {
              type: 'activity',
              date: Date.now(),
              log: `berhasil memuat simulasi soal subtest ${slug}`
            }
          }
        })
        yield put({
          type: DashboardActionTypes.SIMULATION_LOAD_SUCCESS,
          payload: { simulation: simulation.data }
        })
      } else {
        yield call(handleSendLogActivity, {
          payload: {
            mode: 'indirect',
            data: {
              type: 'error',
              date: Date.now(),
              log: `gagal memuat simulasi soal subtest ${slug} : Timeout 30 detik`
            }
          }
        })
        yield put({
          type: DashboardActionTypes.SIMULATION_LOAD_FAILURE,
          payload: { error: 'Timeout 30 detik' }
        })
      }
    } catch (e) {
      // const errorMessage = handleError(e)
      const errorMessage = 'error'
      yield call(handleSendLogActivity, {
        payload: {
          mode: 'indirect',
          data: {
            type: 'error',
            date: Date.now(),
            log: `gagal memuat simulasi soal subtest ${slug} : ${errorMessage}`
          }
        }
      })
      yield put({
        type: DashboardActionTypes.SIMULATION_LOAD_FAILURE,
        payload: { error: `Tidak bisa memuat data : ${errorMessage}` }
      })
    }
  } else {
    yield put({
      type: DashboardActionTypes.SIMULATION_LOAD_SUCCESS,
      payload: { simulation: currentSimulation }
    })
  }
}

export function* watchSimulationLoadRequest() {
  yield takeEvery(
    DashboardActionTypes.SIMULATION_LOAD_REQUEST,
    handleSimulationLoadRequest
  )
}

export function* handleSendRawInputRequest(action) {
  const { data, callback } = action.payload
  const { uid, uuid, tid, rawProject, rawStatus, rawAssessment } = data
  const projectIndex = rawProject.activeIndex
  const update = {
    [`raw_project/${uuid}/data/test/${projectIndex}/status`]: 1,
    [`raw_status/${uuid}/${tid}`]: rawStatus
  }
  if (rawAssessment) {
    update[`raw_assessment/${uid}/${uuid}`] = rawAssessment
  }
  try {
    yield call(functions.post, `queue/create`, { data: rawStatus.data })
    yield call(multiUpdate, update)
    yield call(handleSendLogActivity, {
      payload: {
        mode: 'indirect',
        data: {
          type: 'activity',
          date: Date.now(),
          log: `meyelesaikan test dan memperbaharui raw status / assessment subtest ${rawStatus.title}`
        }
      }
    })
    yield call(callback.success)
    yield put({ type: DashboardActionTypes.SEND_RAW_INPUT_SUCCESS })
  } catch (e) {
    // const errorMessage = handleError(e)
    const errorMessage = 'error'
    yield call(handleSendLogActivity, {
      payload: {
        mode: 'indirect',
        data: {
          type: 'error',
          date: Date.now(),
          log: `gagal memperbaharui raw status dan raw assessment subtest ${rawStatus.title}`
        }
      }
    })
    yield call(callback.failed, errorMessage)
    yield put({
      type: DashboardActionTypes.SEND_RAW_INPUT_FAILED,
      payload: { error: `Tidak bisa mengirim data: ${e}` }
    })
  }
}

export function* watchSendRawInputRequest() {
  yield takeEvery(
    DashboardActionTypes.SEND_RAW_INPUT_REQUEST,
    handleSendRawInputRequest
  )
}

export default function* rootSaga() {
  yield all([
    fork(watchLoadAssessmentRequest),
    fork(watchInstructionLoadRequest),
    fork(watchSimulationLoadRequest),
    fork(watchSendRawInputRequest)
  ])
}
