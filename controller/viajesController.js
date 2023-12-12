import Viaje from '../models/Viaje.js';
import Autobus from '../models/Autobus.js';
import Asiento from '../models/Asiento.js';
import { request, response } from "express";
import { check } from "express-validator";
import { validationResult } from "express-validator";
import Result from "postcss/lib/result";
import { generateToken, generateJwt } from '../lib/tokens.js';
import { compraBoleto } from '../lib/emails.js';
import Boleto from '../models/Boleto.js';
import QRCode from 'qrcode-svg';

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
    const asientoSeleccionado = request.params.asiento;

    // Obtén datos del viaje según el ID utilizando el modelo Viaje
    const viaje = await Viaje.findByPk(viajeId, { include: 'horarios' });

    // Log para verificar si el viaje y su autobús están definidos
    //    console.log('Viaje:', viaje);

    if (!viaje) {
      response.status(404).render('error', {
        errorMessage: 'No se encontró el viaje.',
      });
      return;
    }

    const autobusId = viaje.autobusId;

    // Log para verificar el ID del autobús
    //  console.log('Autobús ID:', autobusId);

    // Intenta obtener el autobús asociado al viaje
    const autobus = await Autobus.findByPk(autobusId);

    // Log para verificar si el autobús está definido
    //console.log('Autobús:', autobus);

    if (!autobus) {
      response.status(404).render('error', {
        errorMessage: 'No se encontró el autobús asociado al viaje.',
      });
      return;
    }
    //console.log('Valor de asientoSeleccionado:', asientoSeleccionado);

    // Obtén los asientos asociados al autobús del viaje
    const asientos = await Asiento.findAll({ where: { autobusID: autobusId } });

    // Renderiza la vista de detallesViaje y pasa los datos del viaje y asientos
    response.render('./viajes/detallesViaje.pug', {
      viaje,
      autobus,
      asientos,
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

    console.log(asientoSeleccionado);

    // Obtener datos del viaje según el ID utilizando el modelo Viaje
    const viaje = await Viaje.findByPk(viajeId, { include: 'horarios' });

    response.render('./compra/registro.pug', {
      viaje,
      horarios: viaje.horarios,
      asientoSeleccionado,
      pagina: "Compra del Boleto",
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

// Crear un boleto

const crearBoleto = async (request, response) => {
  console.log("El usuario está intentando crear un boleto en la base de datos");
  const viajeId = request.params.id;

  const viaje = await Viaje.findByPk(viajeId, { include: 'horarios' });

  try {
    // Obtener datos del formulario
    const { nombre, correo1, asiento, viajeId } = request.body;

    // Validaciones...

    // Verificar si hay errores de validación
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.render("./compra/registro.pug", {
        // ... (resto de tu código)
      });
    }

    // Si no hay errores, continuamos con la creación del boleto
    const token = generateToken();

    // Crear el boleto en la base de datos
    const boleto = await Boleto.create({
      nombre,
      correo1,
      asiento,
      viajeId,
      token,
      asientoId: asiento
    });

    // Generar el código QR con el token
    const qrcode = new QRCode({
      content: `https://th.bing.com/th/id/R.efdc97db81199c0a3d874f1ec615f51c?rik=vM486S33k4Afnw&pid=ImgRaw&r=0`,
      padding: 4,
      width: 150, // Ajusta el ancho según tus necesidades
      height: 150,
      color: "#000000",
      background: "#ffffff",
      ecl: "M", // Error correction level: L, M, Q, H
    });

    // Obtener el SVG del código QR
    const svgQRCode = qrcode.svg();

    // Enviar el correo de confirmación
    compraBoleto({ nombre, correo1, token });

    // Renderizar la página de mensaje de éxito con el código QR
    response.render("./compra/boleto.pug", {
      pagina: "Boleto",
      showHeader: true,
      showFooter: true,
      viaje,
      horarios: viaje.horarios,
      asiento,
      svgQRCode, // Pasar el SVG del código QR a la vista
    });
  } catch (error) {
    console.error(error);
    response.status(500).render('error', {
      errorMessage: 'Error interno del servidor',
    });
  }
};





const confirmarBoleto = async (request, response, next) => {
  console.log("El usuario está intentando confirmar su boleto");
  const { token } = request.params;

  try {
    // Verificar si el token existe y corresponde a un boleto
    const boleto = await Boleto.findOne({ where: { token } });

    if (!boleto) {
      console.log('Este token no es válido para un boleto');
      return response.render("templates/message.pug", {
        pagina: "Error en el proceso de confirmación.",
        notificationTitle: "El token es inválido",
        notificationMessage: "El token proporcionado no corresponde a un boleto válido.",
        type: "Warning"
      });
    }

    // Actualizar el estado de confirmación en la base de datos
    boleto.confirmado = true;
    // Eliminar el token
    await boleto.save();

    // Renderizar la página de éxito
    response.render("templates/message.pug", {
      pagina: "¡Éxito!",
      notificationTitle: "Boleto confirmado",
      notificationMessage: "El boleto ha sido confirmado exitosamente.",
      type: "Info"
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
  registroBoleto,
  confirmarBoleto,
  crearBoleto
} 