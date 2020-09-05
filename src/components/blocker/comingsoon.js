import React from 'react'
import FadeIn from 'react-fade-in'
import Lottie from 'react-lottie'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import * as ConstructionAnim from '../../static/lottie/11045-buildin-a-web-page.json'

const ConstructionAnimOptions = {
  loop: true,
  autoplay: true,
  animationData: ConstructionAnim.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

const ProjectDate = () => {
  return (
    <FadeIn>
      <Grid
        container
        alignItems="center"
        justify="center"
        direction="column"
        wrap="nowrap"
      >
        <Grid item xs={12}>
          <Typography color="primary" variant="h6" align="center" gutterBottom>
            Halaman sedang dalam pengembangan
          </Typography>
          <Lottie
            options={ConstructionAnimOptions}
            height={200}
            width={200}
            style={{ margin: 'auto' }}
          />
        </Grid>
      </Grid>
    </FadeIn>
  )
}

export default ProjectDate
