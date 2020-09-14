import React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import TablePagination from '@material-ui/core/TablePagination'

import { LoadSkills as LoadSkillsAction } from '../../state/modules/skills'
import CircularLoading from '../../components/loading/circular'
import Header from './components/header'
import List from './components/list'

const Skills = (props) => {
  const { skills, LoadSkills } = props
  const [category, setCategory] = React.useState('all')
  const [page, setPage] = React.useState(0)
  const [sortBy, setSortBy] = React.useState('waktu')

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
    LoadSkills({ page: newPage, category })
  }

  React.useEffect(() => {
    LoadSkills({ page, category })
  }, [page, category, LoadSkills])

  const { isLoading, data } = skills

  return (
    <Container maxWidth="lg">
      <Header />
      <Grid container alignItems="center" justify="space-between">
        <Grid item xs={12} md={9}>
          <Button
            variant={category === 'all' ? 'contained' : 'text'}
            color="primary"
            onClick={() => setCategory('all')}
          >
            Semua
          </Button>
          <Button
            variant={category === 'cerita-alumni' ? 'contained' : 'text'}
            color="primary"
            style={{ margin: '0 5px' }}
            onClick={() => setCategory('cerita-alumni')}
          >
            Article
          </Button>
          <Button
            variant={category === 'kenali-diri' ? 'contained' : 'text'}
            color="primary"
            style={{ margin: '0 5px' }}
            onClick={() => setCategory('kenali-diri')}
          >
            Video
          </Button>
          <Button
            variant={category === 'tutorial' ? 'contained' : 'text'}
            color="primary"
            onClick={() => setCategory('tutorial')}
          >
            Podcast
          </Button>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl style={{ width: '100%' }}>
            <InputLabel id="sortBy-label">Urutkan berdasarkan</InputLabel>
            <Select
              labelId="sortBy-label"
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              label="Urutkan berdasarkan"
            >
              <MenuItem value="waktu">Waktu</MenuItem>
              <MenuItem value="nama">Nama</MenuItem>
              <MenuItem value="category">Category</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid
          container
          item
          xs={12}
          style={{ padding: '25px 0', minHeight: 250 }}
          spacing={2}
        >
          {isLoading && <CircularLoading />}
          {data && <List list={data} />}
        </Grid>
      </Grid>
      <TablePagination
        component="div"
        count={100}
        page={page}
        rowsPerPage={10}
        onChangePage={handleChangePage}
      />
    </Container>
  )
}

const mapStateToProps = ({ skills }) => ({ skills })
const mapDispatchToProps = (dispatch) => ({
  LoadSkills: (info) => dispatch(LoadSkillsAction(info))
})

const enhance = connect(mapStateToProps, mapDispatchToProps)

export default enhance(Skills)
