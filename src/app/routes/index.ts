import { Router } from "express";
import { SpecialtyRoutes } from "../models/specialty/specialty.route";

const router = Router();

router.use('/specialties', SpecialtyRoutes)

export const IndexRoutes = router;