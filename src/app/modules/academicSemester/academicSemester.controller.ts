import { NextFunction, Request, Response } from 'express';
import { logger } from '../../../shared/logger';
import { AcademicSemesterService } from './academicSemester.service';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { pick } from '../../../shared/pick';
import { pagination } from './academicSemester.constants';
import { IAcademicSemester } from './academicSemester.interface';

const createAcademicSemester = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { ...semester } = req.body;
        logger.info(semester);

        const result = await AcademicSemesterService.createAcademicSemester(
            semester
        );
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Semester created  successfully',
            meta: null,
            data: result,
        });
        next();
    }
);
const getAllSemester = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const paginationOptions = pick(req.query, pagination);

        const result = await AcademicSemesterService.getAllSemester(
            paginationOptions
        );

        sendResponse<IAcademicSemester[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Semesters retrived  successfully',
            meta: result?.meta || null,
            data: result?.data,
        });
        next();
    }
);
export const AcademicSemesterController = {
    createAcademicSemester,
    getAllSemester,
};
