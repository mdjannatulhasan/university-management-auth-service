import { Request, Response } from 'express';
import { StudentService } from './student.service';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { pick } from '../../../shared/pick';
import { IStudent, IStudentFilters } from './student.interface';
import { pagination } from '../../constants/pagination';
import { studentFilterableFields } from './student.constant';

const getAllStudent = catchAsync(async (req: Request, res: Response) => {
    const filterOptions = pick(req.query, studentFilterableFields);
    const paginationOptions = pick(req.query, pagination);

    const result = await StudentService.getAllStudent(
        paginationOptions,
        filterOptions as IStudentFilters
    );

    sendResponse<IStudent[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Students retrived successfully',
        meta: result?.meta || null,
        data: result?.data,
    });
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await StudentService.getSingleStudent(id);

    sendResponse<IStudent>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student retrived successfully',
        data: result,
    });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body as Partial<IStudent>;

    const result = await StudentService.updateStudent(id, updatedData);

    sendResponse<IStudent>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student updated successfully',
        data: result,
    });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await StudentService.deleteStudent(id);

    sendResponse<IStudent>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student Deleted successfully',
        data: result,
    });
});

export const StudentController = {
    getAllStudent,
    getSingleStudent,
    updateStudent,
    deleteStudent,
};
