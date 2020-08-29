import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'

import rootStore from './state/store'
import AppElement from './App'
import CircularLoading from './components/loading/circular'
import * as serviceWorker from './serviceWorker'
import { AutoLogin } from './state/modules/auth'
import ENV from './env'
import Security from './utils/security'

document.title = `${ENV.APP_NAME} | ${ENV.CLIENT_NAME}`
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
      <AppElement />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
