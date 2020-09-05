import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const AdsRegistration = () => {
  return (
    <Grid container style={{ background: '#263238', position: 'relative' }}>
      <Container maxWidth="lg" style={{ padding: '50px 0' }}>
        <Grid container justify="center" direction="column">
          <Typography align="center" display="block" style={{ color: '#FFF' }}>
            Ayo kenali dirimu lebih dalam dengan Self Assessment.
          </Typography>
          <Typography
            variant="h6"
            align="center"
            display="block"
            style={{ color: '#FFF' }}
            gutterBottom
          >
            Kenali dirimu sebelum dunia !
          </Typography>
        </Grid>
        <Link to="/auth/registration" style={{ textDecoration: 'none' }}>
          <Button
            color="primary"
            variant="contained"
            style={{ display: 'block', margin: '50px auto 25px auto' }}
          >
            Daftar Self Assessment
          </Button>
        </Link>
      </Container>
    </Grid>
  )
}

export default AdsRegistration
