import Koa from 'koa'
import convert from 'koa-convert'
import route from 'koa-route'
import webpack from 'webpack'
import webpackConfig from '../build/webpack.config'
import historyApiFallback from 'koa-connect-history-api-fallback'
import serve from 'koa-static'
import proxy from 'koa-proxy'
import _debug from 'debug'
import config from '../config'
import webpackDevMiddleware from './middleware/webpack-dev'
import webpackHMRMiddleware from './middleware/webpack-hmr'
import * as TSheets from 'tsheets-sdk'
import json from 'koa-json'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'

const debug = _debug('app:server')
const paths = config.utils_paths
const app = new Koa()
app.use(json())
app.use(logger())
app.use(bodyParser())

app.use(route.get('/api/:resource', getCallTSheets))
app.use(route.post('/api/report', getReport))

function *getCallTSheets (resource) {
  if (!TSheets[resource]) return this.throw(`${resource} is not a resource. Check request.`, 404)
  if (!this.query) return this.throw('Query parameters required to query TSheets', 400)
  yield TSheets[resource].get(this.query)
    .then((res) => this.body = res)
    .catch((error) => this.throw(error.message, error.code))
}
// Enable koa-proxy if it has been enabled in the config.
if (config.proxy && config.proxy.enabled) {
  app.use(convert(proxy(config.proxy.options)))
}

function *getReport () {
  if (!this.request.body) return this.throw('Query parameters required to build TSheets report', 400)
  yield TSheets.reports.getProjectReport(this.request.body)
    .then((apiRes) => this.body = apiRes)
    .catch((error) => this.throw(error.message, error.code))
}

// Enable koa-proxy if it has been enabled in the config.
if (config.proxy && config.proxy.enabled) {
  app.use(convert(proxy(config.proxy.options)))
}

// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement isomorphic
// rendering, you'll want to remove this middleware.
app.use(convert(historyApiFallback({
  verbose: false
})))

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (config.env === 'development') {
  const compiler = webpack(webpackConfig)

  // Enable webpack-dev and webpack-hot middleware
  const { publicPath } = webpackConfig.output

  app.use(webpackDevMiddleware(compiler, publicPath))
  app.use(webpackHMRMiddleware(compiler))

  // Serve static assets from ~/src/static since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(serve(paths.client('static')))
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
  app.use(serve(paths.dist()))
}

export default app
