import compression from 'compression'
import express from 'express'
import { Server } from 'http'
import socketIO from 'socket.io'

import routing from './routing'
import { STATIC_PATH, WEB_PORT } from '../shared/config'
import { isProd } from '../shared/util'
import setUpSocket from './socket'

const app = express()

//Server from http to listen to incomming requests.
const http = Server(app)
const io = socketIO(http)
//Websocket details in setUpSocket
setUpSocket(io)

//compression middleware activate Gzip compression on the server
app.use(compression())
app.use(STATIC_PATH, express.static('dist'))
app.use(STATIC_PATH, express.static('public'))

routing(app)

app.listen(WEB_PORT, () => {
    console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' : '(development).\nKeep "yarn dev:wds" running in an other terminal'}.`)
})
