import express from 'express';
import { Role } from '../../../generated/prisma/enums';
import { ReviewController } from './review.controller';
import { authCheck } from '../../middleware/authCheck';

const router = express.Router();

router.get('/', ReviewController.getAllReviews);

router.post(
    '/',
    authCheck(Role.PATIENT),
    ReviewController.giveReview
);

router.get('/my-reviews', authCheck(Role.PATIENT, Role.DOCTOR), ReviewController.myReviews);

router.patch('/:id', authCheck(Role.PATIENT), ReviewController.updateReview);

router.delete('/:id', authCheck(Role.PATIENT), ReviewController.deleteReview);




export const ReviewRoutes = router;