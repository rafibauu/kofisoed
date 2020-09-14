import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { isLoaded } from 'react-redux-firebase'
import { CssBaseline, MuiThemeProvider } from '@material-ui/core/'

import { HideSnackbar as HideSnackbarAction } from './state/modules/app'
import { Logout as LogoutAction } from './state/modules/auth'
import CircularLoading from './components/loading/circular'
import TopBar from './components/layout/components/Topbar'
import GuestLayout from './components/layout/GuestLayout'
import NotFound from './pages/404'
import Maintenance from './pages/maintenance'
import RootSnackbar from './components/snackbar'
import Theme from './utils/theme'

const AuthPage = React.lazy(() => import('./pages/auth'))
const HomePage = React.lazy(() => import('./pages/home'))
// const SharingPage = React.lazy(() => import('./pages/sharing'))

const App = (props) => {
  const {
    app,
    auth,
    firebaseAuth,
    firebaseProfile,
    HideSnackbar,
    Logout
  } = props
  const AuthIsLoading = !isLoaded(firebaseAuth, firebaseProfile)

  return (
    <>
      <MuiThemeProvider theme={Theme}>
        <CssBaseline />
        <Router>
          {AuthIsLoading ? (
            <CircularLoading />
          ) : (
            <>
              <TopBar isLoggedIn={auth.isLoggedIn} Logout={Logout} />
              <main
                style={{
                  minHeight: 'calc(100vh - 64px)',
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: 64
                }}
              >
                <Switch>
                  <Suspense fallback={<CircularLoading />}>
                    <Route
                      exact
                      path="/"
                      component={HomePage}
                      auth={auth}
                      firebaseAuth={firebaseAuth}
                      firebaseProfile={firebaseProfile}
                    />
                    {/* <Route
                      path="/sharing"
                      component={SharingPage}
                      auth={auth}
                      firebaseAuth={firebaseAuth}
                      firebaseProfile={firebaseProfile}
                    /> */}
                    {/* <Route
                      path="/career"
                      component={GuestLayout}
                      auth={auth}
                      firebaseAuth={firebaseAuth}
                      firebaseProfile={firebaseProfile}
                    /> */}
                    {/* <Route
                      path="/marketplace"
                      component={GuestLayout}
                      auth={auth}
                      firebaseAuth={firebaseAuth}
                      firebaseProfile={firebaseProfile}
                    /> */}
                    <Route
                      path="/about"
                      component={GuestLayout}
                      auth={auth}
                      firebaseAuth={firebaseAuth}
                      firebaseProfile={firebaseProfile}
                    />
                    <Route
                      path="/auth/:type"
                      component={AuthPage}
                      auth={auth}
                      firebaseAuth={firebaseAuth}
                      firebaseProfile={firebaseProfile}
                    />
                    <Route
                      path="/maintenance"
                      component={Maintenance}
                      auth={auth}
                      firebaseAuth={firebaseAuth}
                      firebaseProfile={firebaseProfile}
                    />
                    <Route
                      path="/notfound"
                      component={NotFound}
                      auth={auth}
                      firebaseAuth={firebaseAuth}
                      firebaseProfile={firebaseProfile}
                    />
                    {/* <Route
                      component={NotFound}
                      auth={auth}
                      firebaseAuth={firebaseAuth}
                      firebaseProfile={firebaseProfile}
                    /> */}
                  </Suspense>
                </Switch>
              </main>
            </>
          )}
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
  firebaseAuth: firebase.auth,
  firebaseProfile: firebase.profile
})
const mapDispatcToProps = (dispatch) => ({
  HideSnackbar: () => dispatch(HideSnackbarAction()),
  Logout: () => dispatch(LogoutAction())
})

export default connect(mapStateToProps, mapDispatcToProps)(App)
