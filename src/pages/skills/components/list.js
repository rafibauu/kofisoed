import React from 'react'
import Img from 'react-image'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ScheduleRoundedIcon from '@material-ui/icons/ScheduleRounded'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/id'

import ImageLazy from '../../../components/ImageLoader'

const SkillsList = (props) => {
  const { list } = props
  const listKeys = Object.keys(list)
  dayjs.locale('id')
  dayjs.extend(localizedFormat)
  dayjs.extend(relativeTime)
  return listKeys.map((key) => {
    const item = list[key]
    return (
      <Grid key={key} item xs={12} sm={6} md={4} lg={3}>
        <Paper elevation={2}>
          <Img
            src={item.thumbnail}
            style={{ width: '100%', height: 'auto' }}
            loader={<ImageLazy width="100%" height="100%" />}
          />
          <div style={{ padding: '10px 15px' }}>
            <Typography style={{ fontWeight: 'bold' }}>{item.title}</Typography>
            <Typography style={{ fontSize: 14 }}>{item.description}</Typography>
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
                {dayjs().to(item.timestamp)}
              </Typography>
            </Grid>
            <Button color="primary" variant="contained">
              Buka
            </Button>
          </div>
        </Paper>
      </Grid>
    )
  })
}

export default SkillsList
