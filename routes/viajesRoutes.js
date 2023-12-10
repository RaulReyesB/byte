import express, {Router} from 'express'
import { viajes, horarios, precios } from '../controller/viajesController.js';
import protegerRuta from '../middleware/protegerRutas.js';
const router = express.Router();

router.get("/", viajes, protegerRuta );
router.get('/horarios',protegerRuta, horarios )
router.get('/PreciosIda', precios, protegerRuta)

export default router;