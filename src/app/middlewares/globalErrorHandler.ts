import { NextFunction, Request, Response } from 'express'
import { IGenericErrorMessage } from '../interfaces/error'
import config from '../../config'

const globalErrorHandler = (
    err: { stack: unknown },
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = 500
    const message = 'Something went wrong'
    const errorMessages: IGenericErrorMessage[] = []

    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        // eslint-disable-next-line no-undefined
        stack: config.env !== 'development' ? err?.stack : undefined,
    })
    next()
}
export default globalErrorHandler
