import express, { Router, request, response } from 'express'
import { viajes, horarios, precios } from '../controller/viajesController.js';
import protegerRuta from '../middleware/protegerRutas.js';
import Viaje from '../models/Viaje.js';
const router = express.Router();

router.get("/", viajes);
router.get('/horarios', horarios)
router.get('/PreciosIda', precios)

router.get('/detalle/:id', async (request, response) => {
  try {
    // Obtener el ID del viaje desde los parámetros de la ruta
    const viajeId = request.params.id;

    // Obtener datos del viaje según el ID utilizando el modelo Viaje
    const viaje = await Viaje.findByPk(viajeId);

    response.render('./viajes/detalle.pug', {
      viaje,
      pagina: "Horarios",
      showHeader: true,
      showFooter: true,
      // Otros datos que quieras pasar a la vista
    });
  } catch (error) {
    console.error(error);
    response.status(500).render('error', {
      errorMessage: 'Error interno del servidor',
    });
  }
});

export default router;