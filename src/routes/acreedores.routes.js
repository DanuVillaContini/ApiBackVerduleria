import { Router } from "express";
import { createAcreedores, deleteAcreedores, getAcreedores, getAcreedoresId, updateAcreedores } from "../controllers/acreedores.controller.js";

const router = Router();

router.get('/get', getAcreedores
)
router.get('/getId/:id', getAcreedoresId
)
router.post('/create', createAcreedores
)
router.put('/update/:id', updateAcreedores
)
router.delete('/delete/:id', deleteAcreedores
)


export default router
