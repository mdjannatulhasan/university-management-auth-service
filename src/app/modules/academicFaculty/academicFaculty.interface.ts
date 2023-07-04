import { Model } from 'mongoose';

export type IAcademicFaculty = {
    title: string;
};

export type AcademicFacultyModal = Model<IAcademicFaculty, object>;

export type IAcademicFacultyFilters = {
    searchTerm?: string;
};
