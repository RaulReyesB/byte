import { request, response } from "express";
import { check } from "express-validator";
import { validationResult } from "express-validator";
import Result from "postcss/lib/result";


const formularioLogin = (request, response) => {
  response.render('auth/login', {
    page: "Iniciar Sesion"
  })
}

const formularioRegistro = (request, response) =>{
  response.render('auth/register.pug',{
    page: 'Nueva cuenta'
  })
}

const formularioOlvidoContra = (request, response) =>{
  response.render('auth/forgot-password.pug',{
    page: 'Olvide Contraseña'
  })
}

const insertUser = async(request,response) =>{
  await check("name").notEmpty().withMessage("This field is REQUIRED: NAME").run(request)

}

export {
  formularioLogin,
  formularioRegistro,
  formularioOlvidoContra
}
