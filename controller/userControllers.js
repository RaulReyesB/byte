import { request, response } from "express";
import { check } from "express-validator";
import { validationResult } from "express-validator";
import Result from "postcss/lib/result";


const formularioLogin = (request, response) => {
  response.render('auth/login', {
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

const tiket = (request, response) => {
  response.render('auth/tiket.pug', {
    page: tiket
  })
}


const insertUser = async (request, response) => {
  await check("name").notEmpty().withMessage("Este campo es OBLIGATORIO: NOMBRE").isLength({min: 4}).withMessage("El nombre debe contener 4 caracteres como minimo").isLength({max: 15}).withMessage("El nombre debe contener 15 caracteres maximo").run(request)

  await check("email").notEmpty().withMessage("Este campo es OBLIGATORIO: EMAIL").isEmail().withMessage("El valor debe estar en formato User@domain.ext").run(request)

  await check("password").notEmpty().withMessage("Este campo es OBLIGATORIO: PASSWORD").isLength({min: 8}).withMessage("la contraseña debe contener al menos 8 caracteres").isLength({max: 20}).withMessage("Password must contain less than 20 characters").equals(request.body.cpassword).withMessage("Both password must be the same").run(request)
}

export {
  formularioLogin,
  formularioRegistro,
  formularioOlvidoContra,
  tiket
}
