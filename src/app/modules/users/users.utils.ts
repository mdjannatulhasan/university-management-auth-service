import { User } from './users.model';

export const findLastUserId = async () => {
    const lastUser = await User.findOne({}, { id: 1, _id: 0 })
        .sort({
            createdAt: -1,
        })
        .lean();
    return lastUser?.id;
};

export const generatedUserId = async () => {
    const currentId = (await findLastUserId()) || (0).toString();
    const incId = parseInt(currentId) + 1;
    return incId.toString().padStart(5, '0');
};
