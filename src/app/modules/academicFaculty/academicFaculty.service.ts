import { AcademicFaculty } from './academicFaculty.model';
import {
    IAcademicFaculty,
    IAcademicFacultyFilters,
} from './academicFaculty.interface';
import ApiError from '../../../errors/ApiError';
import { IPaginationOptions } from '../../interfaces/pagination';
import { IGenericResponse } from '../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';
import { academicFacultySearchableFields } from './academicFaculty.constants';

const createAcademicFaculty = async (
    academicFaculty: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
    const createdAcademicFaculty = AcademicFaculty.create(academicFaculty);
    if (!createAcademicFaculty) {
        throw new ApiError(400, 'Failed to create academicFaculty');
    }

    return createdAcademicFaculty;
};

const getAllFaculty = async (
    paginationOptions: IPaginationOptions,
    filters: IAcademicFacultyFilters
): Promise<IGenericResponse<IAcademicFaculty[]> | null> => {
    const { searchTerm, ...filtersData } = filters;

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            $or: academicFacultySearchableFields.map(field => ({
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

    const result = await AcademicFaculty.find(conditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await AcademicFaculty.countDocuments();

    return {
        data: result,
        meta: {
            page: Number(page),
            limit: Number(limit),
            total,
        },
    };
};

const getSingleFaculty = async (
    id: string
): Promise<IAcademicFaculty | null> => {
    const result = await AcademicFaculty.findById(id);

    return result;
};

const updateFaculty = async (
    id: string,
    payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
    const result = await AcademicFaculty.findOneAndUpdate(
        { _id: id },
        payload,
        { new: true }
    );

    return result;
};

const deleteFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
    const result = await AcademicFaculty.findByIdAndDelete(id);

    return result;
};

export const AcademicFacultyService = {
    createAcademicFaculty,
    getAllFaculty,
    getSingleFaculty,
    updateFaculty,
    deleteFaculty,
};
