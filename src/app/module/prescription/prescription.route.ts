import express from 'express';
import { Role } from '../../../generated/prisma/enums';
import { PrescriptionController } from './prescription.controller';
import { authCheck } from '../../middleware/authCheck';

const router = express.Router();

router.get(
    '/',
    authCheck(Role.SUPER_ADMIN, Role.ADMIN),
    PrescriptionController.getAllPrescriptions
);

router.get(
    '/my-prescriptions',
    authCheck(Role.PATIENT, Role.DOCTOR),
    PrescriptionController.myPrescriptions
)

router.post(
    '/',
    authCheck(Role.DOCTOR),
    PrescriptionController.givePrescription
)

router.patch(
    '/:id',
    authCheck(Role.DOCTOR),
    PrescriptionController.updatePrescription
)

router.delete(
    '/:id',
    authCheck(Role.DOCTOR),
    PrescriptionController.deletePrescription
)


export const PrescriptionRoutes = router;