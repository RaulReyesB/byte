import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import express from 'express';
import passport from 'passport';
import { request, response } from "express";
import Viaje from "../models/Viaje.js";
import { check } from "express-validator";
import { validationResult } from "express-validator";
import Result from "postcss/lib/result";

const registroBoleto = async (request, response) => {
  try {
    const viajeId = request.params.id;
    console.log('viajeId:', viajeId);
    
    // Obtener datos del viaje según el ID utilizando el modelo Viaje
    const viaje = await Viaje.findByPk(viajeId, { include: 'horarios' });
    console.log(viaje);  // Agrega esta línea para verificar el contenido de viaje

    response.render('compra/registro.pug', {
      viaje,
      horarios: viaje.horarios,
      pagina: "Horarios",
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
  registroBoleto
}