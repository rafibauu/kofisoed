import React from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import ENV from '../../../env'
import styles from './styles'

class Login extends React.PureComponent {
  state = {
    nim: '',
    password: '',
    errors: {}
  }

  handleFormChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleFormChecking = (input) => {
    const errors = {}
    const notMandatory = ['idNumber', 'phone']
    const formKeys = Object.keys(input)
    formKeys.map((key) => {
      const value = input[key]
      if (notMandatory.indexOf(key) === -1 && (!value || value === '')) {
        errors[key] = true
        return true
      }
      errors[key] = false
      return true
    })
    const isError = formKeys.some((key) => errors[key] === true)
    return { isError, errors }
  }

  handleFormSubmit = async (e) => {
    e.preventDefault()
    this.setState({ isLoading: true })
    const {
      ShowSnackbar,
      firebase,
      handleSendIdentity,
      connection
    } = this.props
    const { form } = this.state
    const { email, password, name, nim } = form
    firebase
      .createUser({ email, password }, { username: name, email, nim })
      .then((data) => console.log(data))
    // }
    // return this.setState({ errors: { ...errors } })
  }

  render() {
    const { classes } = this.props
    const { isLoading, nim, password, errors } = this.state

    return (
      <Grid container spacing={3} alignItems="flex-start">
        <Grid container item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Hello,
              </Typography>
              <Typography variant="h5" gutterBottom>
                Welcome back
              </Typography>
              <Typography>
                Selamat datang, mohon isi form dengan data yang benar. Data yang
                anda berikan akan tersimpan sebagai database alumni Fisika
                Unsoed. Jika ada kendala, anda bisa menghubungi kontak ini:
                <b> rafi.bagaskara08@gmail.com</b>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid container item xs={12} sm={8}>
          <div className={classes.stepContainer}>
            <form
              onSubmit={this.handleFormSubmit}
              className={classes.identityForm}
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                id="nim"
                name="nim"
                className={classes.identityInput}
                label="NIM"
                size="small"
                value={nim}
                error={errors.nim}
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
                style={{ marginBottom: 35 }}
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
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Login)
