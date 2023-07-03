import { AcademicSemester } from './academicSemester.model';
import { IAcademicSemester } from './academicSemester.interface';
// import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { academicSemesterTitleCodeMapper } from './academicSemester.constants';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../interfaces/pagination';
import { IGenericResponse } from '../../interfaces/common';

const createAcademicSemester = async (
    academicSemester: IAcademicSemester
): Promise<IAcademicSemester | null> => {
    if (
        academicSemesterTitleCodeMapper[academicSemester.title] !==
        academicSemester.code
    ) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invaid Semester Code');
    }

    const createdAcademicSemester = AcademicSemester.create(academicSemester);
    if (!createAcademicSemester) {
        throw new ApiError(400, 'Failed to create academicSemester');
    }

    return createdAcademicSemester;
};

const getAllSemester = async (
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]> | null> => {
    const { page = 1, limit = 10 } = paginationOptions;

    const skip = (page - 1) * limit;

    const result = await AcademicSemester.find().skip(skip).limit(limit);

    const total = await AcademicSemester.countDocuments();

    return {
        data: result,
        meta: {
            page: Number(page),
            limit: Number(limit),
            total,
        },
    };
};

export const AcademicSemesterService = {
    createAcademicSemester,
    getAllSemester,
};
