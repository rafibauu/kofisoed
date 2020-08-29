import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withFirebase } from 'react-redux-firebase'
import { AppBar, Container, IconButton, Toolbar } from '@material-ui/core'
import ExitToApp from '@material-ui/icons/ExitToApp'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles/index'

import ENV from '../../env'
import { SendLogActivity as SendLogActivityAction } from '../../state/modules/app'
import { Logout as LogoutAction } from '../../state/modules/auth'
import { LoadAssessment as LoadAssessmentAction } from '../../state/modules/dashboard'
import Camera from '../Camera'
import CircularLoading from '../loading/circular'
import LogoutConfirmation from '../confirmation'
import LazyComponentErrorBoundary from '../error/boundary'

const Verification = React.lazy(() => import('../../pages/'))
const Dashboard = React.lazy(() => import('../../pages/dashboard'))
const Instruction = React.lazy(() => import('../../pages/instruction'))
const Simulation = React.lazy(() => import('../../pages/simulation'))
const Assessment = React.lazy(() => import('../../pages/assessment'))

const noImageUrl =
  'https://firebasestorage.googleapis.com/v0/b/firetica-talentlytica.appspot.com/o/no-image.jpg?alt=media&token=1a229686-cbd2-4a3b-b8c8-731a362acdef'

class Layout extends React.PureComponent {
  state = {
    isConfirmOpen: false,
    confirmMessage: ''
  }

  componentDidMount() {
    const { dashboard, LoadAssessment } = this.props
    if (!dashboard.corporate) {
      LoadAssessment()
    }
    this.startIntervalCamera()
  }

  componentWillUnmount() {
    if (this.intervalCamera) {
      clearInterval(this.intervalCamera)
    }
  }

  startIntervalCamera = () => {
    if (!this.intervalCamera) {
      this.intervalCamera = setInterval(
        this.handleTakePhotoSilently,
        900000,
        this.webcam
      )
    }
  }

  setWebcamRef = (webcam) => {
    this.webcam = webcam
  }

  handleTakePhotoSilently = async (event) => {
    const { firebase, auth, SendLogActivity } = this.props
    const { uuid } = auth.user
    const screenshot = this.webcam.current.getScreenshot()
    const now = Date.now()
    const eventScreenshot = event || `random-${now}`
    if (screenshot && uuid !== 0) {
      const { storage } = firebase
      const photoRef = storage().ref(`images/snap-interval/${uuid}/${now}.jpg`)
      try {
        const photoSnap = await photoRef.putString(screenshot, 'data_url')
        const photoUrl = await photoSnap.ref.getDownloadURL()
        firebase.push(`session/${uuid}/intervalPhotos`, {
          status: 'captured',
          photoUrl,
          event: eventScreenshot,
          contentType: photoSnap.metadata.contentType,
          bucket: photoSnap.metadata.bucket,
          fullPath: photoSnap.metadata.fullPath,
          createdAt: now,
          log: 'Berhasil mengambil dan mengupload foto interval'
        })
        SendLogActivity({
          mode: 'undirect',
          data: {
            type: 'activity',
            date: now,
            log: `berhasil mengambil dan mengupload foto interval ${eventScreenshot}`
          }
        })
      } catch (e) {
        firebase.push(`session/${uuid}/intervalPhotos`, {
          status: 'error',
          event: eventScreenshot,
          createdAt: now,
          photoUrl: noImageUrl,
          log: `Gagal dalam mengupload foto interval : ${e}`
        })
        SendLogActivity({
          mode: 'undirect',
          data: {
            type: 'error',
            date: now,
            log: `gagal mengupload foto interval ${eventScreenshot}`
          }
        })
      }
    } else {
      firebase.push(`session/${uuid}/intervalPhotos`, {
        status: 'not-captured',
        event: eventScreenshot,
        createdAt: now,
        photoUrl: noImageUrl,
        log: 'Gagal mengambil foto : Driver or permission problem'
      })
      SendLogActivity({
        mode: 'undirect',
        data: {
          type: 'error',
          date: now,
          log: `gagal mengambil foto interval ${eventScreenshot}`
        }
      })
    }
  }

