import TSheets from 'tsheets-client'
import { getEnvVar } from './env'
const defaultStartDate = '2014-01-01' // end is today by default

// attach tsheets token to an object
export const attachToken = (obj) =>
  Object.assign({}, obj, { api_token: getEnvVar('TSHEETS_TOKEN') })

// Creates current time in tsheets format
export const today = () => {
  let today = new Date()
  let dd = today.getDate()
  let mm = today.getMonth() + 1 // January is 0
  const yyyy = today.getFullYear()
  if (dd < 10) dd = '0' + dd
  if (mm < 10) mm = '0' + mm
  return `${yyyy}-${mm}-${dd}`
}

// Creates a query object needed for tSheets
export const createQuery = (queryParams = {}) => {
  let { start_date, end_date, api_token } = queryParams || {}
  if (!start_date) start_date = defaultStartDate
  if (!end_date) end_date = today()
  return api_token
    ? { start_date, end_date, api_token }
    : attachToken({ start_date, end_date })
}

// Gets timesheets while attaching token to query and wrapping in promise
export const getSheets = (q) =>
  new Promise((resolve, reject) =>
    TSheets.getTimesheets(
      createQuery(q),
      (err, sheets) => err
        ? reject(err)
        : resolve(sheets)
    )
  )
