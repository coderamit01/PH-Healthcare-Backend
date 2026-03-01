import { Router } from "express";
import { PatientController } from "./patient.controller";
import { authCheck } from "../../middleware/authCheck";
import { Role } from "../../../generated/prisma/enums";
import { multerUpload } from "../../config/multer.config";
import { updateMyPatientProfileMiddleware } from "./patient.middleware";

const router = Router();

router.post(
  "/update-my-profile",
  authCheck(Role.PATIENT),
   multerUpload.fields([
        { name : "profilePhoto", maxCount : 1},
        { name : "medicalReports", maxCount : 5}
    ]),
    updateMyPatientProfileMiddleware,
  PatientController.updateMyProfile,
);

export const PatientRoutes = router;
