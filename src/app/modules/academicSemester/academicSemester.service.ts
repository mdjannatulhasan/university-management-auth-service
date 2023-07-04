import { AcademicSemester } from './academicSemester.model';
import {
    IAcademicSemester,
    IAcademicSemesterFilters,
} from './academicSemester.interface';
// import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import {
    academicSemesterSearchableFields,
    academicSemesterTitleCodeMapper,
} from './academicSemester.constants';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../interfaces/pagination';
import { IGenericResponse } from '../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';

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
    paginationOptions: IPaginationOptions,
    filters: IAcademicSemesterFilters
): Promise<IGenericResponse<IAcademicSemester[]> | null> => {
    const { searchTerm, ...filtersData } = filters;

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            $or: academicSemesterSearchableFields.map(field => {
                if (field !== 'year') {
                    return {
                        [field]: {
                            $regex: searchTerm,
                            $options: 'i',
                        },
                    };
                } else {
                    return {
                        [field]: {
                            $eq: parseInt(searchTerm),
                        },
                    };
                }
            }),
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

    const result = await AcademicSemester.find(conditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

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

const getSingleSemester = async (
    id: string
): Promise<IAcademicSemester | null> => {
    const result = await AcademicSemester.findById(id);

    return result;
};

const updateSemester = async (
    id: string,
    payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
    if (
        payload.title &&
        payload.code &&
        academicSemesterTitleCodeMapper[payload.title] !== payload.code
    ) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invaid Semester Code');
    }

    const result = await AcademicSemester.findOneAndUpdate(
        { _id: id },
        payload,
        { new: true }
    );

    return result;
};

const deleteSemester = async (
    id: string
): Promise<IAcademicSemester | null> => {
    const result = await AcademicSemester.findByIdAndDelete(id);

    return result;
};

export const AcademicSemesterService = {
    createAcademicSemester,
    getAllSemester,
    getSingleSemester,
    updateSemester,
    deleteSemester,
};
