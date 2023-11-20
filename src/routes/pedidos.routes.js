import { Router } from "express";
import { createPedidos, deletePedidos, getPedidos, getPedidosId, updatePedidos } from "../controllers/pedidos.controller.js";

const router = Router();

router.get('/get', getPedidos
)
router.get('/getId/:id', getPedidosId
)
router.post('/create', createPedidos
)
router.put('/update/:id', updatePedidos
)
router.delete('/delete/:id', deletePedidos
)


export default router
