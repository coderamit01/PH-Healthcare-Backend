import { Router } from "express";
import { AdminController } from "./admin.controller";

const router = Router();

router.get('/', AdminController.getAllAdmin);
router.get('/:id', AdminController.getAdminById);
router.put('/:id', AdminController.updateAdmin);
router.delete('/:id', AdminController.deleteAdmin);

export const adminRoute = router;