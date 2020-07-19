import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'

import RootStore from './state/store'
import { AutoLogin } from './state/modules/auth'
import * as serviceWorker from './serviceWorker'
import App from './App'
import Preload from './components/preload'
import ENV from './env'

document.title = `${ENV.APP_NAME} | ${ENV.CLIENT_NAME}`
ReactDOM.render(
  <Provider store={RootStore.configureStore}>
    <PersistGate
      loading={<Preload />}
      onBeforeLift={() => RootStore.configureStore.dispatch(AutoLogin())}
      persistor={RootStore.configurePersistor}
    >
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
