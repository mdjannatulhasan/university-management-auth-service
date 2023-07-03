import { Request, Response, NextFunction, RequestHandler } from 'express';

export const catchAsync =
    (fn: RequestHandler) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next);
        } catch (err) {
            next(err);
        }
    };
