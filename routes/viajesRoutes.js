import express, { Router, request, response } from 'express'
import { viajes, horarios, precios, detalleViaje, obtenerDetallesViaje  } from '../controller/viajesController.js';
import protegerRuta from '../middleware/protegerRutas.js';

const router = express.Router();

router.get("/", viajes);
router.get('/horarios', horarios)
router.get('/PreciosIda', precios)

//Detalles del viaje que se seleciona por medio del id
router.get('/detalle/:id', detalleViaje);


router.get('/detallesViaje/:id', obtenerDetallesViaje);


export default router;