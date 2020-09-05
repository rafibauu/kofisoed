import React from 'react'
import Img from 'react-image'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import SkillsListItem from '../../../components/List/template-01'
import MediaIcon from '../images/skills-media.svg'
import InteractionIcon from '../images/skills-interaction.svg'
import LessonIcon from '../images/skills-lesson.svg'

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
    <>
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
      <Grid container spacing={3} justify="center" style={{ marginBottom: 50 }}>
        <Grid item xs={3} lg={2}>
          <div style={ItemContainerStyle}>
            <Img src={MediaIcon} style={IconStyle} />
            <div style={LinkContainerStyle}>
              <a href="/skills" style={LinkStyle}>
                Media
              </a>
            </div>
          </div>
        </Grid>
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
            <Img src={LessonIcon} style={IconStyle} />
            <div style={LinkContainerStyle}>
              <a href="/skills" style={LinkStyle}>
                Tutorial
              </a>
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid
        container
        alignItems="center"
        spacing={6}
        style={{ marginBottom: 50 }}
      >
        <Grid item xs={6}>
          <Typography>Media</Typography>
          <Typography>
            Media online menjadi salah satu alat untuk berbagi
          </Typography>
          <Button color="primary" variant="contained" style={{ marginTop: 50 }}>
            Lihat Media
          </Button>
        </Grid>
        <Grid item xs={3}>
          <SkillsListItem
            thumbnail="https://firebasestorage.googleapis.com/v0/b/jufisoed-platform.appspot.com/o/temp%2Fimages.jpg?alt=media&token=4d9271a6-0b6d-4849-937d-1c6a6abc0ff6"
            title="Podcast E01"
            description="Podcast Fisika Unsoed episode pertama hadir ! Kita akan membahas mengenai Ikatan Alumni Fisika Unsoed"
            timestamp="1598691597663"
          />
        </Grid>
        <Grid item xs={3}>
          <SkillsListItem
            thumbnail="https://firebasestorage.googleapis.com/v0/b/jufisoed-platform.appspot.com/o/temp%2Fimages.jpg?alt=media&token=4d9271a6-0b6d-4849-937d-1c6a6abc0ff6"
            title="Podcast E01"
            description="Podcast Fisika Unsoed episode pertama hadir ! Kita akan membahas mengenai Ikatan Alumni Fisika Unsoed"
            timestamp="1598691597663"
          />
        </Grid>
      </Grid>
      <Grid
        container
        alignItems="center"
        spacing={6}
        style={{ marginBottom: 50 }}
      >
        <Grid item xs={6}>
          <Typography>Cerita Alumni</Typography>
          <Typography>
            Simak berbagai cerita dan pengalaman dari alumni
          </Typography>
          <Button color="primary" variant="contained" style={{ marginTop: 50 }}>
            Lihat Cerita Alumni
          </Button>
        </Grid>
        <Grid item xs={3}>
          <SkillsListItem
            thumbnail="https://firebasestorage.googleapis.com/v0/b/jufisoed-platform.appspot.com/o/temp%2Fimages.jpg?alt=media&token=4d9271a6-0b6d-4849-937d-1c6a6abc0ff6"
            title="Podcast E01"
            description="Podcast Fisika Unsoed episode pertama hadir ! Kita akan membahas mengenai Ikatan Alumni Fisika Unsoed"
            timestamp="1598691597663"
          />
        </Grid>
        <Grid item xs={3}>
          <SkillsListItem
            thumbnail="https://firebasestorage.googleapis.com/v0/b/jufisoed-platform.appspot.com/o/temp%2Fimages.jpg?alt=media&token=4d9271a6-0b6d-4849-937d-1c6a6abc0ff6"
            title="Podcast E01"
            description="Podcast Fisika Unsoed episode pertama hadir ! Kita akan membahas mengenai Ikatan Alumni Fisika Unsoed"
            timestamp="1598691597663"
          />
        </Grid>
      </Grid>
      <Grid
        container
        alignItems="center"
        spacing={6}
        style={{ marginBottom: 50 }}
      >
        <Grid item xs={6}>
          <Typography>Tutorial</Typography>
          <Typography>
            Tips dan trik untuk kalian yang sangat berguna
          </Typography>
          <Button color="primary" variant="contained" style={{ marginTop: 50 }}>
            Lihat Tutorial
          </Button>
        </Grid>
        <Grid item xs={3}>
          <SkillsListItem
            thumbnail="https://firebasestorage.googleapis.com/v0/b/jufisoed-platform.appspot.com/o/temp%2Fimages.jpg?alt=media&token=4d9271a6-0b6d-4849-937d-1c6a6abc0ff6"
            title="Podcast E01"
            description="Podcast Fisika Unsoed episode pertama hadir ! Kita akan membahas mengenai Ikatan Alumni Fisika Unsoed"
            timestamp="1598691597663"
          />
        </Grid>
        <Grid item xs={3}>
          <SkillsListItem
            thumbnail="https://firebasestorage.googleapis.com/v0/b/jufisoed-platform.appspot.com/o/temp%2Fimages.jpg?alt=media&token=4d9271a6-0b6d-4849-937d-1c6a6abc0ff6"
            title="Podcast E01"
            description="Podcast Fisika Unsoed episode pertama hadir ! Kita akan membahas mengenai Ikatan Alumni Fisika Unsoed"
            timestamp="1598691597663"
          />
        </Grid>
      </Grid>
    </>
  )
}

export default Skills
