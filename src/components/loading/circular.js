import React from 'react'
import PropTypes from 'prop-types'
import FadeIn from 'react-fade-in'
import Lottie from 'react-lottie'
import { Grid, Typography, withStyles } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import styles from './styles'
import * as NetworkErrorAnim from '../../static/lottie/12907-no-connection.json'

const NetworkErrorAnimOptions = {
  loop: true,
  autoplay: true,
  animationData: NetworkErrorAnim.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

const loadingState = (classes, text) => {
  return (
    <FadeIn style={{ display: 'flex' }}>
      <Grid container alignItems="center">
        <Typography
          variant="h6"
          color="primary"
          className={classes.loadingText}
        >
          {text || `Fetching data from database`}
        </Typography>
        <CircularProgress />
      </Grid>
    </FadeIn>
  )
}

const networkErrorState = (classes, text) => {
  return (
    <FadeIn style={{ display: 'flex' }}>
      <Grid container alignItems="center" justify="center">
        <Typography
          variant="h6"
          color="primary"
          className={classes.loadingText}
        >
          {text || `Fetching data is failed, network error`}
        </Typography>
        <Lottie
          options={NetworkErrorAnimOptions}
          height={44}
          width={44}
          style={{ margin: 0 }}
        />
      </Grid>
    </FadeIn>
  )
}

const loadComponentState = () => {
  return (
    <Grid container alignItems="center" justify="center">
      <CircularProgress variant="indeterminate" disableShrink />
    </Grid>
  )
}

const stateMapping = (classes, state, text) => {
  switch (state) {
    case 'networkError':
      return networkErrorState(classes, text)
    case 'component':
      return loadComponentState()
    default:
      return loadingState(classes, text)
  }
}

const AppPageLoading = React.memo((props) => {
  const { classes, state, text } = props
  return (
    <div className={classes.circularRoot}>
      {stateMapping(classes, state, text)}
    </div>
  )
})

AppPageLoading.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  state: PropTypes.string.isRequired,
  text: PropTypes.string
}

export default withStyles(styles)(AppPageLoading)
