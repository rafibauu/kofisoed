import React from 'react'
import Img from 'react-image'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import InteractionIcon from '../images/interaction.svg'
import TalentIcon from '../images/talent.svg'
import LessonIcon from '../images/lesson.svg'

const ItemContainerStyle = {
  border: '1px solid #dd5958',
  borderRadius: 6
}

const IconStyle = {
  padding: '15px 20px',
  width: '100%',
  height: 'auto'
}

const LinkContainerStyle = {
  padding: '15px 20px',
  backgroundColor: '#dd5958',
  textAlign: 'center'
}

const LinkStyle = {
  textDecoration: 'none',
  color: '#FFF'
}

const Skills = () => {
  return (
    <Container maxWidth="lg">
      <Grid container justify="center" style={{ marginBottom: 25 }}>
        <Grid item xs={12}>
          <Typography variant="h5" align="center" display="block" gutterBottom>
            Persiapkan dirimu untuk menunjang karir
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
            align="center"
            display="block"
            style={{ fontSize: 15 }}
            gutterBottom
          >
            Perjalanan setelah lulus baru dimulai, jangan sampai bingung apa
            yang ingin engkau capai selanjutnya. Tersedia beberapa fitur ini
            untuk memberikan kamu bekal bagaimana kehidupan setelah lulus
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3} justify="center">
        <Grid item xs={3} lg={2}>
          <div style={ItemContainerStyle}>
            <Img src={InteractionIcon} style={IconStyle} />
            <div style={LinkContainerStyle}>
              <a href="/skills" style={LinkStyle}>
                Cerita Alumni
              </a>
            </div>
          </div>
        </Grid>
        <Grid item xs={3} lg={2}>
          <div style={ItemContainerStyle}>
            <Img src={TalentIcon} style={IconStyle} />
            <div style={LinkContainerStyle}>
              <a href="/skills" style={LinkStyle}>
                Kenali Dirimu
              </a>
            </div>
          </div>
        </Grid>
        <Grid item xs={3} lg={2}>
          <div style={ItemContainerStyle}>
            <Img src={LessonIcon} style={IconStyle} />
            <div style={LinkContainerStyle}>
              <a href="/skills" style={LinkStyle}>
                Tutorial
              </a>
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Skills
