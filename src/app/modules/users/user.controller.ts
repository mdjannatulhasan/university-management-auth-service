import { Request, Response } from 'express'
import usersService from './users.service'

const createUser = async (req: Request, res: Response) => {
    try {
        const { user } = req.body
        console.log(user)

        const result = await usersService.createUser(user)
        res.status(200).json({
            success: true,
            message: 'User created  successfully',
            data: result,
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Failed to create user',
        })
    }
}

export default { createUser }
