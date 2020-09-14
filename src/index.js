import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { PersistGate } from 'redux-persist/es/integration/react'

import rootStore from './state/store'
import AppElement from './App'
import CircularLoading from './components/loading/circular'
import * as serviceWorker from './serviceWorker'
import { AutoLogin } from './state/modules/auth'
import { APP_NAME, CLIENT_NAME } from './env'
import Security from './utils/security'

document.title = `${APP_NAME} | ${CLIENT_NAME}`
Security.preventPrintScreenKey()

ReactDOM.render(
  <Provider store={rootStore.configureStore}>
    <PersistGate
      loading={<CircularLoading />}
      onBeforeLift={() => {
        rootStore.configureStore.dispatch(AutoLogin())
      }}
      persistor={rootStore.configurePersistor}
    >
      <ReactReduxFirebaseProvider {...rootStore.configureFirebase}>
        <AppElement />
      </ReactReduxFirebaseProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
