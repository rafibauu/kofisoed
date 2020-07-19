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
    open,
    title,
    message,
    dialog = false,
    handleRequestClose,
    confimationNoText = 'No',
    handleConfirmationNo,
    confirmationYesText = 'Yes',
    handleConfirmationYes,
    isLoading
  } = props

  const { confirmationButtonYes, confirmationButtonNo } = DOM_CONSTANT.ID
  const { primary } = DOM_CONSTANT.PROPERTY

  return (
    <Dialog
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
        {!dialog && (
          <Button
            id={confirmationButtonNo}
            onClick={handleConfirmationNo}
            color={primary}
            disabled={isLoading}
          >
            {confimationNoText}
          </Button>
        )}
        <Button
          id={confirmationButtonYes}
          onClick={handleConfirmationYes}
          color={primary}
          autoFocus
          disabled={isLoading}
        >
          {confirmationYesText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

Confirmation.propTypes = {
  dialog: PropTypes.bool,
  open: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string,
  isLoading: PropTypes.bool,
  handleRequestClose: PropTypes.func,
  confimationNoText: PropTypes.string,
  handleConfirmationNo: PropTypes.func,
  confirmationYesText: PropTypes.string,
  handleConfirmationYes: PropTypes.func
}

export default Confirmation
