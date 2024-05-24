/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import path from 'path'
import { fileURLToPath } from 'url'
import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import express, { Express } from 'express'
import routes from './routes'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const addAppOptions = (app: Express, clientDomain: string, cookie: typeof GlobalConfigType.cookie) => {
    app.set('trust proxy', true)
    // serve static files
    app.use(express.static(path.join(__dirname, '../public')))
    // Enable CORS for Web development
    // TODO: cp - Move cors on debug & in a different config file
    const corsOptions = {
        origin: clientDomain,
        optionsSuccessStatus: 200, // global.Config.client_domain
    }
    app.use(
        cors({
            origin: '*',
        })
    )
    app.options('*', cors(corsOptions))
    app.use(bodyParser.json({ limit: '10mb' }))
    app.use(bodyParser.urlencoded({ extended: true }))
    // Cookie and Session

    app.use(compression())
    // Static paths to be served directly

    app.use('/', routes)

    // app.use(invalidPathHandler)
    // app.use(errorDB)
    // app.use(errorLogger)
    // app.use(errorResponder)
}

export default addAppOptions
