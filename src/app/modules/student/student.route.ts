import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidation } from './student.validation';
import { StudentController } from './student.controller';

const router = express.Router();

router.get('/:id', StudentController.getSingleStudent);

router.patch(
    '/:id',
    validateRequest(StudentValidation.updateStudentZodSchema),
    StudentController.updateStudent
);

router.delete('/:id', StudentController.deleteStudent);

router.get('/', StudentController.getAllStudent);

export const StudentRoutes = router;
