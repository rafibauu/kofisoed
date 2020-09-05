import React from 'react'
import Grid from '@material-ui/core/Grid'

import ListItem from '../../../components/List/template-01'

const SkillsList = (props) => {
  const { list } = props
  const listKeys = Object.keys(list)
  return listKeys.reverse().map((key) => {
    const item = list[key]
    return (
      <Grid key={key} item xs={12} sm={6} md={4} lg={3}>
        <ListItem
          thumbnail={item.thumbnail}
          title={item.title}
          description={item.description}
          timestamp={item.timestamp}
        />
      </Grid>
    )
  })
}

export default SkillsList
