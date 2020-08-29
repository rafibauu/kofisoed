import axios from 'axios'
import ENV from '../env'

const functions = axios.create({ baseURL: ENV.APP_FUNCTIONS_URL })

export default functions
