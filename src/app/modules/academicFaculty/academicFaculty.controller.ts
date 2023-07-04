import { NextFunction, Request, Response } from 'express';
import { AcademicFacultyService } from './academicFaculty.service';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { pick } from '../../../shared/pick';
import { filters } from './academicFaculty.constants';
import {
    IAcademicFaculty,
    IAcademicFacultyFilters,
} from './academicFaculty.interface';
import { pagination } from '../../constants/pagination';

const createAcademicFaculty = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { ...faculty } = req.body;

        const result = await AcademicFacultyService.createAcademicFaculty(
            faculty
        );
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Faculty created  successfully',
            meta: null,
            data: result,
        });
        next();
    }
);
const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
    const filterOptions = pick(req.query, filters);
    const paginationOptions = pick(req.query, pagination);

    const result = await AcademicFacultyService.getAllFaculty(
        paginationOptions,
        filterOptions as IAcademicFacultyFilters
    );

    sendResponse<IAcademicFaculty[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculties retrived  successfully',
        meta: result?.meta || null,
        data: result?.data,
    });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await AcademicFacultyService.getSingleFaculty(id);

    sendResponse<IAcademicFaculty>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty retrived successfully',
        data: result,
    });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body as Partial<IAcademicFaculty>;

    const result = await AcademicFacultyService.updateFaculty(id, updatedData);

    sendResponse<IAcademicFaculty>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty updated successfully',
        data: result,
    });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await AcademicFacultyService.deleteFaculty(id);

    sendResponse<IAcademicFaculty>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty Deleted successfully',
        data: result,
    });
});

export const AcademicFacultyController = {
    createAcademicFaculty,
    getAllFaculty,
    getSingleFaculty,
    updateFaculty,
    deleteFaculty,
};
