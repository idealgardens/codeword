import { getSheets } from './utils/tsheets'
// import GDrive from './utils/gdrive'

export default (app) => {
  app.use('/api/sheets', (req, res) => {
    getSheets()
      .then((sheets) => res.json(sheets))
      .catch((error) => res.status(500).send(error))
  })
}
