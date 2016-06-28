export const today = () => {
  let today = new Date()
  let dd = today.getDate()
  let mm = today.getMonth() + 1 // January is 0
  const yyyy = today.getFullYear()
  if (dd < 10) dd = '0' + dd
  if (mm < 10) mm = '0' + mm
  console.log('today:', `${yyyy}-${mm}-${dd}`)
  return `${yyyy}-${mm}-${dd}`
}

const daysInMonth = (iMonth, iYear) =>
  32 - new Date(iYear, iMonth, 32).getDate()

export const isWeekday = (year, month, day) => {
  const weekInd = year ? new Date().getDay() : new Date(year, month, day).getDay()
  return weekInd !== 0 && weekInd !== 6
}

export const getWeekdaysInMonth = (month, year) => {
  if (!month) {
    let today = new Date()
    month = today.getMonth()
    year = today.getFullYear()
  }
  const days = daysInMonth(month, year)
  let weekdays = 0
  for (let i = 0; i < days; i++) {
    if (isWeekday(year, month, i + 1)) weekdays++
  }
  return weekdays
}
