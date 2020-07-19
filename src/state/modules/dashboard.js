export const DashboardActiontypes = {
  LOAD_ASSESSMENT_REQUEST: 'talentlytica/dashboard/LOAD_ASSESSMENT_REQUEST',
  LOAD_ASSESSMENT_SUCCESS: 'talentlytica/dashboard/LOAD_ASSESSMENT_SUCCESS',
  LOAD_ASSESSMENT_EMPTY: 'talentlytica/dashboard/LOAD_ASSESSMENT_EMPTY',
  LOAD_ASSESSMENT_FAILED: 'talentlytica/dashboard/LOAD_ASSESSMENT_FAILED',
  SEND_ASSESSMENT_REQUEST: 'talentlytica/dashboard/SEND_ASSESSMENT_REQUEST',
  SEND_ASSESSMENT_SUCCESS: 'talentlytica/dashboard/SEND_ASSESSMENT_SUCCESS',
  SEND_ASSESSMENT_FAILED: 'talentlytica/dashboard/SEND_ASSESSMENT_FAILED'
}

export const LoadAssessment = (mode = 'load') => ({
  type: DashboardActiontypes.LOAD_ASSESSMENT_REQUEST,
  payload: { mode }
})

export const SendAssessment = (data, callback) => ({
  type: DashboardActiontypes.SEND_ASSESSMENT_REQUEST,
  payload: { data, callback }
})

export const DashboardInitialState = {
  isLoading: false,
  isSending: false,
  corporate: '',
  project: {},
  username: '',
  usersMapping: {},
  status: 0,
  error: ''
}

export default (state = DashboardInitialState, action) => {
  switch (action.type) {
    case DashboardActiontypes.LOAD_ASSESSMENT_REQUEST:
      return { ...state, isLoading: true }
    case DashboardActiontypes.LOAD_ASSESSMENT_SUCCESS: {
      const { project, username, usersMapping, status } = action.payload
      return {
        ...state,
        isLoading: false,
        project,
        username,
        usersMapping,
        status
      }
    }
    case DashboardActiontypes.LOAD_ASSESSMENT_EMPTY:
    case DashboardActiontypes.LOAD_ASSESSMENT_FAILED:
      return {
        ...DashboardInitialState,
        error: action.payload.error
      }
    case DashboardActiontypes.SEND_ASSESSMENT_REQUEST:
      return {
        ...state,
        isSending: true
      }
    case DashboardActiontypes.SEND_ASSESSMENT_SUCCESS:
      return {
        ...state,
        isSending: false
      }
    case DashboardActiontypes.SEND_ASSESSMENT_FAILED:
      return {
        ...state,
        isSending: false,
        error: action.payload.error
      }
    case 'CHANGE_AUTH':
    case 'RESET':
      return DashboardInitialState
    default:
      return state
  }
}
