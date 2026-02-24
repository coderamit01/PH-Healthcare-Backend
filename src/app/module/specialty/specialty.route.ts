import { Router } from "express";
import { SpecialtyController } from "./specialty.controller";
import { multerUpload } from "../../config/multer.config";

const router = Router();

router.post('/', multerUpload.single("file"), SpecialtyController.createSpecialty);
router.get('/', SpecialtyController.getAllSpecialty);
router.put('/:id', SpecialtyController.updateSpecialty);
router.delete('/:id', SpecialtyController.deleteSpecialty);


export const SpecialtyRoutes = router;