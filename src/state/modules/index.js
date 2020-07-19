import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import { firebaseReducer } from 'react-redux-firebase'
import localForage from 'localforage'

import auth from './auth'
import app from './app'
import dashboard from './dashboard'

const config = {
  timeout: 10000,
  key: 'root',
  storage: localForage,
  blacklist: [
    'isLoading',
    'isCreating',
    'isUpdating',
    'isDeleting',
    'isSyncing',
    'isUploading',
    'snackbarMessage',
    'version',
    'downloadProgress'
  ]
}

const rootReducer = combineReducers({
  app: persistReducer({ ...config, key: 'app' }, app),
  auth: persistReducer({ ...config, key: 'auth' }, auth),
  dashboard,
  firebase: firebaseReducer
})

export default rootReducer