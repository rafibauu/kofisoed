import React from 'react'
import PropTypes from 'prop-types'
import { Snackbar } from '@material-ui/core/'

class AppSnackbar extends React.Component {
  state = {
    hideAfter: 6000
  }

  render() {
    const { open, message, hideSnackbar } = this.props
    const { hideAfter } = this.state
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={open}
        autoHideDuration={hideAfter}
        onClose={hideSnackbar}
        message={<span id="message-id">{message}</span>}
      />
    )
  }
}

AppSnackbar.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.any,
  hideSnackbar: PropTypes.func.isRequired
}

export default AppSnackbar
