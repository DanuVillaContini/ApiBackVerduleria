import { Router } from "express";
import { createStock, deleteStock, getStock, getStockId, updateStock } from "../controllers/stock.controller.js";

const router = Router();

router.get('/get', getStock
)
router.get('/getId/:id', getStockId
)
router.post('/create', createStock
)
router.put('/update/:id', updateStock
)
router.delete('/delete/:id', deleteStock
)

export default router