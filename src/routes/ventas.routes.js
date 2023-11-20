import { Router } from "express";
import { createVentas, deleteVentas, getVentas, getVentasId, updateVentas } from "../controllers/ventas.controller.js";

const router = Router();

router.get('/get', getVentas
)
router.get('/getId/:id', getVentasId
)
router.post('/create', createVentas
)
router.put('/update/:id', updateVentas
)
router.delete('/delete/:id', deleteVentas
)

export default router
