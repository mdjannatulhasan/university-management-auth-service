import { Schema, model } from 'mongoose';
import {
    IAcademicFaculty,
    AcademicFacultyModal,
} from './academicFaculty.interface';

const academicFacultyScema = new Schema<
    IAcademicFaculty,
    Record<string, unknown>
>(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModal>(
    'AcademicFaculty',
    academicFacultyScema
);
