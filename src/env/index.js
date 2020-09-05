/* eslint-disable global-require */
export const CLIENT_NAME = 'Fisika Unsoed'
export const CLIENT_LOGO = require('./images/company-logo.png')
export const CLIENT_FAVICON = require('./images/company-favicon.png')

export const APP_VERSION = '3.11.0'
export const APP_NAME = 'Fission Platform'
export const APP_COLOR = {
  primary: '#e8505b',
  secondary: '#263238',
  backgroud: '#FFFFFF'
}
export const APP_API_URL = 'https://staging.talentlytic.com/api/'
export const APP_FUNCTIONS_URL =
  'https://us-central1-pegasus-ad8a3.cloudfunctions.net/api/v1/'
export const APP_SESSION_EXPIRED_TIME = 7200
export const CONFIG_FIREBASE = {
  apiKey: 'AIzaSyAhI0Ngmr7KaDB0bxvRiJs_6kxWDyW6JmA',
  authDomain: 'jufisoed-platform.firebaseapp.com',
  databaseURL: 'https://jufisoed-platform.firebaseio.com',
  projectId: 'jufisoed-platform',
  storageBucket: 'jufisoed-platform.appspot.com',
  messagingSenderId: '889861448361',
  appId: '1:889861448361:web:3c4e10be3275c7791f3fb8'
}
export const CONFIG_RRFIREBASE = {
  userProfile: 'users',
  attachAuthIsReady: true,
  enableLogging: false,
  updateProfileOnLogin: false,
  useFirestoreForProfile: true
}

export default {
  CLIENT_NAME,
  CLIENT_LOGO,
  CLIENT_FAVICON,
  APP_VERSION,
  APP_NAME,
  APP_COLOR,
  APP_API_URL,
  APP_FUNCTIONS_URL,
  APP_SESSION_EXPIRED_TIME,
  CONFIG_FIREBASE,
  CONFIG_RRFIREBASE
}
