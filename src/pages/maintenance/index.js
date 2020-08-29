import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import styles from './styles/index'

const MaintenancePage = props => {
  const { classes } = props
  return (
    <div className={classes.notFoundBlock}>
      <div className={classes.notFoundInner}>
        <div id="body-notfound" className={classes.notFoundBody}>
          <h1 id="notfound-message" className={classes.msgOne}>
            MAINTENANCE
          </h1>
          <p id="notfound-message-2" className={classes.msgTwo}>
            Mohon maaf, sistem kami sedang dalam perbaikan. Silakan tunggu
            beberapa saat sebelum refresh browser Anda.
          </p>
        </div>
      </div>
    </div>
  )
}

MaintenancePage.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MaintenancePage)
