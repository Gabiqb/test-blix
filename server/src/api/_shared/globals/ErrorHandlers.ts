// eslint-disable-next-line max-classes-per-file
import { Request, Response, NextFunction } from 'express'
import { MongoServerError } from 'mongodb'
import logger from '../helpers/Logger'
import { getLanguageForRequest, getTranslation } from '../helpers/LangHelpers'

export class ApiError extends Error {
    code: number

    status: number

    constructor(code: number, message: string) {
        super(message)
        Object.setPrototypeOf(this, new.target.prototype)
        this.name = Error.name
        this.status = code
        this.code = code
        Error.captureStackTrace(this)
    }
}

export class FileError extends ApiError {
    constructor() {
        super(404, 'File not found')
    }
}

export interface DBError extends Error {
    code: number
}

// Error handling Middleware function for logging the error message
export const errorLogger = (error: ApiError, request: Request, _: Response, next: NextFunction) => {
    logger.error(`${request.method || ''} ${request.originalUrl} ${error.status || ''} - ${error.message}`)
    next(error) // calling next middleware
}

export const errorDB = (error: any, request: Request, _: Response, next: NextFunction) => {
    const language = getLanguageForRequest(request)
    if (error.name === 'MongoServerError') {
        if (error.code === 11000) {
            const collection = request.url.split('/v1/')[1].split('/')[0]
            let message = getTranslation(language, 'duplicate_error', {
                object: collection,
                key_value: JSON.stringify(error.keyValue),
            })
            // handle the compund key cases (for club locations and teams)
            if (message.includes('clubId')) {
                message = `${message.split(',"clubId')[0]}} already exists in this club`
            }
            next(new ApiError(409, message))
        }
    }
    next(error)
}

// Error handling Middleware function reads the error message
// and sends back a response in JSON format
/** 
   @note MANDATORY - The callback must be exactly the same as the default one (err,req,res,next) in order to override the default error handler callback
*/
export const errorResponder = (error: ApiError, _: Request, response: Response, next: NextFunction) => {
    response.header('Content-Type', 'application/json')

    const status = error.status || 400
    response.status(status).json({ error: true, message: error.message })
}

// Fallback Middleware function for returning
// 404 error for undefined paths
export const invalidPathHandler = (request: Request, response: Response) => {
    logger.error(`${request.method || ''} ${request.originalUrl} 404 - Invalid path`)
    response.status(404).json({ error: true, message: 'Invalid path' })
}
