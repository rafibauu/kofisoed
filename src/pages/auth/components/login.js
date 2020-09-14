import React from 'react'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

class LoginPage extends React.PureComponent {
  state = {
    email: '',
    password: '',
    errors: {}
  }

  handleFormChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    const { Login } = this.props
    const { email, password } = this.state
    Login({ email, password })
  }

  render() {
    const { classes, authIsLoading } = this.props
    const { email, password, errors } = this.state

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
              Login
            </Typography>
            <div className={classes.stepContainer}>
              <form
                onSubmit={this.handleFormSubmit}
                className={classes.identityForm}
                autoComplete="off"
              >
                <TextField
                  required
                  id="email"
                  name="email"
                  type="email"
                  className={classes.identityInput}
                  label="Email"
                  size="small"
                  value={email}
                  error={errors.email}
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
                  value={password}
                  error={errors.password}
                  onChange={this.handleFormChange}
                />
                <Button
                  style={{ width: 125, marginBottom: 35 }}
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={authIsLoading}
                >
                  {authIsLoading && (
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
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default withStyles(styles)(LoginPage)
