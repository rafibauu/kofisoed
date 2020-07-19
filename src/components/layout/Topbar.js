import React from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button
} from '@material-ui/core/'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from './styles'

const Topbar = (props) => {
  const { classes } = props

  return (
    <div className={classes.topbar}>
      <div className={classes.topbarBackground} />
      <Container maxWidth="sm">
        <AppBar elevation={0}>
          <Toolbar>
            <Typography variant="h6">News</Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Container>
    </div>
  )
}

Topbar.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired
}

export default withStyles(styles)(Topbar)
