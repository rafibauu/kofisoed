import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import withStyles from '@material-ui/core/styles/withStyles'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import styles from './styles'

import ENV from '../../env'

class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
    shouldShowPassword: false
  }

  handleInputChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleShowPassword = () => {
    const { shouldShowPassword } = this.state
    this.setState({ shouldShowPassword: !shouldShowPassword })
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    const { Login } = this.props
    const { email, password } = this.state
    Login({ email, password })
  }

  getPasswordEndAdornment = () => {
    const { shouldShowPassword } = this.state
    return (
      <InputAdornment position="end">
        <IconButton
          onClick={this.handleShowPassword}
          aria-label="toggle password visibility"
          edge="end"
        >
          {shouldShowPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    )
  }

  render() {
    const { classes, auth } = this.props
    const { shouldShowPassword, email, password } = this.state
    const year = new Date().getFullYear()

    return (
      <>
        <img
          className={classes.companyLogo}
          src={ENV.CLIENT_LOGO}
          alt="company-logo"
        />
        <form onSubmit={this.handleFormSubmit} className={classes.form}>
          <TextField
            required
            fullWidth
            variant="outlined"
            margin="normal"
            id="email"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={this.handleInputChange}
          />
          <FormControl
            required
            fullWidth
            margin="normal"
            variant="outlined"
            className={classes.textField}
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              name="password"
              id="password"
              type={shouldShowPassword ? 'text' : 'password'}
              value={password}
              onChange={this.handleInputChange}
              endAdornment={this.getPasswordEndAdornment()}
              labelWidth={85}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={auth.isLoading}
            className={classes.btnSubmit}
          >
            {auth.isLoading && (
              <CircularProgress
                color="primary"
                style={{
                  padding: 5,
                  width: 30,
                  height: 30,
                  marginRight: 8
                }}
              />
            )}
            Sign In
          </Button>
          <Typography
            color="textSecondary"
            align="center"
            style={{ marginTop: 25, fontSize: 13 }}
          >
            {`Multirater v${ENV.APP_VERSION} - © Talentlytica ${year}`}
          </Typography>
        </form>
      </>
    )
  }
}

LoginForm.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  auth: PropTypes.instanceOf(Object),
  Login: PropTypes.func.isRequired
}

export default withStyles(styles)(LoginForm)
