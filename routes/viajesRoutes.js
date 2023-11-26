import express, {Router} from 'express'
import { viajes, horarios, precios } from '../controller/viajesController.js';

const router = express.Router();

router.get("/", viajes );
router.get('/horarios', horarios)
router.get('/PreciosIda', precios)

export default router;