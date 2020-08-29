import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { LogoutByAuthExpired as LogoutByAuthExpiredAction } from '../../state/modules/auth'
import PrivateAutoLogout from './PrivateAutoLogout'

const PrivateRoute = (rootProps) => {
  const {
    component: Component,
    auth,
    LogoutByAuthExpired,
    ...routerProps
  } = rootProps

  const nowMilis = new Date().getTime()
  const { isLoggedIn, expiredMilis, redirectAfterLogout } = auth

  if (expiredMilis !== 0 && nowMilis >= expiredMilis) {
    return <PrivateAutoLogout LogoutByAuthExpired={LogoutByAuthExpired} />
  }

  if (redirectAfterLogout) {
    return <Redirect to="/login" />
  }

  return (
    <Route
      {...routerProps}
      render={(props) => {
        if (!isLoggedIn) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          )
        }

        return <Component {...props} />
      }}
    />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.any
}

const mapDispatchToProps = (dispatch) => ({
  LogoutByAuthExpired: () => dispatch(LogoutByAuthExpiredAction())
})

export default connect(null, mapDispatchToProps)(PrivateRoute)
