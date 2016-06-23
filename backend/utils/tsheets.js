import TSheets from 'tsheets-client'

export const getSheets = () => {
  console.log('tsheets:', TSheets)
  const api_token = process.env.TSHEETS_TOKEN
  const start_date = '2015-01-01'
  const end_date = '2016-01-01'
  return new Promise((resolve, reject) => {
    TSheets.getTimesheets({ api_token, start_date, end_date }, (err, sheets) => {
      if (err) return reject(err)
      resolve(sheets)
    })
  })
}
