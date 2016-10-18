const express = require('express')
const debug = require('debug')('app:server')
const webpack = require('webpack')
const webpackConfig = require('../build/webpack.config')
const config = require('../config')
const TSheets = require('tsheets-sdk')
const app = express()
const bodyParser = require('body-parser')
const paths = config.utils_paths
console.log('get report called:', TSheets)

const getCallTSheets = (req, res) => {
  if (!TSheets[req.params.resource]) {
    return res.status(400).send(`${req.params.resource} is not a resource. Check request.`)
  }
  if (!req.query) return res.status(400).send('Query parameters required to query TSheets')
  TSheets[req.params.resource].get(req.query)
      .then(response => res.json(response))
      .catch(error => res.status(error.code || 500).send(error.message))
}

const getReport = (req, res) => {
  if (!req.body) return res.status(400).send('Query parameters required to build TSheets report')
  TSheets.reports.getProjectReport(req.body)
    .then((apiRes) => res.json(apiRes))
    .catch((error) => res.status(error.code || 500).send(error.message))
}

const getPayrollReport = (req, res) => {
  if (!req.body) {
    return res.status(400).send('Query parameters required to build TSheets report')
  }
  TSheets.reports.getPayrollReport(req.body)
    .then((apiRes) => res.json(apiRes.payroll_report))
    .catch((error) => res.status(error.code || 500).send(error.message))
}
app.use(bodyParser.json()) // support json encoded bodies

// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement universal
// rendering, you'll want to remove this middleware.
app.get('/api/:resource', getCallTSheets)
app.post('/api/report', getReport)
app.post('/api/reports/payroll', getPayrollReport)
app.use(require('connect-history-api-fallback')())
app.use(express.static(paths.client('static')))

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (config.env === 'development') {
  const compiler = webpack(webpackConfig)

  debug('Enable webpack dev and HMR middleware')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: paths.client(),
    hot: true,
    quiet: config.compiler_quiet,
    noInfo: config.compiler_quiet,
    lazy: false,
    stats: config.compiler_stats
  }))
  app.use(require('webpack-hot-middleware')(compiler))

  // Serve static assets from ~/src/static since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
} else {
  debug(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(paths.dist()))
}

module.exports = app
