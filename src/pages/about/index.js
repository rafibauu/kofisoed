import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const Style = {
  Container: {
    marginBottom: 25
  },
  TeamContainer: {
    display: 'flex'
  },
  IdentityContainer: {
    marginLeft: 10
  },
  Name: {
    fontWeight: 'bold',
    fontSize: 18
  },
  NIM: {
    fontSize: 14,
    color: '#969696'
  }
}

const About = () => {
  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={12} style={Style.Container}>
          <Typography variant="h5">Fission</Typography>
          <Typography>
            Fission adalah sebuah platform yang memungkinkan kita sebagai
            seseorang yang pernah terlibat di dalam sistem akademik Jurusan
            Fisika Universitas Jenderal Soedirman, berkomunikasi dengan yang
            lain, termasuk dosen dan teman. Terdapat juga beberapa fitur yang
            ada di dalam platform ini.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Dev Team
          </Typography>
        </Grid>
        <Grid item xs={3} style={Style.Container}>
          <div style={Style.TeamContainer}>
            <Avatar alt="Rafi Bagaskara">RB</Avatar>
            <div style={Style.IdentityContainer}>
              <Typography style={Style.Name}>Rafi Bagaskara</Typography>
              <Typography style={Style.NIM}>H1E013037</Typography>
              <Typography>Front-End Engineer</Typography>
            </div>
          </div>
        </Grid>
        <Grid item xs={3} style={Style.Container}>
          <div style={Style.TeamContainer}>
            <Avatar alt="Moch. Arsya">MA</Avatar>
            <div style={Style.IdentityContainer}>
              <Typography style={Style.Name}>Moch. Arsya </Typography>
              <Typography style={Style.NIM}>H1E014037</Typography>
              <Typography>Front-End Engineer</Typography>
            </div>
          </div>
        </Grid>
        <Grid item xs={3} style={Style.Container}>
          <div style={Style.TeamContainer}>
            <Avatar alt="Dian Bayu">DB</Avatar>
            <div style={Style.IdentityContainer}>
              <Typography style={Style.Name}>Dian Bayu</Typography>
              <Typography style={Style.NIM}>H1E014037</Typography>
              <Typography>Designer</Typography>
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Kontak
          </Typography>
          <Typography>
            Sampaikan saran dan kesan Anda pada kontak berikut ini:
          </Typography>
          <Typography>Email: fission@gmail.com</Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default About
