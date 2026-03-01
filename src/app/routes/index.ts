import { Router } from "express";
import { SpecialtyRoutes } from "../module/specialty/specialty.route";
import { AuthRoutes } from "../module/auth/auth.route";
import { UserRoutes } from "../module/user/user.route";
import { DoctorRoutes } from "../module/doctor/doctor.route";
import { adminRoute } from "../module/admin/admin.route";
import { ScheduleRoutes } from "../module/schedule/schedule.route";
import { DoctorScheduleRoutes } from "../module/doctorSchedule/doctorSchedule.route";
import { AppoinmentRoutes } from "../module/appoinment/appoinment.route";
import { PatientRoutes } from "../module/patient/patient.route";
import { PaymentRoutes } from "../module/payment/payment.route";
import { PrescriptionRoutes } from "../module/prescription/prescription.route";
import { ReviewRoutes } from "../module/review/review.route";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/specialties", SpecialtyRoutes);
router.use("/users", UserRoutes);
router.use("/patients", PatientRoutes); 
router.use("/doctors", DoctorRoutes);
router.use("/admins", adminRoute);
router.use("/schedules", ScheduleRoutes);
router.use("/doctor-schedules", DoctorScheduleRoutes);
router.use("/appointments", AppoinmentRoutes);
router.use("/prescriptions", PrescriptionRoutes)
router.use("/reviews", ReviewRoutes)
router.use("/stats", StatsRoutes)
router.use("/payments", PaymentRoutes);

export const IndexRoutes = router;
