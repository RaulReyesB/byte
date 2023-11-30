import path from 'path';
import fs from 'fs/promises';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { request, response } from "express";
import { check, validationResult } from "express-validator";
import Persona from '../models/Persona.js';
import Usuario from '../models/Usuario.js';
import { generateToken } from '../lib/tokens.js';
import { generateJwt } from '../lib/tokens.js';
import { emailRegister } from '../lib/emails.js';
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

const formularioLogin = (request, response) => {
  response.render('auth/login', {
    pagina: "Iniciar Sesion",
    showHeader: true,
  })
}

const formularioRegistro = (request, response) => {
  response.render('auth/register.pug', {
    pagina: 'Nueva cuenta',
    showHeader: true,
  })
}

const formularioOlvidoContra = (request, response) => {
  response.render('auth/forgot-password.pug', {
    pagina: 'Olvide Contraseña',
    showHeader: true,
  })
}

const tiket = (request, response) => {
  response.render('auth/ticket.pug', {
    pagina: tiket
  })
}

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENTE_ID,
  clientSecret: process.env.CLIENTE_SECRETO,
  callbackURL: "http://localhost:3000/google",
}, async (accessToken, refreshToken, profile, done) => {
  const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;

  if (!email) {
    // Manejar el caso en el que no se proporciona el correo electrónico en el perfil
    return done(null, false, { message: 'No se proporcionó un correo electrónico en el perfil de Google.' });
  }
  const userExists = await Persona.findOne({ where: { email: email } });

  // Puedes verificar si el usuario ya existe en tu base de datos y realizar la lógica necesaria aquí
  if (userExists) {
    return response.render("auth/register.pug", {
      pagina: "Creando nueva cuenta",
      showHeader: true,
      errors: [{ msg: `El usuario con correo ${email} ya esta registrado, intenta con otro correo` }],
      user: {
        name: request.body.name,
        email: request.body.email
      }
    });
  } else {
    const newUser = await Persona.create({
      name,
      email,
      password,
      token
    });

    // Enviar el correo de confirmacion
    emailRegister({ name, email, token });

    response.render("templates/message.pug", {
      pagina: "Info Message",
      showHeader: true,
      type: "Info",
      notificationTitle: "Usuario creado",
      notificationMessage: `The user associated to: ${email} has been created, please check your email for account verification`
    })
  }
  // profile contiene la información del usuario obtenida de Google
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});


const recuperaContrasenia = async (request, response) => {
  const { email } = request.body;
  await check("email").notEmpty().withMessage("Este campo es OBLIGATORIO: EMAIL").isEmail().withMessage("El valor debe estar en formato User@domain.ext").run(request)

  let resultValidate = validationResult(req);
  const userExists = await User.findOne({
    where: {
      email: req.body.email,
    },
  });


}


//llamada via http request, response 

