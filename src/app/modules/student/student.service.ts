import { Student } from './student.model';
import { IStudent, IStudentFilters } from './student.interface';
import { IPaginationOptions } from '../../interfaces/pagination';
import { IGenericResponse } from '../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';
import { studentSearchableFields } from './student.constant';

const getAllStudent = async (
    paginationOptions: IPaginationOptions,
    filters: IStudentFilters
): Promise<IGenericResponse<IStudent[]> | null> => {
    const { searchTerm, ...filtersData } = filters;

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            $or: studentSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }

    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }

    const { skip, page, limit, sortBy, sortOrder } =
        paginationHelpers.calculatePagination(paginationOptions);

    const sortConditions: { [key: string]: SortOrder } = {};

    if (sortBy && sortConditions) {
        sortConditions[sortBy] = sortOrder;
    }

    const conditions = andConditions.length > 0 ? { $and: andConditions } : {};

    const result = await Student.find(conditions)
        .populate('academicSemester')
        .populate('academicFaculty')
        .populate('academicDepartment')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await Student.countDocuments(conditions);

    return {
        data: result,
        meta: {
            page: Number(page),
            limit: Number(limit),
            total,
        },
    };
};

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
    const result = await Student.findById(id)
        .populate('academicSemester')
        .populate('academicFaculty')
        .populate('academicDepartment');

    return result;
};

const updateStudent = async (
    id: string,
    payload: Partial<IStudent>
): Promise<IStudent | null> => {
    const result = await Student.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });

    return result;
};

const deleteStudent = async (id: string): Promise<IStudent | null> => {
    const result = await Student.findByIdAndDelete(id)
        .populate('academicSemester')
        .populate('academicFaculty')
        .populate('academicDepartment');

    return result;
};

export const StudentService = {
    getAllStudent,
    getSingleStudent,
    updateStudent,
    deleteStudent,
};
