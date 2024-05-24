// Express TS
import http from 'http'
import express from 'express'
// logger
import logger from './_shared/helpers/Logger'

import addAppOptions from './ApiOptions'

// Express app

const app = express()
addAppOptions(app, '', '')

// Connect to DB

// Trace warnigns
process.on('warning', (e: Error) => logger.warning(e.stack))

// Launch the app
const server = http.createServer(app)
server.listen(3001, 3001, () => {
    logger.log('ok', `localhost running on port: 3001`)
    logger.log('ok', `develop, NODE ENVIRONMENT: develop`)
    logger.log('ok', `Try it on http://localhost:3001`)
})