const insertarUsuario = async (request, response) => {

  console.log("El usuario está intentando registrar sus datos en la base de datos");
  console.log(`Nombre: ${request.body.name}`);
  const { name, email, password, birthdate, apat, amat, gen, cp, dir, tel } = request.body;


  await check("name").notEmpty().withMessage("Este campo es OBLIGATORIO: NOMBRE").isLength({ min: 4 }).withMessage("El nombre debe contener 4 caracteres como minimo").isLength({ max: 15 }).withMessage("El nombre debe contener 15 caracteres maximo").run(request)

  await check("apat").notEmpty().withMessage("Este campo es OBLIGATORIO: NOMBRE").isLength({ min: 4 }).withMessage("El apellido debe contener 4 caracteres como minimo").isLength({ max: 15 }).withMessage("El apellido debe contener 15 caracteres maximo").run(request)

  await check("email").notEmpty().withMessage("Este campo es OBLIGATORIO: EMAIL").isEmail().withMessage("El valor debe estar en formato User@domain.ext").run(request)

  await check("password").notEmpty().withMessage("Este campo es OBLIGATORIO: PASSWORD").isLength({ min: 8 }).withMessage("la contraseña debe contener al menos 8 caracteres").isLength({ max: 20 }).withMessage("Password must contain less than 20 characters").equals(request.body.cpassword).withMessage("Ambas contraseñas deben ser iguales").run(request)

  await check("cp").notEmpty().withMessage("Este campo es OBLIGATORIO: CODIGO POSTAL").isLength({ min: 5, max: 5 }).withMessage("Codigo postal invalido").run(request)

  await check("tel").notEmpty().withMessage("Este campo es OBLIGATORIO: Telefono").run(request)

  await check("dir").notEmpty().withMessage("Este campo es OBLIGATORIO: DIRECCION").run(request)

  await check("birthdate").notEmpty().withMessage("Este campo es OBLIGATORIO: Fecha de Nacimiento").run(request);

  let resultadoValidacion = validationResult(request);


  if (resultadoValidacion.isEmpty()) {
    // Si el usuario pasa todas las validaciones, continuas con el registro
    const token = generateToken();
    console.log(`Intentando insertar al usuario: ${name}, con el email: ${email}, con la contraseña: ${password} y token: ${token}`);
    console.log("Insertando los datos de la Persona, antes de crear al Usuario...")
    console.log(`apat = ${apat}`)
    let lastId;

    await Persona.create({
      nombre: name,
      apellidoPaterno: apat,
      apellidoMaterno: amat,
      fechaDeNacimiento: birthdate,
      genero: gen,
      codigoPostal: cp,
      direccion: dir,
      numeroTelefono: tel,

    }, {
      returning: ['id']
    }
    ).then((persona) => {
      lastId = persona.id
    }
    )

    console.log(`Se a creado un usuario con id ${lastId}`)
    // Validation duplicate user
    const userExists = await Usuario.findOne({ where: { correoElectronico: email } });


    // Validación de edad del usuario

    if (!birthdate) {
      return response.render("auth/register.pug", {
        pagina: "Creando nueva cuenta",
        showHeader: true,
        errors: [{ msg: "Fecha de nacimiento requerida." }],
        user: {
          name: request.body.name,
          email: request.body.email
        }
      });
    }

    const birthDate = new Date(birthdate);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();

    // Validar si el usuario es menor de 18 años
    if (age < 18) {
      return response.render("auth/register.pug", {
        pagina: "Creando nueva cuenta",
        showHeader: true,
        errors: [{ msg: "Tienes que tener al menos 18 años para registrarte." }],
        user: {
          name: request.body.name,
          email: request.body.email
        }
      });
    }
    else  //else de mayoria de edad
    {
      if (userExists) {
        return response.render("auth/register.pug", {
          pagina: "Creando nueva cuenta",
          showHeader: true,
          errors: [{ msg: `El usuario con correo ${email} ya esta registrado, intenta con otro correo` }],
          user: {
            name: request.body.name,
            email: request.body.email
          }
        });
      }

      else { // si el usuario no existe, se crea

        Usuario.create({
          correoElectronico: email,
          contrasena: password,
          token: token,
          Persona_ID: lastId
        })
      }
      // Enviar el correo de confirmacion

      emailRegister({ name, email, token });

      response.render("templates/message.pug", {
        pagina: "Info Message",
        showHeader: true,
        type: "Info",
        notificationTitle: "Usuario creado",
        notificationMessage: `The user associated to: ${email} has been created, please check your email for account verification`
      })
    }
  } else {
    // Si hay errores en otras validaciones, muestra los errores
    return response.render("auth/register.pug", {
      pagina: "Creando nueva cuenta",
      showHeader: true,
      errors: resultadoValidacion.array(),
      user: {
        name: request.body.name,
        email: request.body.email,
        birthdate: request.body.birthdate,
        apat: request.body.apat,
        amat: request.body.amat,
        cp: request.body.cp,
        tel: request.body.tel,
        dir: request.body.dir,
        gen: request.body.gen
      }
    });
  }
}

const confirmarCuenta = async (request, response, next) => {
  //*Obtener token de URL (solicitar)

  console.log("El usuario esta intentando confirmar su cuenta")
  const { token } = request.params;
  //! Verificar si el token ya existe 
  let userToken = await Usuario.findOne({ where: { token } });
  if (!userToken) {
    console.log('Este token no es válido');
    // Pintar la pagina de respuesta 
    response.render("templates/message.pug", {
      page: "Error en el proceso de validación.",
      notificationTitle: "El token es invalido",
      notificationMessage: "El token es invalido",
      type: "Warning"
    })
    //FIXME: Es para señalar errores
  } else {
    console.log('Este token es válido')
    //Actualizar el estatus de verificacion en la base de datos
    userToken.verificado = true;
    // Eliminar el token 
    userToken.token = "";
    userToken.save();
    //
    response.render("templates/message", {
      pagina: "¡Éxito!",
      notificationTitle: "Tu cuenta esta confirmada",
      notificationMessage: "Tu cuenta esta confirmada",
      type: "Info"
    })
  }
}


const restaurarContrasena = async (request, response) => {
  // Validar la existencia del usuario
  await check('correoElectronico').notEmpty().withMessage('El correo electronico es necesario').isEmail().withMessage('El campo Correo electrónico debe ser un Correo electrónico (usuario@dominio.ext) y no estar vacío').run(request);
  let resultado = validationResult(request);
  const correoElectronico = request.body;
  const usuarioExiste = Usuario.findOne({ where: correoElectronico });
  // Crear el token para cambiar la contraseña
  if (resultado.isEmpty()) {
    if (!usuarioExiste) {
      console.log(`El usuario con correo ${correoElectronico}`);
      response.render('templates/message.pug', {
        page: "Recovery Password",
        notificationTitle: `Error Email not Found`,
        notificationMessage: "The token is invalid",
        type: "Error",
      });
    } else {
      const tokenPassword = generateID();
      usuarioExiste.token = tokenPassword;
      await usuarioExiste.save();

      restaurarContrasena({
        correoElectronico,
        tokenPassword,
      });
      console.log(`El usuario con correo ${correoElectronico}`);
      response.render('templates/message.pug', {
        pagina: "Recovery Password",
        notificationTitle: `Email Found`,
        notificationMessage: "The token is invalid",
        type: "Info",
      });
    }
  } else {
    return response.render("auth/forgot-password.pug", {
      pagina: "Recuperar contraseñA",
      showHeader: true,
      errors: resultado.array(),
      usuario: {
        correoElectronico: request.body.correoElectronico,
      },
    });
  }
}

export {
  formularioLogin,
  formularioRegistro,
  formularioOlvidoContra,
  tiket,
  insertarUsuario,
  confirmarCuenta,
  restaurarContrasena
}
