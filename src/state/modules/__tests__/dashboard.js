import reducer, { types, actions, initialState } from '../dashboard'

describe('action', () => {
  it('load_request', () => {
    const expectedAction = {
      type: types.LOAD_REQUEST
    }
    expect(actions.load()).toEqual(expectedAction)
  })
  it('loadInstruction', () => {
    const title = 'title'
    const expectedAction = {
      type: types.INSTRUCTION_LOAD_REQUEST,
      payload: { title }
    }
    expect(actions.loadInstruction(title)).toEqual(expectedAction)
  })
  it('loadSimulation', () => {
    const title = 'title'
    const expectedAction = {
      type: types.SIMULATION_LOAD_REQUEST,
      payload: { title }
    }
    expect(actions.loadSimulation(title)).toEqual(expectedAction)
  })
  it('saveRawInput', () => {
    const data = 'data'
    const callback = 'callback'
    const expectedAction = {
      type: types.SAVE_RAW_INPUT_REQUEST,
      payload: { data, callback }
    }
    expect(actions.saveRawInput(data, callback)).toEqual(expectedAction)
  })
})
describe('reducer', () => {
  it('should return initial state', () => {
    expect(reducer(initialState, { type: undefined })).toEqual(initialState)
  })
  it('should return new state with isloading true', () => {
    const isLoading = true
    expect(
      reducer(initialState, { type: types.LOAD_REQUEST, isLoading })
    ).toEqual({ ...initialState, isLoading })
  })
  it('should return new state with isloading true', () => {
    const isLoading = true
    expect(
      reducer(initialState, { type: types.INSTRUCTION_LOAD_REQUEST, isLoading })
    ).toEqual({ ...initialState, isLoading })
  })
  it('should return new state with isloading true', () => {
    const isLoading = true
    expect(
      reducer(initialState, { type: types.SIMULATION_LOAD_REQUEST, isLoading })
    ).toEqual({ ...initialState, isLoading })
  })
  it('should return new state with payload and isloading false', () => {
    const payload = {
      items: 'item',
      end_date: '12-12-2019',
      start_date: '11-12-2019',
      slug_project: 'slug project'
    }
    const isLoading = false
    expect(
      reducer(initialState, { type: types.LOAD_SUCCESS, isLoading, payload })
    ).toEqual({
      ...initialState,
      isLoading,
      items: payload.items,
      end_date: payload.end_date,
      start_date: payload.start_date,
      slug_project: payload.slug_project
    })
  })
  it('should return new state with isloading false', () => {
    const isLoading = false
    expect(
      reducer(initialState, { type: types.LOAD_FAILURE, isLoading })
    ).toEqual({ ...initialState, isLoading })
  })
  it('should return new state with isloading false', () => {
    const isLoading = false
    expect(
      reducer(initialState, { type: types.INSTRUCTION_LOAD_FAILURE, isLoading })
    ).toEqual({ ...initialState, isLoading })
  })
  it('should return new state with isloading false', () => {
    const isLoading = false
    expect(
      reducer(initialState, { type: types.SIMULATION_LOAD_FAILURE, isLoading })
    ).toEqual({ ...initialState, isLoading })
  })
  it('should return new state with isloading false and payload', () => {
    const isLoading = false
    const payload = {
      instruction: 'instruction'
    }
    expect(
      reducer(initialState, {
        type: types.INSTRUCTION_LOAD_SUCCESS,
        isLoading,
        payload
      })
    ).toEqual({ ...initialState, isLoading, instruction: payload.instruction })
  })
  it('should return new state with isloading false and payload', () => {
    const isLoading = false
    const payload = {
      simulation: 'instruction'
    }
    expect(
      reducer(initialState, {
        type: types.SIMULATION_LOAD_SUCCESS,
        isLoading,
        payload
      })
    ).toEqual({ ...initialState, isLoading, simulation: payload.simulation })
  })
  it('should return new state with isSending true', () => {
    const isSending = true
    expect(
      reducer(initialState, { type: types.SAVE_RAW_INPUT_REQUEST, isSending })
    ).toEqual({ ...initialState, isSending })
  })
  it('should return new state with isSending false', () => {
    const isSending = false
    expect(
      reducer(initialState, { type: types.SAVE_RAW_INPUT_SUCCESS, isSending })
    ).toEqual({ ...initialState, isSending })
  })
  it('should return new state with isSending false', () => {
    const isSending = false
    expect(
      reducer(initialState, { type: types.SAVE_RAW_INPUT_FAILURE, isSending })
    ).toEqual({ ...initialState, isSending })
  })
  it('should return initialstate', () => {
    expect(reducer(initialState, { type: 'RESET' })).toEqual({
      ...initialState
    })
  })
})
