import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { CssBaseline, MuiThemeProvider } from '@material-ui/core'

import { HideSnackbar as HideSnackbarAction } from './state/modules/app'
import GuestLayout from './components/layout/GuestLayout'
import NotFound from './pages/404'
import Maintenance from './pages/maintenance'
import RootSnackbar from './components/snackbar'
import Theme from './utils/theme'

const App = (props) => {
  const { app, auth, firebaseAuth, HideSnackbar } = props
  return (
    <>
      <MuiThemeProvider theme={Theme}>
        <CssBaseline />
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              component={GuestLayout}
              auth={auth}
              firebaseAuth={firebaseAuth}
            />
            <Route
              path="/skills"
              component={GuestLayout}
              auth={auth}
              firebaseAuth={firebaseAuth}
            />
            <Route
              path="/career"
              component={GuestLayout}
              auth={auth}
              firebaseAuth={firebaseAuth}
            />
            <Route
              path="/marketplace"
              component={GuestLayout}
              auth={auth}
              firebaseAuth={firebaseAuth}
            />
            <Route
              path="/about"
              component={GuestLayout}
              auth={auth}
              firebaseAuth={firebaseAuth}
            />
            <Route
              path="/auth/:type"
              component={GuestLayout}
              auth={auth}
              firebaseAuth={firebaseAuth}
            />
            <Route
              path="/maintenance"
              component={Maintenance}
              auth={auth}
              firebaseAuth={firebaseAuth}
            />
            <Route
              path="/notfound"
              component={NotFound}
              auth={auth}
              firebaseAuth={firebaseAuth}
            />
            <Route
              component={NotFound}
              auth={auth}
              firebaseAuth={firebaseAuth}
            />
          </Switch>
        </Router>
        <RootSnackbar
          open={!!app.snackbarMessage}
          message={app.snackbarMessage}
          onClose={HideSnackbar}
        />
      </MuiThemeProvider>
    </>
  )
}

const mapStateToProps = ({ app, auth, firebase }) => ({
  app,
  auth,
  firebaseAuth: firebase.auth
})
const mapDispatcToProps = (dispatch) => ({
  HideSnackbar: () => dispatch(HideSnackbarAction())
})

export default connect(mapStateToProps, mapDispatcToProps)(App)
