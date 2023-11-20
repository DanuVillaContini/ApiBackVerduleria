import { Router } from "express";
import { createClientes, deleteClientes, getClientes, getClientesId, updateClientes } from "../controllers/clientes.controller.js";

const router = Router();
router.get('/get', getClientes
)
router.get('/getId/:id', getClientesId
)
router.post('/create', createClientes
)
router.put('/update/:id', updateClientes
)
router.delete('/delete/:id', deleteClientes
)



export default router
