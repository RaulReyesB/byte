import express, { Router, request, response } from 'express'
import { viajes, horarios, precios, detalleViaje, obtenerDetallesViaje, registroBoleto, confirmarBoleto,crearBoleto   } from '../controller/viajesController.js';
import protegerRuta from '../middleware/protegerRutas.js';

const router = express.Router();

router.get("/", viajes);
router.get('/horarios', horarios)
router.get('/PreciosIda', precios)

//Detalles del viaje que se seleciona por medio del id
router.get('/detalle/:id', detalleViaje);

router.get('/detallesViaje/:id', obtenerDetallesViaje);

router.post('/registro/:id', registroBoleto);

router.post('/compra/:id', crearBoleto);

router.get("/confirm/:token", confirmarBoleto)

//router.post('/registro/:id/:asientoSeleccionado', );



export default router;