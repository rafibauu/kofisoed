import moment from 'moment'

export const getActiveDataByDate = (keys, data) => {
  const nowMilis = Date.now()
  const startDateKey = keys[0]
  const endDateKey = keys[1]
  const isObject = typeof data === 'object'
  const mappingData = isObject ? Object.keys(data) : data
  const activeKeys = mappingData.filter((key) => {
    const singleData = isObject ? data[key] : key
    const startDate = singleData[startDateKey]
    const endDate = singleData[endDateKey]
    const startMilis = moment(startDate).format('x')
    const endMilis = moment(endDate).format('x')
    return nowMilis > startMilis && nowMilis < endMilis
  })
  if (isObject) {
    return activeKeys.map((key) => data[key])
  }
  return activeKeys
}

export const getActiveDataByKey = (query, data) => {
  const [keyQuery, value] = query
  const isObject = typeof data === 'object'
  const mappingData = isObject ? Object.keys(data) : data
  const activeKeys = mappingData.find((key) => {
    const singleData = isObject ? data[key] : key
    return singleData[keyQuery] === value
  })
  if (isObject) {
    return data[activeKeys]
  }
  return activeKeys
}

export const getDateStatus = (nowMilis, startMilis, endMilis) => {
  let status = 1
  if (nowMilis < startMilis) {
    status = 0
  } else if (nowMilis > endMilis) {
    status = 2
  }

  return status
}
