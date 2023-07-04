import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = express.Router();

router.post(
    '/create-faculty',
    validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
    AcademicFacultyController.createAcademicFaculty
);

router.get('/:id', AcademicFacultyController.getSingleFaculty);

router.patch(
    '/:id',
    validateRequest(AcademicFacultyValidation.updateAcademicFacultyZodSchema),
    AcademicFacultyController.updateFaculty
);

router.delete('/:id', AcademicFacultyController.deleteFaculty);

router.get('/', AcademicFacultyController.getAllFaculty);

export const AcademicFacultyRoutes = router;
