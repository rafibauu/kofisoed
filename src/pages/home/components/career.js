import React from 'react'
import { Link } from 'react-router-dom'
import Img from 'react-image'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import JobsIllustration from '../images/jobs-illustration.svg'
import CareerListItem from '../../../components/List/template-02'

const Career = () => {
  return (
    <>
      <Grid container alignItems="center" style={{ marginBottom: 25 }}>
        <Grid item xs={6}>
          <Typography variant="h5" display="block" gutterBottom>
            Career Platform
          </Typography>
          <Typography display="block" style={{ fontSize: 15 }} gutterBottom>
            Temukan lowongan pekerjaan, magang, kerja praktik, beasiswa atau
            pelatihan dimana mahasiswa atau alumni fisika bisa diterima di
            bidang tersebut !
          </Typography>
          <Button color="primary" variant="contained" style={{ marginTop: 50 }}>
            Career Platform
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Img
            src={JobsIllustration}
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid>
        <Grid container item xs={12} direction="column">
          <Grid
            container
            justify="space-between"
            alignItems="center"
            style={{ marginBottom: 25 }}
          >
            <Typography variant="h6" color="textPrimary" gutterBottom>
              Jobs Terbaru
            </Typography>
            <Link to="/jobs">
              <Button variant="outlined" color="secondary">
                Lihat semua
              </Button>
            </Link>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={3}>
              <CareerListItem
                link="/lalala"
                thumbnail="https://bkhh.lipi.go.id/wp-content/uploads/logo.png"
                position="Peneliti"
                corporate="Lembaga Peneliti Indonesia (LIPI)"
                deadline="15 Agustus 2020"
              />
            </Grid>
            <Grid item xs={3}>
              <CareerListItem
                link="/lalala"
                thumbnail="https://bkhh.lipi.go.id/wp-content/uploads/logo.png"
                position="Peneliti"
                corporate="Lembaga Peneliti Indonesia (LIPI)"
                deadline="15 Agustus 2020"
              />
            </Grid>
            <Grid item xs={3}>
              <CareerListItem
                link="/lalala"
                thumbnail="https://bkhh.lipi.go.id/wp-content/uploads/logo.png"
                position="Peneliti"
                corporate="Lembaga Peneliti Indonesia (LIPI)"
                deadline="15 Agustus 2020"
              />
            </Grid>
            <Grid item xs={3}>
              <CareerListItem
                link="/lalala"
                thumbnail="https://bkhh.lipi.go.id/wp-content/uploads/logo.png"
                position="Peneliti"
                corporate="Lembaga Peneliti Indonesia (LIPI)"
                deadline="15 Agustus 2020"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Career
