import React from 'react'
import Img from 'react-image'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import LandingIllustrarion from './images/home-1.svg'

const SkillsComponent = React.lazy(() => import('./components/skills'))

const ContainerStyle = { padding: '25px 0' }

const Home = () => {
  return (
    <>
      <Grid container>
        <Container maxWidth="md" style={ContainerStyle}>
          <Grid container alignItems="center">
            <Grid container item xs={6}>
              <Typography variant="h5">About Us</Typography>
              <Typography>
                Fussion adalah sebuah platform yang memungkinkan kita sebagai
                seseorang yang pernah terlibat di dalam sistem akademik Jurusan
                Fisika Universitas Jenderal Soedirman, berkomunikasi dengan yang
                lain, termasuk dosen dan teman. Terdapat juga beberapa fitur
                yang ada di dalam platform ini.
              </Typography>
            </Grid>
            <Grid container item xs={6}>
              <Img
                src={LandingIllustrarion}
                style={{ width: '100%', height: 'auto' }}
              />
            </Grid>
          </Grid>
        </Container>
      </Grid>
      <Grid container>
        <Container maxWidth="lg" style={ContainerStyle}>
          <Grid container item xs={12}>
            <React.Suspense fallback={<div>Loading...</div>}>
              <SkillsComponent />
            </React.Suspense>
          </Grid>
        </Container>
      </Grid>
    </>
  )
}

export default Home
