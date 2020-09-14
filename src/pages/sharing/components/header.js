import React from 'react'
import Img from 'react-image'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import StudyIllustration from '../images/study.svg'

const Header = () => {
  return (
    <Grid
      container
      justify="space-around"
      alignItems="center"
      style={{
        height: 300,
        backgroundColor: '#d5d5d5',
        borderRadius: 10,
        paddingTop: 50,
        marginBottom: 25,
        marginTop: 25
      }}
    >
      <Grid item xs={6}>
        <Typography variant="h5">Sharing</Typography>
        <Typography>Tempat untuk berbagi informasi</Typography>
      </Grid>
      <Img
        src={StudyIllustration}
        style={{
          height: '100%',
          alignSelf: 'flex-end'
        }}
      />
    </Grid>
  )
}

export default Header
