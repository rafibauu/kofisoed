import { call, takeEvery, put } from 'redux-saga/effects'
import firebase from 'firebase'
import { handleRegisterRequest } from '../auth'
import api from '../../../services/firebase'
import { AuthActionTypes } from '../../modules/auth'

describe('saga - auth.js', () => {
  // it('should handle login request', () => {
  //   const gen = loginRequest()
  //   const expected = takeEvery(types.LOGIN_REQUEST, processLogin, 'normal')
  //   expect(gen.next().value).toEqual(expected)
  //   expect(gen.next().done).toEqual(true)
  // })

  it('Handle register request', () => {
    const payload = {
      email: 'rafi@email.com',
      password: '12345678',
      nim: 'H1E013037',
      name: 'Rafi Bagas'
    }

    const gen = handleRegisterRequest({ payload })
    gen.next()
    const testResult = gen.next().value
    expect(testResult.name).toEqual(payload.name)
  })

  // it('process token login', () => {
  //   const payload = {
  //     token: 'thisislogintoken'
  //   }
  //   const gen = processLogin('token', {
  //     payload
  //   })

  //   const expectedCallLoginForm = call(
  //     api.get,
  //     `login-link?token=${payload.token}`
  //   )
  //   expect(gen.next().value).toEqual(expectedCallLoginForm)

  //   const data = {
  //     'token-laravel': 'TokenLaravelJWT',
  //     'token-firebase': 'TokenFirebase',
  //     profiles: {
  //       userId: 3
  //     }
  //   }
  //   const expectedResponse = {
  //     data: {
  //       return: data
  //     }
  //   }
  //   const expectedDispatchLoginSuccess = put({
  //     type: types.LOGIN_SUCCESS,
  //     payload: {
  //       jwt: data['token-laravel'],
  //       tokenFirebase: data['token-firebase'],
  //       user: data.profiles
  //     }
  //   })

  //   expect(gen.next(expectedResponse).value).toEqual(
  //     expectedDispatchLoginSuccess
  //   )
  //   expect(gen.next().done).toEqual(true)
  // })

  // it('log out request', () => {
  //   const gen = logoutRequest()
  //   const expectedLogoutRequest = takeEvery(types.LOGOUT_REQUEST, processLogout)
  //   expect(gen.next().value).toEqual(expectedLogoutRequest)
  //   expect(gen.next().done).toEqual(true)
  // })

  // it('process log out', () => {
  //   const gen = processLogout()
  //   // const dataLog = {
  //   //     type: 'activity',
  //   //     // date: Date.now(),
  //   //     duration: '',
  //   //     test_id: "",
  //   //     log: 'berhasil log out',
  //   //     browser_platform: '',
  //   //     ip: ""
  //   // };
  //   // const expectedCallLogout = call(logActivity, "direct", dataLog);
  //   // expect(gen.next().value).toEqual(expectedCallLogout);
  //   gen.next()
  //   const expectedPutLogout = put({ type: types.LOGOUT_SUCCESS })
  //   expect(gen.next().value).toEqual(expectedPutLogout)
  //   expect(gen.next().done).toEqual(true)
  // })

  // it('log out success', () => {
  //   const gen = logoutSuccess()
  //   const expectedLogoutSuccess = takeEvery(
  //     types.LOGOUT_SUCCESS,
  //     processLogoutSuccess
  //   )

  //   expect(gen.next().value).toEqual(expectedLogoutSuccess)
  // })

  // it('process logout success', () => {
  //   // firebase.initializeApp(config.firebaseConfig);
  //   // const gen = processLogoutSuccess();
  //   // const mockLogout = jest.fn();
  //   // const expectedCall = call(mockLogout)
  //   // expect(gen.next({ logout: mockLogout }).value).toEqual(expectedCall)
  // })

  // it('log in success', () => {
  //   // const gen = loginSuccess();
  // })
})
