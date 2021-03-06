// @flow

import compression from 'compression'
import express from 'express'

import routing from './routing'
import { APP_NAME, STATIC_PATH, WEB_PORT } from '../shared/config'
import { isProd } from '../shared/util'
import renderApp from './render-app'
import { helloEndpointRoute } from '../shared/routes'

const app = express()
// gzip compression middleware
app.use(compression())
// dist -> /static   public -> /static
app.use(STATIC_PATH, express.static('dist'))
app.use(STATIC_PATH, express.static('public'))

routing(app)

app.get('/', (req, res) => {
  res.send(renderApp(APP_NAME))
})

app.get(helloEndpointRoute(), (req, res) => {
  res.json({ serverMessage: `Hello from the server! (received ${req.params.num})` })
})

app.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' :
  '(development).\nKeep "yarn dev:wds" running in an other terminal'}.`)
})
