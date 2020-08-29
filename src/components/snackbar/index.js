import React from 'react'
import PropTypes from 'prop-types'
import { Snackbar } from '@material-ui/core/'

class AppSnackbar extends React.Component {
  state = {
    hideAfter: 6000
  }

  render() {
    const { open, message, onClose } = this.props
    const { hideAfter } = this.state
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={open}
        autoHideDuration={hideAfter}
        onClose={onClose}
        message={<span id="message-id">{message}</span>}
      />
    )
  }
}

AppSnackbar.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.any,
  onClose: PropTypes.func.isRequired
}

export default AppSnackbar
