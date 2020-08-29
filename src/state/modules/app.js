export const types = {
  SHOW_SNACKBAR: 'talentlytica/app/SHOW_SNACKBAR',
  HIDE_SNACKBAR: 'talentlytica/app/HIDE_SNACKBAR',
  SEND_LOG_ACTIVITY: 'talentlytica/app/SEND_LOG_ACTIVITY',
  SET_USER_DEVICE_REQUEST: 'talentlytica/app/SET_USER_DEVICE_REQUEST',
  SET_USER_DEVICE_SUCCESS: 'talentlytica/app/SET_USER_DEVICE_SUCCESS',
  SET_USER_DEVICE_FAILED: 'talentlytica/app/SET_USER_DEVICE_FAILED',
  SET_USER_DEVICE_CHANGE_IP_ADDRESS:
    'talentlytica/app/SET_USER_DEVICE_CHANGE_IP_ADDRESS',
  SET_USER_DEVICE_FINISHED: 'talentlytica/app/SET_USER_DEVICE_FINISHED'
}

export const SetUserDevice = () => ({
  type: types.SET_USER_DEVICE_REQUEST
})

export const ShowSnackbar = (payload) => ({
  type: types.SHOW_SNACKBAR,
  payload
})

export const HideSnackbar = (payload) => ({
  type: types.HIDE_SNACKBAR,
  payload
})

export const SendLogActivity = (data) => ({
  type: types.SEND_LOG_ACTIVITY,
  payload: data
})

export const initialState = {
  snackbarMessage: null,
  isLoading: false,
  isSyncing: false,
  shouldRedirectToHome: false,
  device: {},
  clientUniqueId: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_SNACKBAR:
      return {
        ...state,
        snackbarMessage: action.payload.message,
        shouldRedirectToHome: action.payload.shouldRedirectToHome || false
      }
    case types.HIDE_SNACKBAR:
      return { ...state, snackbarMessage: null, shouldRedirectToHome: false }
    case types.SET_USER_DEVICE_REQUEST:
      return { ...state, isLoading: true }
    case types.SET_USER_DEVICE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        device: action.payload.device,
        clientUniqueId: action.payload.clientUniqueId
      }
    case types.SET_USER_DEVICE_FINISHED:
      return {
        ...state,
        isLoading: false,
        device: action.payload.device
      }
    case 'CHANGE_AUTH':
    case 'RESET':
      return {
        ...initialState,
        clientUniqueId: state.clientUniqueId
      }
    default:
      return state
  }
}
