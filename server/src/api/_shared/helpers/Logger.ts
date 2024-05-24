// TODO: cp - check this
/* eslint-disable import/no-duplicates */
import fs from 'fs'
import winston from 'winston'
import pkg from 'winston'
import 'winston-daily-rotate-file'
import parsedEnvConfig from './EnvParser'

const { format } = pkg

const LOG_DIR = parsedEnvConfig.LOG_DIR || 'logs'

// Create logs directory if it does not exist
if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR)
}
const logLevels = {
    levels: {
        ok: 1,
        error: 2,
        warning: 3,
        info: 4,
    },
    colors: {
        ok: 'bold green',
        error: 'red',
        warning: 'yellow',
        info: 'cyan',
    },
}
const logConfiguration = {
    levels: logLevels.levels,
    format: format.combine(format.colorize()),
    transports: [
        new winston.transports.Console({
            format: format.combine(
                format.colorize({ all: true }),
                format.simple(),
                format.timestamp({
                    format: 'DD-MMM-YYYY HH:mm:ss',
                }),
                format.printf(
                    (logger) =>
                        `${[logger.level]} - ${logger.timestamp}: ${
                            typeof logger.message === 'string'
                                ? logger.message
                                : `Object returned : ${JSON.stringify(logger.message, null, '\t')}`
                        }`
                )
            ),
        }),
        new winston.transports.DailyRotateFile({
            format: format.combine(
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                format.json(),
                format.prettyPrint(),
                format.printf(
                    (info) =>
                        `${info.level} - ${[info.timestamp]}: ${
                            typeof info.message === 'string' ? `${info.message}` : `Object returned : ${info.message}`
                        }`
                ),
                format.uncolorize()
            ),
            maxFiles: '14d',
            dirname: LOG_DIR,
            filename: '%DATE%-log.log',
        }),
    ],
}
winston.addColors(logLevels.colors)
const logger = winston.createLogger(logConfiguration)

export default logger
/* Possible options are below.

Font styles: bold, dim, italic, underline, inverse, hidden, strikethrough.

Font foreground colors: black, red, green, yellow, blue, magenta,
cyan, white, gray, grey.

Background colors: blackBG, redBG, greenBG, yellowBG, blueBG
magentaBG, cyanBG, whiteBG */
