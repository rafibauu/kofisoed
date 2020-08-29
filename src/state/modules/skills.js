export const SkillsActionTypes = {
  LOAD_SKILLS_REQUEST: 'kofisoed/skills/LOAD_SKILLS_REQUEST',
  LOAD_SKILLS_SUCCEED: 'kofisoed/skills/LOAD_SKILLS_SUCCEED',
  LOAD_SKILLS_FAILED: 'kofisoed/skills/LOAD_SKILLS_FAILED'
}

export const LoadSkills = (info) => ({
  type: SkillsActionTypes.LOAD_SKILLS_REQUEST,
  payload: { ...info }
})

export const initialState = {
  isLoading: false,
  isError: false,
  error: '',
  data: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SkillsActionTypes.LOAD_SKILLS_REQUEST:
      return { ...state, isLoading: true, error: '' }
    case SkillsActionTypes.LOAD_SKILLS_SUCCEED:
      return { ...state, isLoading: false, data: action.payload.data }
    case SkillsActionTypes.LOAD_SKILLS_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload.error
      }
    case 'RESET':
      return initialState
    default:
      return state
  }
}
