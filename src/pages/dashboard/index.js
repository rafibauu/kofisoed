import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded } from 'react-redux-firebase'
import FadeIn from 'react-fade-in'

import {
  SendLogActivity as SendLogActivityAction,
  ShowSnackbar as ShowSnackbarAction
} from '../../state/modules/app'
import { Logout as LogoutAction } from '../../state/modules/auth'
import Tests from './components/testList'
import ProjectDateBlocker from '../../components/blocker/projectDate'
import FinishedBlocker from '../../components/blocker/finished'
import CircularLoading from '../../components/loading/circular'
import Subtest from '../../hoc/Subtest'
import Client from '../../hoc/Client'

const Dashboard = (props) => {
  const { SendLogActivity } = props
  React.useEffect(() => {
    SendLogActivity({
      mode: 'undirect',
      data: {
        type: 'activity',
        date: Date.now(),
        log: 'masuk di list test'
      }
    })
  }, [SendLogActivity])

  const { history, ShowSnackbar, getUsersTest, getClientConnection } = props
  const handleStartTest = React.useCallback(() => {
    if (!getClientConnection()) {
      return ShowSnackbar({
        message: `Mohon maaf anda tidak terhubung ke internet,
        silakan coba kembali lain waktu!`
      })
    }
    const nextTest = getUsersTest().find((test) => test.status === 0)
    return history.push(`/instruction/${nextTest.slug}`)
  }, [history, ShowSnackbar, getUsersTest, getClientConnection])

  const {
    dashboard,
    session,
    getUsersAuth,
    getUsersProject,
    getUsersSession,
    getAssessmentFinishedStatus
  } = props

  const firebaseLoading = !isLoaded(session)
  if (firebaseLoading) {
    return <CircularLoading />
  }

  const { hasAssessment } = dashboard
  if (!hasAssessment) {
    return <ProjectDateBlocker />
  }

  const isFinished = getAssessmentFinishedStatus()
  if (isFinished) {
    const { Logout } = props
    return <FinishedBlocker logout={Logout} />
  }

  const usersSession = getUsersSession()
  if (!usersSession.identity) {
    return (
      <Redirect
        to={{
          pathname: '/',
          state: {
            errorMessage: 'Mohon mengisi form identitas terlebih dahulu'
          }
        }}
      />
    )
  }

  const {
    verification_image1: image1,
    verification_image2: image2
  } = usersSession
  if (dashboard.project.verification === 1) {
    if (!image1 || !image2) {
      return (
        <Redirect
          to={{
            pathname: '/',
            state: {
              errorMessage: 'Mohon lakukan verifikasi foto terlebih dahulu'
            }
          }}
        />
      )
    }
  }

  return (
    <div style={{ width: '100%' }}>
      <FadeIn>
        <Tests
          auth={getUsersAuth()}
          project={getUsersProject()}
          tests={getUsersTest()}
          handleStartTest={handleStartTest}
        />
      </FadeIn>
    </div>
  )
}

Dashboard.propTypes = {
  history: PropTypes.object,
  dashboard: PropTypes.object,
  SendLogActivity: PropTypes.func,
  ShowSnackbar: PropTypes.func,
  Logout: PropTypes.func,
  session: PropTypes.object,
  getUsersAuth: PropTypes.func,
  getUsersProject: PropTypes.func,
  getUsersSession: PropTypes.func,
  getAssessmentFinishedStatus: PropTypes.func,
  getUsersTest: PropTypes.func,
  getClientConnection: PropTypes.func
}

const mapStateToProps = ({ app, dashboard, firebase }) => ({
  app,
  dashboard,
  session: firebase.data.session,
  firebaseConnected: firebase.data[''].info.connected
})

const mapDispatchToProps = (dispatch) => ({
  SendLogActivity: (payload) => dispatch(SendLogActivityAction(payload)),
  ShowSnackbar: () => dispatch(ShowSnackbarAction()),
  Logout: () => dispatch(LogoutAction())
})

const enhance = compose(
  firebaseConnect((props, store) => {
    const { auth } = store.getState()
    const { uuid } = auth.user
    return [`session/${uuid}`, '.info/connected']
  }),
  connect(mapStateToProps, mapDispatchToProps),
  Subtest,
  Client
)

export default enhance(Dashboard)
