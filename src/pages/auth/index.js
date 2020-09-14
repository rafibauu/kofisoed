import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import {
  Register as RegisterAction,
  Login as LoginAction
} from '../../state/modules/auth'
import RegisterComponent from './components/registration'
import RegistrationSucceedComponent from './components/registrationSucceed'
import LoginComponent from './components/login'

const Auth = (props) => {
  const { match, history, auth, firebaseAuth, Register, Login } = props
  const { type } = match.params

  const handleRedirect = (path, state) => {
    history.push({
      pathname: path,
      state: { ...state }
    })
  }

  if (auth.isLoggedIn) {
    return <Redirect to="/" />
  }

  switch (type) {
    case 'registration':
      return (
        <RegisterComponent
          authIsLoading={auth.isLoading}
          handleRedirect={handleRedirect}
          Register={Register}
        />
      )
    case 'login':
      return (
        <LoginComponent
          authIsLoading={auth.isLoading}
          handleRedirect={handleRedirect}
          Login={Login}
        />
      )
    case 'registration-succeed':
      return (
        <RegistrationSucceedComponent
          firebaseAuth={firebaseAuth}
          handleRedirect={handleRedirect}
        />
      )
    default:
      return <></>
  }
}

const mapStateToProps = ({ auth, firebase }) => ({
  auth,
  firebaseAuth: firebase.auth
})

const mapDispatchToProps = (dispatch) => ({
  Register: (credential, callback) =>
    dispatch(RegisterAction(credential, callback)),
  Login: (credential) => dispatch(LoginAction(credential))
})

const enhance = connect(mapStateToProps, mapDispatchToProps)

export default enhance(Auth)
