import reducer, { types, actions, initialState } from '../app'

describe('actions', () => {
  it('load data', () => {
    const expectedAction = {
      type: types.LOAD_DATA
    }
    expect(actions.loadData()).toEqual(expectedAction)
  })
  it('reset data', () => {
    const expectedAction = {
      type: 'RESET'
    }
    expect(actions.resetData()).toEqual(expectedAction)
  })
  it('show snackbar', () => {
    const snackbarMessage = 'this is a sample'
    const expectedAction = {
      type: types.SHOW_SNACKBAR,
      snackbarMessage
    }
    expect(actions.showSnackbar(snackbarMessage)).toEqual(expectedAction)
  })
  it('hide snackbar', () => {
    const expectedAction = {
      type: types.HIDE_SNACKBAR
    }
    expect(actions.hideSnackbar()).toEqual(expectedAction)
  })
})
describe('reducer', () => {
  it('should return initial state', () => {
    expect(reducer(initialState, { type: undefined })).toEqual(initialState)
  })
  it('should return new state with snackbar message', () => {
    const snackbarMessage = 'this is snackbar'
    expect(
      reducer(initialState, { type: types.SHOW_SNACKBAR, snackbarMessage })
    ).toEqual({ ...initialState, snackbarMessage })
  })
  it('should return new state with snackbar message null', () => {
    const snackbarMessage = null
    expect(
      reducer(initialState, { type: types.HIDE_SNACKBAR, snackbarMessage })
    ).toEqual({ ...initialState, snackbarMessage })
  })
  it('should return new state with is loading true', () => {
    const isLoading = true
    expect(
      reducer(initialState, { type: types.LOAD_DATA, isLoading })
    ).toEqual({ ...initialState, isLoading })
  })
  it('should return new state with is loading false', () => {
    const isLoading = false
    expect(
      reducer(initialState, { type: types.LOAD_DATA_FINISH, isLoading })
    ).toEqual({ ...initialState, isLoading })
  })
  it('should return initialstate type reset', () => {
    expect(reducer(initialState, { type: 'RESET' })).toEqual({
      ...initialState
    })
  })
})
