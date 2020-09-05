import React from 'react'
import Img from 'react-image'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ScheduleRoundedIcon from '@material-ui/icons/ScheduleRounded'

import { GetTimeToNow } from '../../utils/date'
import ImageLazy from '../ImageLoader'

const ListTemplate01 = (props) => {
  const { thumbnail, title, description, timestamp } = props
  return (
    <Paper elevation={2}>
      <Img
        src={thumbnail}
        style={{ width: '100%', height: 'auto' }}
        loader={<ImageLazy width="100%" height="100%" />}
      />
      <div style={{ padding: '10px 15px' }}>
        <Typography style={{ fontWeight: 'bold' }}>{title}</Typography>
        <Typography style={{ fontSize: 14 }}>{description}</Typography>
      </div>
      <div
        style={{
          padding: '10px 15px',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Grid container alignItems="center">
          <ScheduleRoundedIcon style={{ marginRight: 5 }} />
          <Typography style={{ fontSize: 12 }}>
            {GetTimeToNow(timestamp)}
          </Typography>
        </Grid>
        <Button color="primary" variant="contained">
          Buka
        </Button>
      </div>
    </Paper>
  )
}

export default ListTemplate01
