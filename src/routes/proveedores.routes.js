import { Router } from "express";
import {getProvee, getProveeId, createProvee, updateProvee, deleteProvee} from '../controllers/proveedores.controller.js'

const router = Router();

router.get('/get', getProvee)
router.get('/getId/:id', getProveeId)
router.post('/create', createProvee)
router.put('/update/:id', updateProvee)
router.delete('/delete/:id', deleteProvee)

export default router