import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const RegistrationSucceed = (props) => {
  const [condition, setCondition] = React.useState('initial')
  const { location, history } = props
  const { state } = location

  React.useEffect(() => {
    if (!state && condition === 'initial') {
      setCondition('empty')
    }

    if (state && condition === 'initial') {
      history.replace({ state: undefined })
      setCondition('after-registration')
    }
  }, [state, history, condition])

  switch (condition) {
    case 'initial':
      return <></>
    case 'empty':
      return <Redirect to="/" />
    default:
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
          <Grid>
            <Typography variant="h5">Registrasi berhasil</Typography>
            <Typography>
              Terima kasih telah melakukan registrasi pada Fission Platform.
              Mohon periksa email anda dan lakukan verifikasi.
            </Typography>
          </Grid>
        </Container>
      )
  }
}

export default withRouter(RegistrationSucceed)
