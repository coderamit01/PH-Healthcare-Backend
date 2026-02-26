import { Router } from "express";
import { DoctorScheduleController } from "./doctorSchedule.controller";
import { authCheck } from "../../middleware/authCheck";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/create-my-doctor-schedule",
  authCheck(Role.DOCTOR),
  DoctorScheduleController.createDoctorSchedule,
);
router.get(
  "/my-doctor-schedule",
  authCheck(Role.DOCTOR),
  DoctorScheduleController.getMyDoctorSchedule,
);

router.get(
  "/",
  authCheck(Role.ADMIN, Role.SUPER_ADMIN),
  DoctorScheduleController.getAllDoctorSchedules,
);

router.get(
  "/:doctorId/schedule/:scheduleId",
  authCheck(Role.ADMIN, Role.SUPER_ADMIN),
  DoctorScheduleController.getDoctorScheduleById,
);

router.put(
  "/update-my-doctor-schedule/:id",
  authCheck(Role.DOCTOR),
  DoctorScheduleController.updateMyDoctorSchedule,
);

router.delete(
  "/delete-my-doctor-schedule/:id",
  authCheck(Role.DOCTOR),
  DoctorScheduleController.deleteMyDoctorSchedule,
);

export const DoctorScheduleRoutes = router;
