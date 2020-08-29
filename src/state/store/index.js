import { createStore, applyMiddleware, compose } from 'redux'
import { reactReduxFirebase } from 'react-redux-firebase'
import { persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
// import { logger } from 'redux-logger'

import RootSaga from '../sagas'
import ENV from '../../env'
import RootReducer from '../modules'

firebase.initializeApp(ENV.CONFIG_FIREBASE)

const configureSagaMiddleware = createSagaMiddleware()
const middlewares = [configureSagaMiddleware]
// if (process.env.NODE_ENV === `development`) {
//   middlewares.push(logger)
// }

// const configureStore = compose(
//   reactReduxFirebase(firebase, ENV.CONFIG_RRFIREBASE),
//   applyMiddleware(...middlewares)
// )(createStore)(RootReducer)

const configureStore = createStore(
  RootReducer,
  compose(
    reactReduxFirebase(firebase, ENV.CONFIG_RRFIREBASE),
    applyMiddleware(...middlewares)
  )
)

const configurePersistor = persistStore(configureStore)

configureSagaMiddleware.run(RootSaga)

export default {
  configureSagaMiddleware,
  configureStore,
  configurePersistor
}
