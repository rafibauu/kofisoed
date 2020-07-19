import { call, takeEvery, put } from 'redux-saga/effects'
import {
  watchAll,
  processWatchAll,
  loadData,
  processLoadData,
  callLogActivity,
  logActivity
} from '../app'
import { types } from '../../state/modules/app'
import { processLoad as dashboardLoad } from '../dashboard'

describe('saga - app.js', () => {
  it('watchAll', () => {
    const gen = watchAll()
    const expectedWatchAll = takeEvery('*', processWatchAll)
    expect(gen.next().value).toEqual(expectedWatchAll)
    expect(gen.next().done).toEqual(true)
  })

  it('loadData', () => {
    const gen = loadData()
    const expectedLoadData = takeEvery(types.LOAD_DATA, processLoadData)
    expect(gen.next().value).toEqual(expectedLoadData)
    expect(gen.next().done).toEqual(true)
  })

  it('processLoadData', () => {
    const expectedResponse = {}
    const gen = processLoadData()
    const expectedCallProcessLoadData = call(dashboardLoad, 'load')
    expect(gen.next().value).toEqual(expectedCallProcessLoadData)
    const expectedPutProcessLoadData = put({ type: types.LOAD_DATA_FINISH })
    expect(gen.next(expectedResponse).value).toEqual(expectedPutProcessLoadData)
    expect(gen.next().done).toEqual(true)
  })

  it('callLogActivity', () => {
    const gen = callLogActivity()
    const expectedCallLogActivity = takeEvery(
      types.CALL_LOG_ACTIVITY,
      logActivity,
      'normal'
    )
    expect(gen.next().value).toEqual(expectedCallLogActivity)
    expect(gen.next().done).toEqual(true)
  })
})
