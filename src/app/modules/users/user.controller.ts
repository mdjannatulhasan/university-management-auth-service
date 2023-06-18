import { RequestHandler } from 'express';
import { logger } from '../../../shared/logger';
import { UserService } from './users.service';

const createUser: RequestHandler = async (req, res, next) => {
    try {
        const { user } = req.body;
        logger.info(user);

        const result = await UserService.createUser(user);
        res.status(200).json({
            success: true,
            message: 'User created  successfully',
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

export const UserController = { createUser };
