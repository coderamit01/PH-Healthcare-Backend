import { Router } from "express";
import { ScheduleController } from "./schedule.controller";

const router = Router();

router.post("/", ScheduleController.createSchedule);

router.get("/", ScheduleController.getAllSchedules);

router.get("/:id", ScheduleController.getScheduleById);

router.put("/:id", ScheduleController.updateSchedule);

router.delete("/:id", ScheduleController.deleteSchedule);

export const ScheduleRoutes = router;
