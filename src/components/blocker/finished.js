import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Check from '@material-ui/icons/Check'

const Device = ({ logout }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Typography variant="h3">Test Selesai</Typography>
      <Check style={{ fontSize: '6em' }} color="primary" />
      <Typography>
        Terimakasih anda telah selesai mengerjakan semua test,silahkan tekan
        tombol dibawah ini untuk keluar dari aplikasi ini
      </Typography>
      <Button
        style={{ marginRight: 5 }}
        variant="contained"
        id="button-logout"
        color="primary"
        onClick={() => logout()}
      >
        Logout
      </Button>
    </div>
  )
}

Device.propTypes = {
  logout: PropTypes.func
}

export default Device
