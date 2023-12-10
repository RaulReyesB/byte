// Importa los módulos necesarios
import express from 'express';
import Viaje from '../models/Viaje.js'; // Asegúrate de importar tu modelo correctamente

// Instancia el router de Express
const router = express.Router();

// Ruta para mostrar la página de inicio con los nombres de varios viajes
router.get('/', async (req, res) => {
  try {
    // Consulta a la base de datos para obtener los viajes
    const viajes = await Viaje.findAll();

    // Renderiza la vista Pug con los datos de los viajes
    res.render("./auth/Inicio.pug", {
      pagina: "Inicio",
      showHeader: true,
      showFooter: true,
      viajes: viajes,
    });
  } catch (error) {
    console.error('Error al obtener los viajes:', error);
    res.status(500).send('Error interno del servidor');
  }
});



// Exporta el router para su uso en otros archivos
export default router;
