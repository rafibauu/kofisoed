import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/id'

const TestList = React.memo((props) => {
  dayjs.locale('id')
  dayjs.extend(localizedFormat)
  const { auth, project, tests, handleStartTest } = props
  const endDate = dayjs(project.endDate).format('LLLL')
  const endDateText = `sebelum: ${endDate}`

  return (
    <>
      <Typography>{`${auth.fullName},`}</Typography>
      <Typography>
        {`Berikut ini Ada ${tests.length}
          test yang perlu anda selesaikan,`}
      </Typography>
      <Typography>{endDateText}</Typography>
      <br />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <Typography>Nama Test</Typography>
        <Typography>Status</Typography>
      </div>
      {tests.map((test) => {
        return (
          <div
            key={test.test_id}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Typography color="primary">{test.title}</Typography>
            <Typography color="primary">
              {test.status === 1 ? 'Selesai' : 'Belum'}
            </Typography>
          </div>
        )
      })}
      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <Button
          style={{ marginRight: 5 }}
          variant="contained"
          id="button-mulai-test"
          color="primary"
          onClick={handleStartTest}
        >
          Mulai Test
        </Button>
      </div>
    </>
  )
})

TestList.propTypes = {
  auth: PropTypes.object,
  project: PropTypes.any,
  tests: PropTypes.any,
  handleStartTest: PropTypes.func
}

export default TestList
