const CLIENT_NAME = 'Fisika Unsoed'
const CLIENT_LOGO = require('./images/company-logo.png')
const CLIENT_FAVICON = require('./images/company-favicon.png')

const APP_VERSION = '3.11.0'
const APP_NAME = 'Fission Platform'
const APP_COLOR = {
  primary: '#000000',
  secondary: '#222222',
  backgroud: '#FFFFFF'
}
const APP_API_URL = 'https://staging.talentlytic.com/api/'
const APP_FUNCTIONS_URL =
  'https://us-central1-pegasus-ad8a3.cloudfunctions.net/api/v1/'
const APP_SESSION_EXPIRED_TIME = 7200
const CONFIG_FIREBASE = {
  apiKey: 'AIzaSyAhI0Ngmr7KaDB0bxvRiJs_6kxWDyW6JmA',
  authDomain: 'jufisoed-platform.firebaseapp.com',
  databaseURL: 'https://jufisoed-platform.firebaseio.com',
  projectId: 'jufisoed-platform',
  storageBucket: 'jufisoed-platform.appspot.com',
  messagingSenderId: '889861448361',
  appId: '1:889861448361:web:3c4e10be3275c7791f3fb8'
}
const CONFIG_RRFIREBASE = {
  userProfile: 'users',
  attachAuthIsReady: true,
  enableLogging: false,
  updateProfileOnLogin: false
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
