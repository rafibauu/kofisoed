import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { LogoutByAuthExpired } from '../../state/modules/auth'
import UserAutoLogout from './UserAutoLogout'

const PrivateRoute = (rootProps) => {
  const {
    component: Component,
    auth,
    authExpiredLogoutRequestProps,
    ...rest
  } = rootProps

  const nowMilis = new Date().getTime()
  const { isLoggedIn, expiredMilis, redirectAfterLogout } = auth

  if (expiredMilis !== 0 && nowMilis >= expiredMilis) {
    return (
      <UserAutoLogout
        authExpiredLogoutRequestProps={authExpiredLogoutRequestProps}
      />
    )
  }

  if (redirectAfterLogout) {
    return <Redirect to="/login" />
  }

  return (
    <Route
      {...rest}
      render={(childProps) => {
        if (!isLoggedIn) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: childProps.location }
              }}
            />
          )
        }

        return <Component {...childProps} />
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
  authExpiredLogoutRequestProps: () => dispatch(LogoutByAuthExpired())
})

export default connect(null, mapDispatchToProps)(PrivateRoute)
