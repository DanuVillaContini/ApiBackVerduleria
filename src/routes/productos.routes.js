import { Router } from "express";
import { createProductos, deleteProductos, getProductos, getProductosId, updateProductos } from "../controllers/productos.controller.js";

const router = Router();

router.get('/get', getProductos
)
router.get('/getId/:id', getProductosId
)
router.post('/create', createProductos
)
router.put('/update/:id', updateProductos
)
router.delete('/delete/:id', deleteProductos
)

export default router