import { User } from './users.model';
import { IUser } from './users.interface';
import config from '../../../config';
import { generatedUserId } from './users.utils';
import ApiError from '../../../errors/ApiError';

const createUser = async (user: IUser): Promise<IUser | null> => {
    const id = await generatedUserId();

    user.id = id;

    if (!user.password) {
        user.password = config.default_user_pass as string;
    }

    const createdUser = User.create(user);
    if (!createUser) {
        throw new ApiError(400, 'Failed to create user');
    }
    return createdUser;
};

export const UserService = { createUser };
