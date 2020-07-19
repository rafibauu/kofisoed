import { call, takeEvery, put } from 'redux-saga/effects'
import {
  loadRequest,
  processLoad,
  instructionLoadRequest,
  processLoadInstruction,
  simulationLoadRequest,
  processLoadSimulation,
  saveRawInput,
  processSaveRawInput
} from '../dashboard'
import api from '../../services/api'
import { types, getItems } from '../../state/modules/dashboard'

describe('saga - dashboard.js', () => {
  it('loadRequest', () => {
    const gen = loadRequest()
    const expected = takeEvery(types.LOAD_REQUEST, processLoad, 'load')
    expect(gen.next().value).toEqual(expected)
    expect(gen.next().done).toEqual(true)
  })

  it('processLoad', () => {
    const payload = {}
    const gen = processLoad('load', payload)
  })

  it('instructionLoadRequest', () => {
    const gen = instructionLoadRequest()
    const expectedInstructionLoadRequest = takeEvery(
      types.INSTRUCTION_LOAD_REQUEST,
      processLoadInstruction
    )
    expect(gen.next().value).toEqual(expectedInstructionLoadRequest)
    expect(gen.next().done).toEqual(true)
  })

  it('processLoadInstruction', () => {
    const action = { payload: { title: 'title' } }
    const gen = processLoadInstruction(action)
    const expectedLoadInstruction = call(
      api.get,
      `instruction?file=${action.payload.title}`
    )
    expect(gen.next().value).toEqual(expectedLoadInstruction)

    const expectedResponse = {}
    const expectedCallLoadInstruction = put({
      type: types.INSTRUCTION_LOAD_SUCCESS,
      payload: { instruction: expectedResponse.instruction }
    })
    expect(gen.next(expectedResponse).value).toEqual(
      expectedCallLoadInstruction
    )
    expect(gen.next().done).toEqual(true)
  })

  it('simulationLoadRequest', () => {
    const gen = simulationLoadRequest()
    const expectedSimulationLoadReq = takeEvery(
      types.SIMULATION_LOAD_REQUEST,
      processLoadSimulation
    )
    expect(gen.next().value).toEqual(expectedSimulationLoadReq)
    expect(gen.next().done).toEqual(true)
  })

  it('processLoadSimulation', () => {
    const action = { payload: { title: 'title' } }
    const gen = processLoadSimulation(action)
    const expectedProcessLoadSimulation = call(
      api.get,
      `simulation?subtest=${action.payload.title}`
    )
    expect(gen.next().value).toEqual(expectedProcessLoadSimulation)

    const expectedResponse = {}
    const expectedPutLoadSimulator = put({
      type: types.SIMULATION_LOAD_SUCCESS,
      payload: { simulation: expectedResponse.data }
    })
    expect(gen.next(expectedResponse).value).toEqual(expectedPutLoadSimulator)
    expect(gen.next().done).toEqual(true)
  })

  it('saveRawInput', () => {
    const gen = saveRawInput()
    const expectedSaveRawInput = takeEvery(
      types.SAVE_RAW_INPUT_REQUEST,
      processSaveRawInput
    )
    expect(gen.next().value).toEqual(expectedSaveRawInput)
    expect(gen.next().done).toEqual(true)
  })

  it('processSaveRawInput', () => {
    const expectedResponse = {}
    const data = {
      slug_project: 'slug_project',
      subtest_id: 'files[restProps.match.params.title]',
      category: 'itemSoal.category_test'
    }
    const callback = () => {}
    const action = { payload: { data, callback } }
    const gen = processSaveRawInput(action)
    const expectedCallSaveRawInput = call(
      api.post,
      `save-raw-input`,
      action.payload.data
    )
    expect(gen.next().value).toEqual(expectedCallSaveRawInput)
    const expectedCallCallback = call(action.payload.callback, true)
    expect(gen.next().value).toEqual(expectedCallCallback)
    const expectedCallProcessLoad = call(processLoad, 'sync')
    expect(gen.next().value).toEqual(expectedCallProcessLoad)
    const expectedPutSuccess = put({ type: types.SAVE_RAW_INPUT_SUCCESS })
    expect(gen.next(expectedResponse).value).toEqual(expectedPutSuccess)
    expect(gen.next().done).toEqual(true)
  })
})
