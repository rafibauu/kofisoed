import React, { PureComponent, Suspense } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withFirebase } from 'react-redux-firebase'
import PropTypes from 'prop-types'
import Img from 'react-image'
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core/'
import withStyles from '@material-ui/core/styles/withStyles'
import { ExitToApp } from '@material-ui/icons'
import styles from './styles'

import { Logout as LogoutAction } from '../../state/modules/auth'
import { LoadAssessment as LoadAssessmentAction } from '../../state/modules/dashboard'
import ErrorBoundary from '../error/boundary'
import CircularLoading from '../loading/circular'
import RouteList from '../../constants/route'
import AppLogoutConfirmation from '../confirmation'
import Text from '../../constants/general'
import ENV from '../../env'

const VerificationComponent = React.lazy(() =>
  import('../../pages/verfication')
)
const DashboardComponent = React.lazy(() => import('../../pages/dashboard'))
const InstructionComponent = React.lazy(() => import('../../pages/instruction'))
const AssessmentComponent = React.lazy(() => import('../../pages/assessment'))

class PrivateLayout extends PureComponent {
  state = {
    shouldOpenLogoutConfirmation: false
  }

  componentDidMount() {
    const { LoadAssessment } = this.props
    LoadAssessment('load')
  }

  handleOpenConfirmation = () => {
    this.setState({ shouldOpenLogoutConfirmation: true })
  }

  handleConfirmationNo = () => {
    this.setState({ shouldOpenLogoutConfirmation: false })
  }

  handleConfirmationYes = () => {
    const { Logout } = this.props
    Logout()
  }

  render() {
    const { classes, app, auth, firebaseAuth } = this.props
    const { shouldOpenLogoutConfirmation } = this.state
    const { logoutConfirmation } = Text.sentences

    if (app.isLoading || !firebaseAuth.isLoaded) {
      return <CircularLoading state="component" />
    }

    const { dashboard } = this.props
    const { project } = dashboard

    return (
      <>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar variant="regular" className={classes.toolbar}>
            <Link to="/" className={classes.brand}>
              <Img src={ENV.CLIENT_LOGO} className={classes.topBarImageLogo} />
            </Link>
            <div className={classes.toolbarOption}>
              <Typography color="primary" className={classes.toolbarUsername}>
                {auth.user.email}
              </Typography>
              <IconButton
                onClick={this.handleOpenConfirmation}
                className={classes.signOutIcon}
              >
                <ExitToApp color="primary" />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <main className={classes.main}>
          {!project.id ? (
            <CircularLoading state="component" />
          ) : (
            <ErrorBoundary>
              <Suspense fallback={<CircularLoading state="component" />}>
                <Switch>
                  <Route
                    exact
                    path={RouteList.verification}
                    render={(props) => (
                      <VerificationComponent
                        {...props}
                        appAuth={auth}
                        firebaseAuth={firebaseAuth}
                      />
                    )}
                  />
                  <Route
                    path={RouteList.dashboard}
                    render={(props) => (
                      <DashboardComponent
                        {...props}
                        appAuth={auth}
                        firebaseAuth={firebaseAuth}
                      />
                    )}
                  />
                  <Route
                    path={RouteList.instruction}
                    render={(props) => (
                      <InstructionComponent
                        {...props}
                        appAuth={auth}
                        firebaseAuth={firebaseAuth}
                      />
                    )}
                  />
                  <Route
                    path={RouteList.assessment}
                    render={(props) => (
                      <AssessmentComponent
                        {...props}
                        appAuth={auth}
                        firebaseAuth={firebaseAuth}
                      />
                    )}
                  />
                </Switch>
              </Suspense>
            </ErrorBoundary>
          )}
        </main>
        <AppLogoutConfirmation
          open={shouldOpenLogoutConfirmation}
          title={logoutConfirmation.title}
          message={logoutConfirmation.message}
          handleRequestClose={this.handleConfirmClose}
          handleConfirmationNo={this.handleConfirmationNo}
          handleConfirmationYes={this.handleConfirmationYes}
        />
      </>
    )
  }
}

PrivateLayout.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  LoadAssessment: PropTypes.func.isRequired,
  Logout: PropTypes.func.isRequired,
  app: PropTypes.object,
  auth: PropTypes.object,
  dashboard: PropTypes.object,
  firebaseAuth: PropTypes.object
}

const mapStateToProps = ({ app, auth, dashboard, firebase }) => ({
  app,
  auth,
  dashboard,
  firebaseAuth: firebase.auth
})

const mapDispatchToProps = (dispatch) => ({
  Logout: () => dispatch(LogoutAction()),
  LoadAssessment: () => dispatch(LoadAssessmentAction())
})

const enhance = compose(
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)

export default enhance(PrivateLayout)
