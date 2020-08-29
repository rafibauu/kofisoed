/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography
} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { withStyles } from '@material-ui/core/styles'
import isEmpty from 'lodash/isEmpty'

import styles from '../styles'
import ENV from '../../../env'

class LoginForm extends React.Component {
  state = {
    form: {
      email: '',
      password: ''
    },
    shouldShowPassword: false,
    errors: {}
  }

  handleChange = (name) => (event) => {
    const { form } = this.state
    const { value } = event.target
    this.setState({
      form: {
        ...form,
        [name]: value
      },
      errors: {}
    })
  }

  handleShowPassword = () => {
    const { shouldShowPassword } = this.state
    this.setState({ shouldShowPassword: !shouldShowPassword })
  }

  validate = () => {
    const { errors, form } = this.state
    const { email, password } = form
    if (email.length <= 0) {
      errors.email = 'Email is required'
    }

    if (password.length <= 0) {
      errors.password = 'Password is required'
    }
    return errors
  }

  onSubmit = (e) => {
    e.preventDefault()
    const errors = this.validate()

    if (isEmpty(errors)) {
      const { Login } = this.props
      const { form } = this.state
      const { email, password } = form
      return Login({ email, password })
    }

    return this.setState({ errors })
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
    const { classes, app, auth } = this.props
    const { isLoading: appLoading } = app
    const { isLoading: authLoading } = auth
    const { form, errors, shouldShowPassword } = this.state
    const year = new Date().getFullYear()

    return (
      <>
        <img
          src={ENV.CLIENT_LOGO}
          className={classes.companyLogo}
          alt={`${ENV.CLIENT_NAME} Logo`}
        />
        <form
          className={classes.form}
          autoComplete="off"
          onSubmit={this.onSubmit}
        >
          <TextField
            required
            fullWidth
            id="email"
            label="Email"
            type="email"
            className={classes.textField}
            value={form.email}
            onChange={this.handleChange('email')}
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
            disabled={appLoading || authLoading}
          />
          <FormControl
            required
            fullWidth
            margin="normal"
            className={classes.textField}
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              id="password"
              type={shouldShowPassword ? 'text' : 'password'}
              value={form.password}
              onChange={this.handleChange('password')}
              endAdornment={this.getPasswordEndAdornment()}
            />
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            type="submit"
            color="primary"
            className={classes.btnSubmit}
            disabled={appLoading || authLoading}
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
            align="center"
            color="textSecondary"
            style={{ marginTop: 25, fontSize: 13 }}
          >
            {`TOP v${ENV.APP_VERSION} - © Talentlytica ${year}`}
          </Typography>
        </form>
      </>
    )
  }
}

const enhance = withStyles(styles)

export default enhance(LoginForm)
