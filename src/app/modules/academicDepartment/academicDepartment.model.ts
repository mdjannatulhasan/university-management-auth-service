import { Schema, model } from 'mongoose';
import {
    IAcademicDepartment,
    AcademicDepartmentModal,
} from './academicDepartment.interface';

const academicDepartmentScema = new Schema<
    IAcademicDepartment,
    Record<string, unknown>
>(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        academicFaculty: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicFaculty',
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    }
);

export const AcademicDepartment = model<
    IAcademicDepartment,
    AcademicDepartmentModal
>('AcademicDepartment', academicDepartmentScema);
