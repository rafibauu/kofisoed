import React from 'react'
import { connect } from 'react-redux'
import Container from '@material-ui/core/Container'

import {
  Register as RegisterAction,
  Login as LoginAction
} from '../../state/modules/auth'
import LoginComponent from './components/login'
import RegisterComponent from './components/registration'

const Auth = (props) => {
  const { match, history, Register, Login } = props
  const { type } = match.params

  const handleAuthChange = (authType) => {
    history.push(authType)
  }

  return (
    <Container
      maxWidth="md"
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      {type === 'login' ? (
        <LoginComponent handleAuthChange={handleAuthChange} Login={Login} />
      ) : (
        <RegisterComponent
          handleAuthChange={handleAuthChange}
          Register={Register}
        />
      )}
    </Container>
  )
}

const mapDispatchToProps = (dispatch) => ({
  Register: (credential) => dispatch(RegisterAction(credential)),
  Login: (credential) => dispatch(LoginAction(credential))
})

const enhance = connect(null, mapDispatchToProps)

export default enhance(Auth)
