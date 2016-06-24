import { getSheets, makeRequest as tSheetsRequest } from './utils/tsheets'
// import GDrive from './utils/gdrive'

export default (app) => {
  app.use('/api/sheets', (req, res) => {
    // TODO: Use query params to query tsheets
    tSheetsRequest({ endpoint: '/timesheets', method: 'get' })
      .then((apiRes) => res.json(apiRes))
      .catch((error) => {
        console.log('error:', error)
        res.status(500).json(error || { message: 'error getting sheets'})
      })
  })
  app.use('/api/test', (req, res) => {
    // TODO: Use query params to query tsheets
    // console.log('body:', req.body)
    console.log('method:', req.method)
    console.log('url:', req.url)
    const { body, method } = req
    tSheetsRequest({ endpoint: '/jobcodes', method, body })
      .then((apiRes) => res.json(apiRes.results || apiRes))
      .catch((error) => res.status(500).json(error))
  })
}
