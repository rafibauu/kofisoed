import React from 'react'
import Typography from '@material-ui/core/Typography'
import SmartphoneIcon from '@material-ui/icons/Smartphone'

const Device = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <SmartphoneIcon style={{ fontSize: '6em' }} color="primary" />
      <div>
        <Typography variant="h3">Device alert!</Typography>
        <Typography>Anda akan mengerjakan TMA dan Qutest,</Typography>
        <Typography>
          mohon sign out lalu jalankan test di dalam cellular phone atau
          smartphone
        </Typography>
      </div>
    </div>
  )
}

export default Device
