import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import qs from 'qs'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from './styles'

import ENV from '../../env'
import { LoginByToken as LoginByTokenAction } from '../../state/modules/auth'

const LoginToken = (props) => {
  const [status, setStatus] = useState('initial')
  const { history, location, classes, LoginByToken } = props

  const getTokenQuery = useCallback(() => {
    const { search } = location
    const query = qs.parse(search, { ignoreQueryPrefix: true })
    if (query.token) return query.token
    return null
  }, [location])

  const callback = useCallback(
    () => ({
      success: () => setStatus('success'),
      failed: () => setStatus('failed')
    }),
    []
  )

  useEffect(() => {
    if (status === 'initial') {
      const token = getTokenQuery()
      LoginByToken(token, callback)
    } else if (status === 'success') {
      history.push('/')
    } else {
      history.push('/login')
    }
  }, [status, getTokenQuery, LoginByToken, callback, history])

  const year = new Date().getFullYear()
  return (
    <div className={classes.loginContainer}>
      <Container maxWidth="xs">
        <Paper variant="outlined" className={classes.loginWrapper}>
          <img
            className={classes.companyLogo}
            src={ENV.CLIENT_LOGO}
            alt="company-logo"
          />
          <Button
            disabled
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.btnSubmit}
          >
            <CircularProgress
              color="primary"
              style={{
                padding: 5,
                width: 30,
                height: 30,
                marginRight: 8
              }}
            />
            Sign In
          </Button>
          <Typography
            color="textSecondary"
            align="center"
            style={{ marginTop: 25, fontSize: 13 }}
          >
            {`Multirater v${ENV.APP_VERSION} - © Talentlytica ${year}`}
          </Typography>
        </Paper>
      </Container>
    </div>
  )
}

LoginToken.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  LoginByToken: PropTypes.func
}

const styledLoginToken = withStyles(styles)(LoginToken)

const mapDispatchToProps = (dispatch) => ({
  LoginByToken: (token, callback) =>
    dispatch(LoginByTokenAction(token, callback))
})

export default connect(null, mapDispatchToProps)(styledLoginToken)
