import React from 'react'
import { Link } from 'react-router-dom'
import Img from 'react-image'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const ListTemplate02 = (props) => {
  const { link, thumbnail, position, corporate, deadline } = props
  return (
    <Paper elevation={2} style={{ padding: '15px 15px' }}>
      <Img
        src={thumbnail}
        style={{
          width: 150,
          height: 'auto',
          padding: 15,
          display: 'block',
          margin: '0 auto 20px auto'
        }}
      />
      <Typography variant="h6">{position}</Typography>
      <Typography color="textSecondary">{corporate}</Typography>
      <Grid
        container
        alignItems="center"
        justify="space-between"
        style={{
          marginTop: 15,
          paddingTop: 15,
          borderTop: '1px solid #dadada'
        }}
      >
        <Typography
          color="textSecondary"
          style={{ fontSize: 13, marginRight: 10 }}
        >
          Deadline:
          <strong>{deadline}</strong>
        </Typography>
        <Link to={link}>
          <Button variant="contained" color="primary">
            Lihat
          </Button>
        </Link>
      </Grid>
    </Paper>
  )
}

export default ListTemplate02
