import { Router } from "express";
import { PatientController } from "./patient.controller";
import { authCheck } from "../../middleware/authCheck";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/update-my-profile",
  authCheck(Role.PATIENT),
  PatientController.updateMyProfile,
);

export const PatientRoutes = router;
