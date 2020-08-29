import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import styles from './styles/index'

const NotFound = props => {
  const { classes } = props
  return (
    <div className={classes.notFoundBlock}>
      <div className={classes.notFoundInner}>
        <div id="body-notfound" className={classes.notFoundBody}>
          <h1 id="notfound-message" className={classes.msgOne}>
            The page you were looking for does not exist.
          </h1>
          <p id="notfound-message-2" className={classes.msgTwo}>
            You may have mistyped the address or the page may have moved.
          </p>
        </div>
        <p id="notfound-message-3" className={classes.lastMsg}>
          If you are the application owner check the logs for more information.
        </p>
      </div>
    </div>
  )
}

NotFound.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NotFound)
