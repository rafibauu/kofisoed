export const AppActionTypes = {
  SHOW_SNACKBAR: 'talentlytica/app/SHOW_SNACKBAR',
  HIDE_SNACKBAR: 'talentlytica/app/HIDE_SNACKBAR',
  PUSH_USER_LOG: 'talentlytica/app/PUSH_USER_LOG',
  SET_USER_DEVICE_REQUEST: 'talentlytica/app/SET_USER_DEVICE_REQUEST',
  SET_USER_DEVICE_SUCCESS: 'talentlytica/app/SET_USER_DEVICE_SUCCESS',
  SET_USER_DEVICE_FAILED: 'talentlytica/app/SET_USER_DEVICE_FAILED',
  SET_USER_DEVICE_CHANGE_IP_ADDRESS:
    'talentlytica/app/SET_USER_DEVICE_CHANGE_IP_ADDRESS',
  SET_USER_DEVICE_FINISHED: 'talentlytica/app/SET_USER_DEVICE_FINISHED'
}

export const ShowSnackbar = (message, shouldRedirectToHome = false) => ({
  type: AppActionTypes.SHOW_SNACKBAR,
  payload: {
    snackbarMessage: message,
    shouldRedirectToHome
  }
})

export const HideSnackbar = () => ({
  type: AppActionTypes.HIDE_SNACKBAR
})

export const SetUserDevice = () => ({
  type: AppActionTypes.SET_USER_DEVICE_REQUEST
})

export const CallLogActivity = (data) => ({
  type: AppActionTypes.PUSH_USER_LOG,
  payload: data
})

export const Reset = () => ({
  type: 'RESET'
})

export const AppInitialState = {
  snackbarMessage: null,
  isLoading: false,
  shouldRedirectToHome: false,
  device: {},
  clientUniqueId: ''
}

export default (state = AppInitialState, action) => {
  switch (action.type) {
    case AppActionTypes.SHOW_SNACKBAR: {
      const { snackbarMessage, shouldRedirectToHome } = action.payload
      return {
        ...state,
        snackbarMessage,
        shouldRedirectToHome:
          shouldRedirectToHome || AppInitialState.shouldRedirectToHome
      }
    }
    case AppActionTypes.HIDE_SNACKBAR:
      return { ...state, snackbarMessage: null, shouldRedirectToHome: false }
    case AppActionTypes.SET_USER_DEVICE_REQUEST:
      return { ...state, isLoading: true }
    case AppActionTypes.SET_USER_DEVICE_SUCCESS:
      return {
        ...state,
        device: action.payload.device,
        clientUniqueId: action.payload.clientUniqueId
      }
    case AppActionTypes.SET_USER_DEVICE_FINISHED:
      return {
        ...state,
        isLoading: false,
        device: action.payload.device
      }
    case 'CHANGE_AUTH':
    case 'RESET':
      return {
        ...AppInitialState,
        device: state.device,
        clientUniqueId: state.clientUniqueId
      }
    default:
      return state
  }
}
