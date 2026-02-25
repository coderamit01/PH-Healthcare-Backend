import { Router } from "express";
import { DoctorController } from "./doctor.controller";
import { authCheck } from "../../middleware/authCheck";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.get("/",
  //  authCheck(Role.ADMIN,Role.SUPER_ADMIN),
    DoctorController.getAllDoctors);
router.get("/:id", authCheck(Role.ADMIN,Role.SUPER_ADMIN), DoctorController.getDoctorById);
router.put("/:id", authCheck(Role.ADMIN,Role.SUPER_ADMIN), DoctorController.updateDoctor);
router.delete("/:id", authCheck(Role.ADMIN,Role.SUPER_ADMIN), DoctorController.deleteDoctor);

export const DoctorRoutes = router;