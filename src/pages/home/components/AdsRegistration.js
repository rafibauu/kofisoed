import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const AdsRegistration = () => {
  return (
    <Grid container style={{ background: '#dadada' }}>
      <Container maxWidth="lg" style={{ padding: '50px 0' }}>
        <Grid container justify="center" direction="column">
          <Typography align="center" display="block">
            Alumni Fisika Unsoed tapi belum punya akun ?
          </Typography>
          <Typography variant="h6" align="center" display="block" gutterBottom>
            Ayo Bergabung !
          </Typography>
        </Grid>
        <Link to="/auth/registration" style={{ textDecoration: 'none' }}>
          <Button
            color="primary"
            variant="contained"
            style={{ display: 'block', margin: '50px auto 25px auto' }}
          >
            Registrasi
          </Button>
        </Link>
      </Container>
    </Grid>
  )
}

export default AdsRegistration