  handleGetMediaStatus = (condition, message) => {
    const { firebase, app, auth, SendLogActivity } = this.props
    const { clientUniqueId } = app
    const { uuid } = auth.user
    const date = new Date().getTime()
    const log =
      condition === 'error' ? `Camera error on first load: ${message}` : message
    firebase.update(`session/${uuid}/camera`, { [clientUniqueId]: log })
    SendLogActivity({
      mode: 'undirect',
      data: {
        clientUniqueId,
        date,
        log,
        status: condition,
        type: 'camera-log'
      }
    })
  }

  handleOpenConfirmation = () => {
    this.setState({
      isConfirmOpen: true,
      confirmMessage: 'Are you sure want to logout?'
    })
  }

  handleConfirmNo = () => {
    this.setState({ isConfirmOpen: false })
  }

  handleConfirmYes = () => {
    const { Logout } = this.props
    Logout()
  }

  render() {
    const { classes, auth, dashboard, firebaseAuth } = this.props
    const { confirmMessage, isConfirmOpen } = this.state
    const loading = auth.loading || firebaseAuth.isEmpty

    if (loading) {
      return <CircularLoading />
    }

    return (
      <>
        <Camera hidden setWebcamRef={this.setWebcamRef} />
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <div className={classes.logoContainer}>
              <img
                className={classes.mainLogo}
                src={ENV.CLIENT_LOGO}
                alt={`${ENV.CLIENT_NAME} Logo`}
              />
            </div>
            <div className={classes.menu}>
              <IconButton
                id="logout-button"
                onClick={this.handleOpenConfirmation}
                color="inherit"
              >
                <ExitToApp />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <main className={classes.body}>
          <Container
            maxWidth="sm"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            {dashboard.isLoading ? (
              <CircularLoading />
            ) : (
              <LazyComponentErrorBoundary>
                <Suspense fallback={<CircularLoading />}>
                  <Switch>
                    <Route
                      path="/instruction/:slug"
                      render={(props) => (
                        <Instruction
                          {...props}
                          appAuth={auth}
                          firebaseAuth={firebaseAuth}
                        />
                      )}
                    />
                    <Route
                      path="/simulation/:slug"
                      render={(props) => (
                        <Simulation
                          {...props}
                          appAuth={auth}
                          firebaseAuth={firebaseAuth}
                        />
                      )}
                    />
                    <Route
                      path="/assessment/:slug"
                      render={(props) => (
                        <Assessment
                          {...props}
                          appAuth={auth}
                          firebaseAuth={firebaseAuth}
                          takePhotoSilently={this.handleTakePhotoSilently}
                        />
                      )}
                    />
                    <Route
                      path="/dashboard"
                      render={(props) => (
                        <Dashboard
                          {...props}
                          appAuth={auth}
                          firebaseAuth={firebaseAuth}
                        />
                      )}
                    />
                    <Route
                      exact
                      path="/"
                      render={(props) => (
                        <Verification
                          {...props}
                          appAuth={auth}
                          firebaseAuth={firebaseAuth}
                        />
                      )}
                    />
                  </Switch>
                </Suspense>
              </LazyComponentErrorBoundary>
            )}
          </Container>
        </main>
        <LogoutConfirmation
          open={isConfirmOpen}
          title="Logout"
          message={confirmMessage}
          handleConfirmationNo={this.handleConfirmNo}
          handleConfirmationYes={this.handleConfirmYes}
        />
      </>
    )
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  dashboard: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
  firebaseAuth: PropTypes.object,
  SendLogActivity: PropTypes.func.isRequired,
  Logout: PropTypes.func.isRequired,
  LoadAssessment: PropTypes.func.isRequired
}

const mapStateToProps = ({ app, auth, dashboard, firebase }) => ({
  app,
  auth,
  dashboard,
  firebaseAuth: firebase.auth
})

const mapDispatchToProps = (dispatch) => ({
  SendLogActivity: (payload) => dispatch(SendLogActivityAction(payload)),
  Logout: () => dispatch(LogoutAction()),
  LoadAssessment: () => dispatch(LoadAssessmentAction())
})

export default compose(
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, { withTheme: true })
)(Layout)
