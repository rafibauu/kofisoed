import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { getValueWhere, getValueBetween } from '../../services/firebase'
import { SkillsActionTypes } from '../modules/skills'

export function* handleLoadSkillsRequest(action) {
  const { category } = action.payload
  try {
    let data
    if (category === 'all') {
      data = yield call(getValueWhere, {
        path: 'skills',
        key: 'timestamp'
      })
    } else {
      data = yield call(getValueBetween, {
        path: 'skills',
        key: 'category',
        value: 'cerita-alumni',
        start: 1
      })
    }
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
