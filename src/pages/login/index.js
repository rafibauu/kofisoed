import React from 'react'
import { Redirect } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles/index'

import { Login as LoginAction } from '../../state/modules/auth'
import LoginForm from './components/form'

const LoginPage = (props) => {
  const { classes, app, auth, Login } = props

  if (auth.isLoggedIn) {
    return <Redirect to="/" />
  }

  return (
    <div className={classes.loginContainer}>
      <Container maxWidth="xs">
        <Paper variant="outlined" classes={{ root: classes.loginWrapper }}>
          <LoginForm app={app} auth={auth} Login={Login} />
        </Paper>
      </Container>
    </div>
  )
}

const mapStateToProps = ({ app, auth }) => ({ app, auth })
const mapDispatchToProps = (dispatch) => ({
  Login: (credential) => dispatch(LoginAction(credential))
})

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)

export default enhance(LoginPage)
