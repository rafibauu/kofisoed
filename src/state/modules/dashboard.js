export const DashboardActionTypes = {
  LOAD_ASSESSMENT_REQUEST: 'talentlytica/dashboard/LOAD_ASSESSMENT_REQUEST',
  LOAD_ASSESSMENT_SUCCESS: 'talentlytica/dashboard/LOAD_ASSESSMENT_SUCCESS',
  LOAD_ASSESSMENT_SUCCESS_EMPTY:
    'talentlytica/dashboard/LOAD_ASSESSMENT_SUCCESS_EMPTY',
  LOAD_ASSESSMENT_FAILED: 'talentlytica/dashboard/LOAD_ASSESSMENT_FAILED',
  INSTRUCTION_LOAD_REQUEST: 'talentlytica/dashboard/INSTRUCTION_LOAD_REQUEST',
  INSTRUCTION_LOAD_SUCCESS: 'talentlytica/dashboard/INSTRUCTION_LOAD_SUCCESS',
  INSTRUCTION_LOAD_FAILED: 'talentlytica/dashboard/INSTRUCTION_LOAD_FAILED',
  SIMULATION_LOAD_REQUEST: 'talentlytica/dashboard/SIMULATION_LOAD_REQUEST',
  SIMULATION_LOAD_SUCCESS: 'talentlytica/dashboard/SIMULATION_LOAD_SUCCESS',
  SIMULATION_LOAD_FAILED: 'talentlytica/dashboard/SIMULATION_LOAD_FAILED',
  SEND_RAW_INPUT_REQUEST: 'talentlytica/dashboard/SEND_RAW_INPUT_REQUEST',
  SEND_RAW_INPUT_SUCCESS: 'talentlytica/dashboard/SEND_RAW_INPUT_SUCCESS',
  SEND_RAW_INPUT_FAILED: 'talentlytica/dashboard/SEND_RAW_INPUT_FAILED'
}

export const LoadAssessment = () => ({
  type: DashboardActionTypes.LOAD_ASSESSMENT_REQUEST
})

export const SendRawInput = (data, callback) => ({
  type: DashboardActionTypes.SEND_RAW_INPUT_REQUEST,
  payload: { data, callback }
})

export const initialState = {
  isLoading: false,
  isSending: false,
  hasAssessment: false,
  corporate: null,
  project: null,
  error: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DashboardActionTypes.LOAD_ASSESSMENT_REQUEST:
      return { ...state, isLoading: true }
    case DashboardActionTypes.LOAD_ASSESSMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasAssessment: action.payload.hasAssessment,
        corporate: action.payload.corporate,
        project: action.payload.project
      }
    case DashboardActionTypes.LOAD_ASSESSMENT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      }
    case DashboardActionTypes.SEND_RAW_INPUT_REQUEST:
      return {
        ...state,
        isSending: true
      }
    case DashboardActionTypes.SEND_RAW_INPUT_SUCCESS:
      return {
        ...state,
        isSending: false
      }
    case DashboardActionTypes.SEND_RAW_INPUT_FAILURE:
      return {
        ...state,
        isSending: false
      }
    case DashboardActionTypes.LOAD_SUCCESS_EMPTY:
    case 'CHANGE_AUTH':
    case 'RESET':
      return initialState
    default:
      return state
  }
}
