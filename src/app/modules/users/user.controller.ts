import { RequestHandler } from 'express';
import { UserService } from './users.service';

const createStudent: RequestHandler = async (req, res, next) => {
    try {
        const { student, ...userData } = req.body;

        const result = await UserService.createStudent(student, userData);
        res.status(200).json({
            success: true,
            message: 'User created  successfully',
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

export const UserController = { createStudent };
