import React from 'react'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Typography from '@material-ui/core/Typography'

const ListItemStyle = {
  cursor: 'pointer',
  padding: '5px 0'
}

const Sidebar = (props) => {
  const { categories, setCategories } = props

  const handleCategoryOnChecked = (e) => {
    const { name } = e.target
    const newValue = !categories[name]
    const newCategories = { ...categories, [name]: newValue }
    setCategories(newCategories)
  }
  return (
    <>
      <Typography variant="h6" display="block" gutterBottom>
        Category
      </Typography>
      <FormControl
        component="fieldset"
        style={{ paddingLeft: 10, marginBottom: 25 }}
      >
        <FormGroup>
          <FormControlLabel
            control={(
              <Checkbox
                checked={categories['cerita-alumni'] || false}
                onChange={handleCategoryOnChecked}
                name="cerita-alumni"
              />
            )}
            label="Cerita Alumni"
          />
          <FormControlLabel
            control={(
              <Checkbox
                checked={categories['kenali-diri'] || false}
                onChange={handleCategoryOnChecked}
                name="kenali-diri"
              />
            )}
            label="Kenali Diri"
          />
          <FormControlLabel
            control={(
              <Checkbox
                checked={categories['tutorial'] || false}
                onChange={handleCategoryOnChecked}
                name="tutorial"
              />
            )}
            label="Tutorial"
          />
        </FormGroup>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        style={{ display: 'block', marginTop: 15, width: '100%' }}
      >
        Aktifkan
      </Button>
    </>
  )
}

export default Sidebar
