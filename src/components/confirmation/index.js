import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress
} from '@material-ui/core'

import DOM_CONSTANT from '../../constants/dom'

export const Confirmation = (props) => {
  const {
    fullScreen,
    open,
    title,
    message,
    handleRequestClose,
    handleConfirmationNo,
    handleConfirmationYes,
    isLoading
  } = props

  const { confirmationButtonYes, confirmationButtonNo } = DOM_CONSTANT.ID
  const { primary } = DOM_CONSTANT.PROPERTY

  return (
    <Dialog
      fullScreen={fullScreen}
      disableBackdropClick
      disableEscapeKeyDown
      open={open}
      onClose={handleRequestClose}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
        {isLoading && <LinearProgress />}
      </DialogContent>
      <DialogActions>
        <Button
          id={confirmationButtonNo}
          onClick={handleConfirmationNo}
          color={primary}
          disabled={isLoading}
        >
          No
        </Button>
        <Button
          id={confirmationButtonYes}
          onClick={handleConfirmationYes}
          color={primary}
          autoFocus
          disabled={isLoading}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}

Confirmation.propTypes = {
  fullScreen: PropTypes.bool,
  open: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string,
  isLoading: PropTypes.bool,
  handleRequestClose: PropTypes.func,
  handleConfirmationNo: PropTypes.func,
  handleConfirmationYes: PropTypes.func
}

export default Confirmation
