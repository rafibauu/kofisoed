import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

class FormIdentity extends React.PureComponent {
  state = {
    isLoading: false,
    name: {
      value: '',
      error: false,
      message: ''
    },
    nim: {
      value: '',
      error: false,
      message: ''
    },
    email: {
      value: '',
      error: false,
      message: ''
    },
    password: {
      value: '',
      error: false,
      message: ''
    },
    confirmPassword: {
      value: '',
      error: false,
      message: ''
    }
  }

  handleFormFormat = (name, value) => {
    const { password } = this.state
    const newValue = { value, error: false, message: '' }
    switch (name) {
      case 'nim':
        if (value.length < 9) {
          newValue.error = true
          newValue.message = 'NIM minimal 9 karakter'
        }
        break
      case 'password':
        if (value.length < 8) {
          newValue.error = true
          newValue.message = 'Password minimal 8 karakter'
        }
        break
      case 'confirmPassword':
        if (value.length < 8) {
          newValue.error = true
          newValue.message = 'Konfirmasi password minimal 8 karakter'
        } else if (value !== password.value) {
          newValue.error = true
          newValue.message = 'Konfirmasi password harus sama dengan password'
        }
        break
      default:
        break
    }
    return newValue
  }

  handleFormChange = (e) => {
    const { name, value } = e.target
    const newValue = this.handleFormFormat(name, value)
    this.setState({
      [name]: { ...newValue }
    })
  }

  handleCallback = () => {
    const { handleRedirect } = this.props
    return {
      success: () =>
        handleRedirect('/auth/registration-succeed', { registration: true }),
      failed: () => this.setState({ isLoading: false })
    }
  }

  handleFormSubmit = async (e) => {
    e.preventDefault()
    this.setState({ isLoading: true })
    const { Register } = this.props
    const { name, nim, email, password } = this.state
    Register(
      {
        name: name.value,
        nim: nim.value,
        email: email.value,
        password: password.value
      },
      this.handleCallback
    )
  }

  render() {
    const { classes } = this.props
    const {
      isLoading,
      name,
      nim,
      email,
      password,
      confirmPassword
    } = this.state

    return (
      <Container
        maxWidth="md"
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          paddingTop: 25,
          paddingBottom: 25
        }}
      >
        <Grid container spacing={3} alignItems="flex-start">
          <Grid container item direction="column" xs={12} sm={8}>
            <Typography variant="h5" gutterBottom>
              Daftar Akun Baru
            </Typography>
            <div className={classes.stepContainer}>
              <form
                onSubmit={this.handleFormSubmit}
                className={classes.identityForm}
                autoComplete="off"
              >
                <TextField
                  required
                  id="nim"
                  name="nim"
                  className={classes.identityInput}
                  label="NIM"
                  size="small"
                  value={nim.value}
                  error={nim.error}
                  helperText={nim.message}
                  onChange={this.handleFormChange}
                />
                <TextField
                  required
                  id="name"
                  name="name"
                  className={classes.identityInput}
                  label="Nama Lengkap"
                  size="small"
                  value={name.value}
                  error={name.error}
                  helperText={name.message}
                  onChange={this.handleFormChange}
                />
                <TextField
                  required
                  id="email"
                  name="email"
                  type="email"
                  className={classes.identityInput}
                  label="Email"
                  size="small"
                  value={email.value}
                  error={email.error}
                  helperText={email.message}
                  onChange={this.handleFormChange}
                />
                <TextField
                  required
                  id="password"
                  name="password"
                  type="password"
                  className={classes.identityInput}
                  label="Password"
                  size="small"
                  value={password.value}
                  error={password.error}
                  helperText={password.message}
                  onChange={this.handleFormChange}
                />
                <TextField
                  required
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className={classes.identityInput}
                  label="Confirm Password"
                  size="small"
                  value={confirmPassword.value}
                  error={confirmPassword.error}
                  helperText={confirmPassword.message}
                  onChange={this.handleFormChange}
                />
                <Typography display="block">
                  Dengan melakukan registrasi, anda menyetujui
                  <Link to="/termsofuse" target="_blank">
                    {' ketentuan dan syarat '}
                  </Link>
                  Fission Platform
                </Typography>
                <Button
                  style={{ width: 125, marginTop: 20 }}
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading && (
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
                  Submit
                </Button>
              </form>
            </div>
            <Typography style={{ display: 'block', marginTop: 20 }}>
              Sudah punya akun?
              <Link to="/auth/login"> Masuk sekarang</Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default withStyles(styles)(FormIdentity)
