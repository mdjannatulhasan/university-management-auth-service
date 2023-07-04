import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './users.interface';
import { generatedStudentId } from './users.utils';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './users.model';

const createStudent = async (
    student: IStudent,
    user: IUser
): Promise<IUser | null> => {
    if (!user.password) {
        user.password = config.default_student_pass as string;
    }
    user.role = 'student';

    const academicsemester = await AcademicSemester.findById(
        student.academicSemester
    );

    let newUserAllData = null;
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const id = await generatedStudentId(
            academicsemester as IAcademicSemester
        );
        user.id = id;
        student.id = id;

        const newStudent = await Student.create([student], { session });

        if (!newStudent.length) {
            throw new ApiError(
                httpStatus.BAD_REQUEST,
                'Failed to create student'
            );
        }

        user.student = newStudent[0]._id;

        const newUser = await User.create([user], { session });

        if (!newUser.length) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
        }
        newUserAllData = newUser[0];

        await session.commitTransaction();
        await session.endSession();
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error;
    }

    if (newUserAllData) {
        newUserAllData = await User.findOne({ id: newUserAllData.id }).populate(
            {
                path: 'student',
                populate: [
                    {
                        path: 'academicSemester',
                    },
                    {
                        path: 'academicDepartment',
                    },
                    {
                        path: 'academicFaculty',
                    },
                ],
            }
        );
    }

    return newUserAllData;
};

export const UserService = {
    createStudent,
};
