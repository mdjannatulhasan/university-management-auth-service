import { Schema, model } from 'mongoose';
import {
    IAcademicSemester,
    AcademicSemesterModal,
} from './academicSemester.interface';
import {
    academicSemesterCodes,
    academicSemesterMonths,
    academicSemesterTitles,
} from './academicSemester.constants';

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

const academicSemesterScema = new Schema<
    IAcademicSemester,
    Record<string, unknown>
>(
    {
        title: {
            type: String,
            required: true,
            enum: academicSemesterTitles,
        },
        year: {
            type: Number,
            required: true,
        },
        code: {
            type: String,
            required: true,
            enum: academicSemesterCodes,
        },
        startMonth: {
            type: String,
            required: true,
            enum: academicSemesterMonths,
        },
        endMonth: {
            type: String,
            required: true,
            enum: academicSemesterMonths,
        },
    },
    {
        timestamps: true,
    }
);
academicSemesterScema.pre('save', async function (next) {
    const isExists = await AcademicSemester.findOne({
        title: this.title,
        year: this.year,
    });
    if (isExists) {
        throw new ApiError(
            httpStatus.CONFLICT,
            'Academic Semester is already exists!'
        );
    }
    next();
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModal>(
    'AcademicSemester',
    academicSemesterScema
);
