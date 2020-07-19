import reducer, { types, actions, initialState } from '../auth'

describe('actions', () => {
  it('login', () => {
    const email = 'farid@email.com'
    const password = '12345'
    const expectedAction = {
      type: types.LOGIN_REQUEST,
      payload: { email, password }
    }
    expect(actions.login(email, password)).toEqual(expectedAction)
  })
  it('login by token', () => {
    const token = 123456
    const expectedAction = {
      type: types.LOGIN_BY_TOKEN_REQUEST,
      payload: { token }
    }
    expect(actions.loginByToken(token)).toEqual(expectedAction)
  })
  it('auto login', () => {
    const expectedAction = {
      type: types.AUTO_LOGIN
    }
    expect(actions.autoLogin()).toEqual(expectedAction)
  })
  it('logout', () => {
    const expectedAction = {
      type: types.LOGOUT_REQUEST
    }
    expect(actions.logout()).toEqual(expectedAction)
  })
})
describe('reducer', () => {
  it('should return initial state', () => {
    expect(reducer(initialState, { type: undefined })).toEqual(initialState)
  })
  it('should return new state with isloading true and error', () => {
    const isLoading = true
    const error = []
    expect(
      reducer(initialState, {
        type: types.LOGIN_REQUEST,
        isLoading,
        error
      })
    ).toEqual({ ...initialState, isLoading, error })
  })
  it('should return new state with isloading true and error', () => {
    const isLoading = true
    const error = []
    expect(
      reducer(initialState, {
        type: types.LOGIN_BY_TOKEN_REQUEST,
        isLoading,
        error
      })
    ).toEqual({ ...initialState, isLoading, error })
  })
  it('should return new state with isLoggedIn true, isLoading false,user,jwt,tokenFierbase', () => {
    const isLoading = false
    const isLoggedIn = true
    const payload = {
      user: 'test',
      jwt: '12345',
      tokenFirebase: '12345'
    }
    expect(
      reducer(initialState, {
        type: types.LOGIN_SUCCESS,
        isLoggedIn,
        isLoading,
        payload
      })
    ).toEqual({
      ...initialState,
      isLoggedIn,
      isLoading,
      user: payload.user,
      jwt: payload.jwt,
      tokenFirebase: payload.tokenFirebase
    })
  })
  it('should return new state with isLoggedIn false, isLoading false,and error from payload', () => {
    const isLoading = false
    const isLoggedIn = false
    const payload = { error: 'error message' }
    expect(
      reducer(initialState, {
        type: types.LOGIN_FAILURE,
        isLoggedIn,
        isLoading,
        payload
      })
    ).toEqual({ ...initialState, isLoggedIn, isLoading, error: payload.error })
  })
  it('should return new state with isLoading true', () => {
    const isLoading = true
    expect(
      reducer(initialState, { type: types.LOGOUT_REQUEST, isLoading })
    ).toEqual({ ...initialState, isLoading })
  })
  it('should return new state with user blank object,jwt blank string, tokenFirebase blank string, isLoggeddIn false, isLoading false', () => {
    const user = {}
    const jwt = ''
    const tokenFirebase = ''
    const isLoggedIn = false
    const isLoading = false
    expect(
      reducer(initialState, {
        type: types.LOGOUT_SUCCESS,
        user,
        jwt,
        tokenFirebase,
        isLoggedIn,
        isLoading
      })
    ).toEqual({
      ...initialState,
      user,
      jwt,
      tokenFirebase,
      isLoggedIn,
      isLoading
    })
  })
  it('should return new state with isLoading false', () => {
    const isLoading = false
    expect(
      reducer(initialState, { type: types.LOGOUT_FAILURE, isLoading })
    ).toEqual({ ...initialState, isLoading })
  })
  it('should return new state with payload and isLoading false', () => {
    const isLoading = false
    const payload = { user: 'user' }
    expect(
      reducer(initialState, { type: types.USER_LOGGED_IN, payload, isLoading })
    ).toEqual({ ...initialState, user: payload, isLoading })
  })
  it('should return new state with user object', () => {
    const payload = { user: {}, payload: 'user' }
    expect(
      reducer(initialState, { type: types.UPDATE_AUTH_USER, payload })
    ).toEqual({ ...initialState, user: payload.user })
  })
  it('should return initialstate', () => {
    expect(reducer(initialState, { type: 'RESET' })).toEqual({
      ...initialState
    })
  })
})
