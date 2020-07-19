export const secondsToTimestamp = (time, postfix = false) => {
  let timer = time
  if (postfix) timer = Math.floor(time.replace('s', ''))
  const hours = Math.floor(timer / 3600)
  const hoursInSeconds = hours * 3600
  const minutes = Math.floor((timer - hoursInSeconds) / 60)
  const minutesInSecond = minutes * 60
  const seconds = Math.floor(timer - hoursInSeconds - minutesInSecond)
  const displayHours = hours > 9 ? hours : `0${hours}`
  const displayMinutes = minutes > 9 ? minutes : `0${minutes}`
  const displaySeconds = seconds > 9 ? seconds : `0${seconds}`
  const display = `${displayHours}:${displayMinutes}:${displaySeconds}`
  return display
}

export default secondsToTimestamp
