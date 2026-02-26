import { Router } from "express";
import { ScheduleController } from "./schedule.controller";
import { authCheck } from "../../middleware/authCheck";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/",
  authCheck(Role.ADMIN, Role.SUPER_ADMIN),
  ScheduleController.createSchedule,
);

router.get(
  "/",
  authCheck(Role.ADMIN, Role.SUPER_ADMIN, Role.DOCTOR),
  ScheduleController.getAllSchedules,
);

router.get(
  "/:id",
  authCheck(Role.ADMIN, Role.SUPER_ADMIN, Role.DOCTOR),
  ScheduleController.getScheduleById,
);

router.put(
  "/:id",
  authCheck(Role.ADMIN, Role.SUPER_ADMIN),
  ScheduleController.updateSchedule,
);

router.delete(
  "/:id",
  authCheck(Role.ADMIN, Role.SUPER_ADMIN),
  ScheduleController.deleteSchedule,
);

export const ScheduleRoutes = router;
