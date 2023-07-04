/* eslint-disable no-undefined */
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './users.model';

export const findLastStudentId = async () => {
    const lastStudent = await User.findOne(
        { role: 'student' },
        { id: 1, _id: 0 }
    )
        .sort({
            createdAt: -1,
        })
        .lean();
    return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};

export const generatedStudentId = async (
    academicSemester: IAcademicSemester
) => {
    const currentId = (await findLastStudentId()) || (0).toString();
    let incId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incId = `${academicSemester.year.toString().substring(2)}${
        academicSemester.code
    }${incId}`;

    return incId;
};

export const findLastFacultyId = async () => {
    const lastFaculty = await User.findOne(
        { role: 'faculty' },
        { id: 1, _id: 0 }
    )
        .sort({
            createdAt: -1,
        })
        .lean();
    return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generatedFacultyId = async () => {
    const currentId = (await findLastStudentId()) || (0).toString();
    let incId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incId = `F-${incId}`;

    return incId;
};
