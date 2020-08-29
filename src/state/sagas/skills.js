import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { getValue } from '../../services/firebase'
import { SkillsActionTypes } from '../modules/skills'

export function* handleLoadSkillsRequest(action) {
  const { page, categories } = action.payload
  try {
    const data = yield call(getValue, '/skills')
    yield put({
      type: SkillsActionTypes.LOAD_SKILLS_SUCCEED,
      payload: { data }
    })
  } catch (e) {
    yield put({
      type: SkillsActionTypes.LOAD_SKILLS_FAILED,
      payload: { error: e.message }
    })
  }
}

export function* watchLoadSkillsRequest() {
  yield takeEvery(
    SkillsActionTypes.LOAD_SKILLS_REQUEST,
    handleLoadSkillsRequest
  )
}

export default function* rootSaga() {
  yield all([fork(watchLoadSkillsRequest)])
}
