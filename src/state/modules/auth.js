export const AuthActionTypes = {
  AUTO_LOGIN_REQUEST: 'talentlytica/auth/AUTO_LOGIN_REQUEST',
  AUTO_LOGIN_FINISH: 'talentlytica/auth/AUTO_LOGIN_FINISH',
  REGISTRATION_REQUEST: 'talentlytica/auth/REGISTRATION_REQUEST',
  REGISTRATION_SUCCESS: 'talentlytica/auth/REGISTRATION_SUCCESS',
  REGISTRATION_FAILED: 'talentlytica/auth/REGISTRATION_FAILED',
  LOGIN_REQUEST: 'talentlytica/auth/LOGIN_REQUEST',
  LOGIN_SET_INFO: 'talentlytica/auth/LOGIN_SET_INFO',
  LOGIN_SUCCESS: 'talentlytica/auth/LOGIN_SUCCESS',
  LOGIN_FAILED: 'talentlytica/auth/LOGIN_FAILED',
  LOGIN_TOKEN_REQUEST: 'talentlytica/auth/LOGIN_TOKEN_REQUEST',
  LOGIN_TOKEN_SUCCESS: 'talentlytica/auth/LOGIN_TOKEN_SUCCESS',
  LOGIN_TOKEN_FAILED: 'talentlytica/auth/LOGIN_TOKEN_FAILED',
  LOGOUT_CACHE_REQUEST: 'talentlytica/auth/LOGOUT_CACHE_REQUEST',
  LOGOUT_CACHE_SUCCESS: 'talentlytica/auth/LOGOUT_CACHE_SUCCESS',
  LOGOUT_EXPIRED_REQUEST: 'talentlytica/auth/LOGOUT_EXPIRED_REQUEST',
  LOGOUT_EXPIRED_SUCCESS: 'talentlytica/auth/LOGOUT_EXPIRED_SUCCESS',
  LOGOUT_REQUEST: 'talentlytica/auth/LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'talentlytica/auth/LOGOUT_SUCCESS',
  LOGOUT_FAILED: 'talentlytica/auth/LOGOUT_FAILED'
}

export const Register = (credential) => ({
  type: AuthActionTypes.REGISTRATION_REQUEST,
  payload: { ...credential }
})

export const AutoLogin = () => ({
  type: AuthActionTypes.AUTO_LOGIN_REQUEST
})

export const Login = (credential) => ({
  type: AuthActionTypes.LOGIN_REQUEST,
  payload: { ...credential }
})

export const LoginByToken = (token, callback) => ({
  type: AuthActionTypes.LOGIN_TOKEN_REQUEST,
  payload: { token, callback }
})

export const Logout = () => ({
  type: AuthActionTypes.LOGOUT_REQUEST
})

export const LogoutByAuthExpired = () => ({
  type: AuthActionTypes.LOGOUT_EXPIRED_REQUEST
})

export const initialState = {
  isLoading: false,
  isLoggedIn: false,
  redirectAfterLogout: false,
  error: [],
  user: {},
  expiredMilis: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.REGISTRATION_REQUEST:
    case AuthActionTypes.LOGIN_REQUEST:
    case AuthActionTypes.LOGIN_TOKEN_REQUEST:
      return { ...state, isLoading: true, error: [] }
    case AuthActionTypes.LOGIN_SET_INFO: {
      return {
        ...state,
        ...action.payload
      }
    }
    case AuthActionTypes.LOGIN_SUCCESS:
    case AuthActionTypes.LOGIN_TOKEN_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false
      }
    }
    case AuthActionTypes.LOGIN_FAILED:
    case AuthActionTypes.LOGIN_TOKEN_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        isLoading: false,
        error: action.payload.error
      }
    case AuthActionTypes.LOGOUT_CACHE_REQUEST:
    case AuthActionTypes.LOGOUT_REQUEST:
      return { ...state, isLoading: true }
    case AuthActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        user: {},
        isLoggedIn: false,
        expiredMilis: 0,
        redirectAfterLogout: true
      }
    case AuthActionTypes.LOGOUT_FAILED:
      return { ...state, isLoading: false }
    case 'CHANGE_AUTH':
      return { ...initialState, isLoading: true }
    case 'RESET':
      return initialState
    default:
      return state
  }
}
