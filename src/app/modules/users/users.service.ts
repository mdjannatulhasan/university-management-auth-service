import { User } from './users.model'
import { IUser } from './users.interface'

const createUser = async (user: IUser): Promise<IUser | null> => {
    const createdUser = User.create(user)
    if (!createUser) {
        throw new Error('Failed to create user')
    }
    return createdUser
}

export default { createUser }
