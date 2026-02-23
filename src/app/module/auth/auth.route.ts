import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authCheck } from "../../middleware/authCheck";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/register", AuthController.registerpatient);
router.post("/login", AuthController.loginUser);
router.get(
  "/me",
  authCheck(Role.ADMIN, Role.DOCTOR, Role.PATIENT, Role.SUPER_ADMIN),
  AuthController.getMe,
);
router.post("/refresh-token", AuthController.getNewToken);
router.post(
  "/change-password",
  authCheck(Role.ADMIN, Role.DOCTOR, Role.PATIENT, Role.SUPER_ADMIN),
  AuthController.changePassword,
);
router.post(
  "/logout",
  authCheck(Role.ADMIN, Role.DOCTOR, Role.PATIENT, Role.SUPER_ADMIN),
  AuthController.logoutUser,
);
router.post(
  "/verify-email",
  authCheck(Role.ADMIN, Role.DOCTOR, Role.PATIENT, Role.SUPER_ADMIN),
  AuthController.verifyEmail,
);

export const AuthRoutes = router;
