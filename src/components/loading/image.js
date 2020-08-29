import React from 'react'

import { LinearProgress, Typography } from '@material-ui/core'

const ImagesLoading = () => {
  return (
    <div
      style={{
        textAlign: 'center',
        margin: 'auto',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: 300,
        height: 70
      }}
    >
      <LinearProgress
        color="primary"
        style={{ width: 160, margin: '10px auto 0px' }}
      />
      <Typography style={{ marginTop: 5 }}>Loading Images...</Typography>
      <Typography>Please wait, it will take a few seconds...</Typography>
    </div>
  )
}

export default ImagesLoading
