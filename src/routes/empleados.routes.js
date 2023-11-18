import { Router } from "express";
import { createEmpleados, deleteEmpleados, getEmpleados, getEmpleadosId, updateEmpleados } from "../controllers/empleados.controller.js";

const router = Router();

router.get('/getEmpleados', getEmpleados
)
router.get('/getEmpleadosId/:id', getEmpleadosId
)
router.post('/createEmpleados', createEmpleados
)
router.put('/updateEmpleados/:id', updateEmpleados
)
router.delete('/deleteEmpleados/:id', deleteEmpleados
)

export default router