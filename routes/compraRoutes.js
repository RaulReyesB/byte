import express, { Router, request, response } from 'express'
import { registroBoleto } from '../controller/compraControler.js';
const router = express.Router();

router.post("/registro", registroBoleto);

export default router;