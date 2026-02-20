import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { createDoctorZodSchema } from "./user.validation";
import { UserController } from "./user.controller";



const router = Router();

router.post("/create-doctor",UserController.createDoctor);

export const UserRoutes = router;