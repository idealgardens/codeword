import { getSheets, makeRequest as tSheetsRequest } from './utils/tsheets'
// import GDrive from './utils/gdrive'

export default (app) => {
  // app.use('/api/sheets', (req, res) => {
  //   // TODO: Use query params to query tsheets
  //   tSheetsRequest({ endpoint: '/timesheets', method: 'get' })
  //     .then((apiRes) => res.json(apiRes))
  //     .catch((error) => {
  //       console.log('error:', error)
  //       res.status(500).json(error || { message: 'error getting sheets'})
  //     })
  // })
  app.use('/api', ({ body, method, url }, res) => {
    // TODO: Use query params to query tsheets
    tSheetsRequest({ url, method, body })
      .then((apiRes) => res.json(apiRes.results || apiRes))
      .catch((error) => res.status(500).json(error))
  })
}
