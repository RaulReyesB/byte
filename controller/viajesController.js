import { request, response } from "express";
import { check } from "express-validator";
import { validationResult } from "express-validator";
import Result from "postcss/lib/result";


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

export {
  viajes,
  horarios,
  precios
} 