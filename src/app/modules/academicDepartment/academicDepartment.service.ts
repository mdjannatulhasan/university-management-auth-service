import { AcademicDepartment } from './academicDepartment.model';
import {
    IAcademicDepartment,
    IAcademicDepartmentFilters,
} from './academicDepartment.interface';
import ApiError from '../../../errors/ApiError';
import { IPaginationOptions } from '../../interfaces/pagination';
import { IGenericResponse } from '../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';
import { academicDepartmentSearchableFields } from './academicDepartment.constants';

const createAcademicDepartment = async (
    academicDepartment: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
    const createdAcademicDepartment =
        AcademicDepartment.create(academicDepartment);
    if (!createAcademicDepartment) {
        throw new ApiError(400, 'Failed to create academicDepartment');
    }

    return createdAcademicDepartment;
};

const getAllDepartment = async (
    paginationOptions: IPaginationOptions,
    filters: IAcademicDepartmentFilters
): Promise<IGenericResponse<IAcademicDepartment[]> | null> => {
    const { searchTerm, ...filtersData } = filters;

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            $or: academicDepartmentSearchableFields.map(field => ({
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

    const result = await AcademicDepartment.find(conditions)
        .populate('academicFaculty')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await AcademicDepartment.countDocuments();

    return {
        data: result,
        meta: {
            page: Number(page),
            limit: Number(limit),
            total,
        },
    };
};

const getSingleDepartment = async (
    id: string
): Promise<IAcademicDepartment | null> => {
    const result = await AcademicDepartment.findById(id);

    return result;
};

const updateDepartment = async (
    id: string,
    payload: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {
    const result = await AcademicDepartment.findOneAndUpdate(
        { _id: id },
        payload,
        { new: true }
    );

    return result;
};

const deleteDepartment = async (
    id: string
): Promise<IAcademicDepartment | null> => {
    const result = await AcademicDepartment.findByIdAndDelete(id);

    return result;
};

export const AcademicDepartmentService = {
    createAcademicDepartment,
    getAllDepartment,
    getSingleDepartment,
    updateDepartment,
    deleteDepartment,
};
