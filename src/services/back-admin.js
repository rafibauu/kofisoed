import axios from 'axios'
import ENV from '../env'

const configApi = {
  baseURL: ENV.APP_API_URL
}

const api = axios.create(configApi)
export function setting(authData) {
  api.defaults.headers.common.Authorization = `Bearer ${authData.jwt}`
  return true
}

export const upload = (url, name, files, config = {}) => {
  const data = new FormData()

  files.forEach((file, index) => {
    data.append(`${name}[${index}]`, file)
  })
  return api.post(url, data, config)
}

export const handleError = (error) => {
  let errorMessage = error.message
  if (error.response) {
    if (error.response.data[0]) {
      errorMessage = error.response.data[0].message
    }
    if (error.response.data.message) {
      errorMessage = error.response.data.message
    }

    if (error.response.data.error) {
      errorMessage = error.response.data.error
    }
  }
  return errorMessage
}

export default api
