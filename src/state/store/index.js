import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import { createFirebaseInstance } from 'react-redux-firebase'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
// import { logger } from 'redux-logger'

import RootSaga from '../sagas'
import { CONFIG_FIREBASE, CONFIG_RRFIREBASE } from '../../env'
import RootReducer from '../modules'

firebase.initializeApp(CONFIG_FIREBASE)
firebase.database()

createFirebaseInstance(firebase, CONFIG_RRFIREBASE)

const configureSagaMiddleware = createSagaMiddleware()
const middlewares = [configureSagaMiddleware]
// if (process.env.NODE_ENV === `development`) {
//   middlewares.push(logger)
// }

const configureStore = createStore(
  RootReducer,
  compose(applyMiddleware(...middlewares))
)

const configurePersistor = persistStore(configureStore)
configureSagaMiddleware.run(RootSaga)

const configureFirebase = {
  firebase,
  config: CONFIG_RRFIREBASE,
  dispatch: configureStore.dispatch
}

export default {
  configureSagaMiddleware,
  configureStore,
  configurePersistor,
  configureFirebase
}
