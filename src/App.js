import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Theme from './utils/theme'

import { HideSnackbar } from './state/modules/app'
import AppSnackbar from './components/snackbar'
import RouteList from './constants/route'
import Login from './pages/login'
import LoginToken from './pages/login/login-token'
import PrivateLayout from './components/layout/UserLayout'
import PrivateRouting from './components/layout/UserRoute'
import NotFoundLayout from './pages/error/404'

const App = (props) => {
  const { auth, app, hideSnackbarProps } = props
  return (
    <>
      <MuiThemeProvider theme={Theme}>
        <CssBaseline />
        <div className="App">
          <Router>
            <Switch>
              <PrivateRouting
                exact
                path={RouteList.verification}
                component={PrivateLayout}
                auth={auth}
              />
              <PrivateRouting
                path={RouteList.dashboard}
                component={PrivateLayout}
                auth={auth}
              />
              <PrivateRouting
                path={RouteList.instruction}
                component={PrivateLayout}
                auth={auth}
              />
              <PrivateRouting
                path={RouteList.assessment}
                component={PrivateLayout}
                auth={auth}
              />
              <Route path={RouteList.loginToken} component={LoginToken} />
              <Route path={RouteList.login} component={Login} />
              <Route path={RouteList.notFound} component={NotFoundLayout} />
              <Route component={NotFoundLayout} />
            </Switch>
          </Router>
          <AppSnackbar
            open={!!app.snackbarMessage}
            message={app.snackbarMessage}
            hideSnackbar={hideSnackbarProps}
          />
        </div>
      </MuiThemeProvider>
    </>
  )
}

App.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
  app: PropTypes.instanceOf(Object).isRequired,
  hideSnackbarProps: PropTypes.func.isRequired
}

const mapStateToProps = ({ auth, app }) => ({ auth, app })

const mapDispatchToProps = (dispatch) => ({
  hideSnackbarProps: () => dispatch(HideSnackbar())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
