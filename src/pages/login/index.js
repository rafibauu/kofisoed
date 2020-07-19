import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Paper } from '@material-ui/core/'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from './styles'

import { Login as LoginAction } from '../../state/modules/auth'
import LoginForm from './form'

class LoginPage extends React.Component {
  state = {
    shouldRedirect: false
  }

  static getDerivedStateFromProps({ auth, location }) {
    if (auth.isLoggedIn)
      return {
        shouldRedirect: true,
        redirectTo:
          location.state && location.state.from
            ? location.state.from.pathname
            : '/'
      }

    return { shouldRedirect: false }
  }

  render() {
    const { classes, auth, Login } = this.props
    const { shouldRedirect, redirectTo } = this.state

    if (shouldRedirect) {
      return <Redirect to={redirectTo} />
    }

    return (
      <div className={classes.loginContainer}>
        <Container maxWidth="xs">
          <Paper variant="outlined" className={classes.loginWrapper}>
            <LoginForm auth={auth} Login={Login} />
          </Paper>
        </Container>
      </div>
    )
  }
}

LoginPage.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  Login: PropTypes.func
}

const styledComponent = withStyles(styles)(LoginPage)

const mapStateToProps = ({ auth }) => ({ auth })

const mapDispatchToProps = (dispatch) => ({
  Login: (payload) => dispatch(LoginAction(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(styledComponent)
