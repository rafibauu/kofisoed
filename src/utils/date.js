import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/id'

dayjs.locale('id')
dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)

export const GetTimeToNow = (timestamp) => {
  return dayjs().to(timestamp)
}

export default true
