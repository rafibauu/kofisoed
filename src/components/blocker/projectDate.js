import React from 'react'
import Typography from '@material-ui/core/Typography'
import EventBusyIcon from '@material-ui/icons/EventBusy'

const ProjectDate = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <EventBusyIcon style={{ fontSize: '6em' }} color="primary" />
      <div>
        <Typography variant="h5">Selamat datang!</Typography>
        <Typography>
          Tidak ada assessment yang wajib dikerjakan karena
        </Typography>
        <Typography>- Assessment belum dimulai</Typography>
        <Typography>- Assessment sudah berakhir</Typography>
      </div>
    </div>
  )
}

export default ProjectDate
