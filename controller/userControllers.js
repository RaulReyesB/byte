import { request, response } from "express";
import { check } from "express-validator";
import { validationResult } from "express-validator";
import Result from "postcss/lib/result";


const formularioLogin = (request, response) => {
  response.render('auth/login.pug', {
    page: "Iniciar Sesion"
  })
}

const formularioRegistro = (request, response) => {
  response.render('auth/register.pug', {
    page: 'Nueva cuenta'
  })
}

const formularioOlvidoContra = (request, response) => {
  response.render('auth/forgot-password.pug', {
    page: 'Olvide Contraseña'
  })
}

const ticket = (request, response) => {
  response.render('auth/ticket.pug', {
    page: ticket
  })
}


const insertUser = async (request, response) => {
  await check("name").notEmpty().withMessage("This field is REQUIRED: NAME").run(request)

  await check("email").notEmpty().withMessage("This field is REQUIRED: EMAIL").run(request)

  await check("password").notEmpty().withMessage("This field is REQUIRED: PASSWORD").run(request)
}

export {
  formularioLogin,
  formularioRegistro,
  formularioOlvidoContra,
  ticket
}
