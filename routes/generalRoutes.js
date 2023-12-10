// Importa los módulos necesarios
import express from 'express';
import Viaje from '../models/Viaje.js'; // Asegúrate de importar tu modelo correctamente

// Instancia el router de Express
const router = express.Router();

// Ruta para mostrar la página de inicio con los nombres de varios viajes
router.get('/', async (request, response) => {
  try {
    // Supongamos que deseas obtener información para los viajes con IDs 1, 2 y 3
    const viajeIds = [1, 2, 3];

    // Busca los viajes por IDs en la base de datos
    const viajes = await Viaje.findAll({
      where: {
        id: viajeIds,
      },
    });

    if (!viajes || viajes.length === 0) {
      // Manejar el caso en que no se encuentren los viajes
      return response.status(404).send("Viajes no encontrados");
    }

    // Obtén los nombres de los viajes
    const nombresViajes = viajes.map(viaje => viaje.nombre);

    // Renderiza la página de inicio con los nombres de los viajes
    response.render("./auth/Inicio", {
      pagina: "Inicio",
      showHeader: true,
      showFooter: true,
      nombres: nombresViajes,
    });
  } catch (error) {
    console.error("Error al obtener los nombres de los viajes:", error);
    // Manejar el error según sea necesario
    response.status(500).send("Error interno del servidor");
  }
});

// Exporta el router para su uso en otros archivos
export default router;
