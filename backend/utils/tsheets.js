import TSheets from 'tsheets-client'
import { timesheets } from 'tsheets-client'
import { getEnvVar } from './env'
import request from 'request'
const defaultStartDate = '2010-01-01' // end is today by default
const apiBaseUri = 'https://rest.tsheets.com/api/v1'

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

/**
 * Makes an authenticated request to the TSheets API.
 * @param {Object} params Token, endpoint, method, body_params.
 * @return {Promise}
 */
export const makeRequest = (params) => {
  const { url, method, body, qs } = params
  console.log({ url, method, body, qs })
  let opts = {
    url: apiBaseUri + url,
    qs: qs || {},
    method: method || 'get',
    json: true,
    headers: {
      Authorization: `Bearer ${getEnvVar('TSHEETS_TOKEN')}`
    }
  }
  if (body && Object.keys(body).length) opts.json = { data: body }
  // TODO: See if this always works
  if (method === 'POST' && !body) {
    opts.json = { data: { 'on_the_clock': 'both' } }
  }
  if (url === 'sheets') {
    if (!opts.qs.start_date) opts.qs.start_date = defaultStartDate
    if (!opts.qs.end_date) opts.qs.end_date = today()
  }

  return new Promise((resolve, reject) => {
    request(opts, (err, res, json) => {
      if (err || res.body.error) return reject(err || res.body.error)
      if (res.statusCode >= 300) {
        return reject(new Error('Invalid response, statusCode=' + res.statusCode))
      }
      resolve(json)
    })
  })
}
