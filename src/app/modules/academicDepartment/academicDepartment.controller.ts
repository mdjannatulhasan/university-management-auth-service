import { NextFunction, Request, Response } from 'express';
import { AcademicDepartmentService } from './academicDepartment.service';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { pick } from '../../../shared/pick';
import { filters } from './academicDepartment.constants';
import {
    IAcademicDepartment,
    IAcademicDepartmentFilters,
} from './academicDepartment.interface';
import { pagination } from '../../constants/pagination';

const createAcademicDepartment = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { ...faculty } = req.body;

        const result = await AcademicDepartmentService.createAcademicDepartment(
            faculty
        );
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Department created  successfully',
            meta: null,
            data: result,
        });
        next();
    }
);
const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
    const filterOptions = pick(req.query, filters);
    const paginationOptions = pick(req.query, pagination);

    const result = await AcademicDepartmentService.getAllDepartment(
        paginationOptions,
        filterOptions as IAcademicDepartmentFilters
    );

    sendResponse<IAcademicDepartment[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculties retrived  successfully',
        meta: result?.meta || null,
        data: result?.data,
    });
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await AcademicDepartmentService.getSingleDepartment(id);

    sendResponse<IAcademicDepartment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Department retrived successfully',
        data: result,
    });
});

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body as Partial<IAcademicDepartment>;

    const result = await AcademicDepartmentService.updateDepartment(
        id,
        updatedData
    );

    sendResponse<IAcademicDepartment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Department updated successfully',
        data: result,
    });
});

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await AcademicDepartmentService.deleteDepartment(id);

    sendResponse<IAcademicDepartment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Department Deleted successfully',
        data: result,
    });
});

export const AcademicDepartmentController = {
    createAcademicDepartment,
    getAllDepartment,
    getSingleDepartment,
    updateDepartment,
    deleteDepartment,
};
