import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authCheck } from "../../middleware/authCheck";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/register", AuthController.registerpatient);
router.post("/login", AuthController.loginUser);
router.get("/me", authCheck(Role.ADMIN, Role.DOCTOR, Role.PATIENT, Role.SUPER_ADMIN), AuthController.getMe);

export const AuthRoutes = router;
