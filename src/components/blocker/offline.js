import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import SignalWifiOffIcon from '@material-ui/icons/SignalWifiOff'

const Offline = ({logout}) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Typography variant="h3">Offline</Typography>
      <SignalWifiOffIcon style={{ fontSize: '6em' }} color="primary" />
      <Typography>
        Anda tidak terhubung dengan jaringan internet, mohon lakukan refresh
        halaman setelah terkoneksi dengan jaringan internet
      </Typography>
      <Button
        style={{ marginRight: 5 }}
        variant="contained"
        id="button-logout"
        color="primary"
        onClick={() => window.location.reload()}
      >
        Refresh
      </Button>
    </div>
  )
}

export default Offline
