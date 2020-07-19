import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const rootStyle = {
  marginTop: 25,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}
const actionButtonStyle = { marginTop: 25, width: 150 }

const AppFailed = (props) => {
  const { title, description, actionText, action = false } = props
  return (
    <div style={rootStyle}>
      <Typography variant="h5">{title}</Typography>
      <Typography>{description}</Typography>
      {action && (
        <Button
          style={actionButtonStyle}
          variant="contained"
          color="primary"
          onClick={action}
        >
          {actionText}
        </Button>
      )}
    </div>
  )
}

AppFailed.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  actionText: PropTypes.string,
  action: PropTypes.func
}

export default AppFailed
