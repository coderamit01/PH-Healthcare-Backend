import express from 'express';
import { Role } from '../../../generated/prisma/browser';
import { authCheck } from '../../middleware/authCheck';
import { StatsController } from './stats.controller';

const router = express.Router();

router.get(
    '/',
    authCheck(Role.SUPER_ADMIN, Role.ADMIN, Role.DOCTOR, Role.PATIENT),
    StatsController.getDashboardStatsData
)


export const StatsRoutes = router;