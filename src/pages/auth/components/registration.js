import React from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import ENV from '../../../env'
import styles from './styles'

class FormIdentity extends React.PureComponent {
  state = {
    isLoading: false,
    form: {
      name: '',
      nim: '',
      email: '',
      password: '',
      confirmPassword: '',
      isAgree: false
    },
    errors: {
      name: false,
      nim: false,
      email: false,
      password: false,
      confirmPassword: false,
      isAgree: false
    }
  }

  handleFormChange = (e) => {
    const { form, errors } = this.state
    const { name } = e.target
    let { value } = e.target
    if (name === 'isAgree') {
      value = !form[name]
    }
    if (value !== '' && name !== 'isAgree') {
      errors[name] = false
    }
    this.setState({
      form: {
        ...form,
        [name]: value
      },
      errors: { ...errors }
    })
  }

  handleFormDateChange = (date) => {
    const { form } = this.state
    this.setState({
      form: {
        ...form,
        birthday: date
      }
    })
  }

  // handleFormChecking = (input) => {
  //   const errors = {}
  //   const notMandatory = ['idNumber', 'phone']
  //   const formKeys = Object.keys(input)
  //   formKeys.map((key) => {
  //     const value = input[key]
  //     if (notMandatory.indexOf(key) === -1 && (!value || value === '')) {
  //       errors[key] = true
  //       return true
  //     }
  //     errors[key] = false
  //     return true
  //   })
  //   const isError = formKeys.some((key) => errors[key] === true)
  //   return { isError, errors }
  // }

  handleFormSubmit = async (e) => {
    e.preventDefault()
    this.setState({ isLoading: true })
    const { ShowSnackbar, firebase, Register, connection } = this.props
    const { form } = this.state
    Register(form)
  }

  render() {
    const { classes, handleAuthChange } = this.props
    const { isLoading, form, errors } = this.state

    return (
      <Grid container spacing={3} alignItems="flex-start">
        <Grid container item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Registration
              </Typography>
              <Typography>
                Selamat datang, mohon isi form dengan data yang benar. Data yang
                anda berikan akan tersimpan sebagai database alumni Fisika
                Unsoed. Jika ada kendala, anda bisa menghubungi kontak ini:
                <b> rafi.bagaskara08@gmail.com</b>
              </Typography>
              <Typography>Have an account ?</Typography>
              <Typography onClick={() => handleAuthChange('login')}>
                login
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
                id="name"
                name="name"
                className={classes.identityInput}
                label="Nama Lengkap"
                size="small"
                value={form.name}
                error={errors.name}
                onChange={this.handleFormChange}
              />
              <TextField
                required
                id="nim"
                name="nim"
                className={classes.identityInput}
                label="NIM"
                size="small"
                value={form.nim}
                error={errors.nim}
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
                value={form.email}
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
                value={form.password}
                error={errors.password}
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
                value={form.confirmPassword}
                error={errors.confirmPassword}
                onChange={this.handleFormChange}
              />
              <FormControl
                required
                error={errors.isAgree}
                component="fieldset"
                className={classes.identityInput}
              >
                <FormControlLabel
                  control={(
                    <Checkbox
                      required
                      name="isAgree"
                      onChange={this.handleFormChange}
                      value={form.isAgree}
                    />
                  )}
                  label="Saya menyatakan data yang saya berikan adalah benar adanya"
                />
                <FormHelperText>
                  {errors.isAgree && 'Mohon centang persetujuan'}
                </FormHelperText>
              </FormControl>
              <Button
                style={{ marginBottom: 35 }}
                color="primary"
                variant="contained"
                type="submit"
                disabled={isLoading}
                onClick={this.handleFormSubmit}
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

export default withStyles(styles)(FormIdentity)
