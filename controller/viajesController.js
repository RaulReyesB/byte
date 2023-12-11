import Viaje from '../models/Viaje.js';
import { request, response } from "express";
import { check } from "express-validator";
import { validationResult } from "express-validator";
import Result from "postcss/lib/result";

const obtenerDetallesDelViajeDesdeBD = async (viajeId) => {
  try {
    // Utiliza tu modelo y las asociaciones definidas para obtener los detalles del viaje
    const detallesViaje = await Viaje.findByPk(viajeId, { include: 'horarios' });

    // Aquí podrías realizar cualquier otro procesamiento necesario

    return detallesViaje;
  } catch (error) {
    throw new Error('Error al obtener detalles del viaje desde la base de datos');
  }
};

const viajes = (request, response) => {
  response.render('auth/viajes', {
    pagina: "Viajes",
    showHeader: true,
    showFooter: true,
  })
}

const horarios = (request, response) => {
  response.render('auth/horarios', {
    pagina: "Horarios",
    showFooter: true,
    showHeader: true,
  })

}

const precios = (request, response) => {
  response.render('auth/preciosIda', {
    pagina: "Precios",
    showFooter: true,
    showHeader: true
  })
}


const detalleViaje = async (request, response) => {
  try {
    const viajeId = request.params.id;

    // Obtener datos del viaje según el ID utilizando el modelo Viaje
    const viaje = await Viaje.findByPk(viajeId, { include: 'horarios' });

    // Renderizar la vista de detalles de asientos de ida y pasar los datos del viaje
    response.render('./viajes/detalle.pug', {
      viaje,
      horarios: viaje.horarios,  // Asegúrate de tener una propiedad horarios en tu modelo Viaje
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
};

const obtenerDetallesViaje = async (request, response) => {
  try {
    const viajeId = request.params.id;

    // Aquí obtienes la información del viaje, incluyendo horarios si es necesario
    const viaje = await Viaje.findByPk(viajeId, { include: 'horarios' });

    // Renderiza la vista de detallesViaje y pasa los datos necesarios
    response.render('./viajes/detallesViaje.pug', {
      viaje,
      pagina: "Detalles del Viaje",
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
};

const registroBoleto = async (request, response) => {
  try {
    const viajeId = request.params.id;
    const asientoSeleccionado = request.body.asiento; // Modificación aquí
    //console.log(asientoSeleccionado);

    // Obtener datos del viaje según el ID utilizando el modelo Viaje
    const viaje = await Viaje.findByPk(viajeId, { include: 'horarios' });

    response.render('./compra/registro.pug', {
      viaje,
      horarios: viaje.horarios,
      asientoSeleccionado,
      pagina: "Registro del Boleto",
      showHeader: true,
      showFooter: true,
    });
  } catch (error) {
    console.error(error);
    response.status(500).render('error', {
      errorMessage: 'Error interno del servidor',
    });
  }
};






export {
  viajes,
  horarios,
  precios,
  detalleViaje,
  obtenerDetallesViaje,
  registroBoleto

} 