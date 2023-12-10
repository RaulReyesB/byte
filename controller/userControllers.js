import path from 'path';
import fs from 'fs/promises';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import express from 'express';
import passport from 'passport';
//import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { request, response } from "express";
import { check, validationResult } from "express-validator";
import GoogleStrategy from 'passport-google-oauth20'
import Persona from '../models/Persona.js';
import Usuario from '../models/Usuario.js';
import { generateToken } from '../lib/tokens.js';
import { generateJwt } from '../lib/tokens.js';
import { emailRegister, correoRestaurarContrasena } from '../lib/emails.js';
import bcrypt from 'bcrypt'
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



passport.use(new GoogleStrategy({
  clientID: process.env.CLIENTE_ID,
  clientSecret: process.env.CLIENTE_SECRETO,
  callbackURL: process.env.REDIRECCION_URI,

}, async (accessToken, refreshToken, profile, done) => {

  const correoElectronico = profile && profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
  const token = generateToken();

  if (!correoElectronico) {
    return done(null, false, { message: 'No se proporcionó un correo electrónico en el perfil de Google.' });
  }

  // Obtener datos adicionales del perfil de Google
  const {
    displayName,
    name,
    family_name: apellidoPaterno,
    given_name: apellidoMaterno,
    birthday,
    gender,
    address,
    phone_number,
    postal_code: codigoPostal
  } = profile._json;


  // Verificar si el usuario ya existe en tu base de datos
  const userExists = await Usuario.findOne({ where: { correoElectronico: correoElectronico } });

  if (userExists) {
    return done(null, false, {
      message: `El usuario con correo ${correoElectronico} ya está registrado, intenta con otro correo`
    });
  } else {
    // Crear nuevo usuario en la base de datos
    const nuevaPersona = await Persona.create({
      nombre: displayName || nombre,
      apellidoPaterno,
      apellidoMaterno,
      fechaNacimiento: birthday,
      genero: gender,
      direccion: address,
      telefono: phone_number,
      codigoPostal,
    })
    console.log('Nuevo Usuario:', nuevaPersona);
    const newUser = await Usuario.create({
      correoElectronico: correoElectronico,
      contrasena: token, // Reemplazar con la contraseña hash
      token: token // Reemplazar con la lógica para generar el token
    });

    // Enviar el correo de confirmación
    emailRegister({ name: nuevaPersona.nombre, correoElectronico: correoElectronico, token: newUser.token });

  }


}
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});


//llamada via http request, response 

const insertarUsuario = async (request, response) => {

  console.log("El usuario está intentando registrar sus datos en la base de datos");
  console.log(`Nombre: ${request.body.nombre}`);
  const { nombre, correoElectronico, contrasena, birthdate, apat, amat, gen, cp, dir, tel } = request.body;

  await check("nombre").notEmpty().withMessage("Este campo es OBLIGATORIO: NOMBRE").isLength({ min: 4 }).withMessage("El nombre debe contener 4 caracteres como minimo").isLength({ max: 15 }).withMessage("El nombre debe contener 15 caracteres maximo").run(request)

  await check("apat").notEmpty().withMessage("Este campo es OBLIGATORIO: NOMBRE").isLength({ min: 4 }).withMessage("El apellido debe contener 4 caracteres como minimo").isLength({ max: 15 }).withMessage("El apellido debe contener 15 caracteres maximo").run(request)

  await check("correoElectronico").notEmpty().withMessage("Este campo es OBLIGATORIO: EMAIL").isEmail().withMessage("El valor debe estar en formato User@domain.ext").run(request)

  await check("contrasena").notEmpty().withMessage("Este campo es OBLIGATORIO: Contraseña").isLength({ min: 8 }).withMessage("la contraseña debe contener al menos 8 caracteres").isLength({ max: 20 }).withMessage("Password must contain less than 20 characters").equals(request.body.contrasena2).withMessage("Ambas contraseñas deben ser iguales").run(request)

  await check("cp").notEmpty().withMessage("Este campo es OBLIGATORIO: CODIGO POSTAL").isLength({ min: 5, max: 5 }).withMessage("Codigo postal invalido").run(request)

  await check("tel").notEmpty().withMessage("Este campo es OBLIGATORIO: Telefono").run(request)

  await check("dir").notEmpty().withMessage("Este campo es OBLIGATORIO: DIRECCION").run(request)

  await check("birthdate").notEmpty().withMessage("Este campo es OBLIGATORIO: Fecha de Nacimiento").run(request);

  let resultadoValidacion = validationResult(request);


  if (resultadoValidacion.isEmpty()) {
    // Si el usuario pasa todas las validaciones, continuas con el registro
    const token = generateToken();
    console.log(`Intentando insertar al usuario: ${nombre}, con el email: ${correoElectronico}, con la contraseña: ${contrasena} y token: ${token}`);
    console.log("Insertando los datos de la Persona, antes de crear al Usuario...")
    console.log(`apat = ${gen}`)
    let lastId;

    await Persona.create({
      nombre: nombre,
      apellidoPaterno: apat,
      apellidoMaterno: amat,
      fechaNacimiento: birthdate,
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
    const userExists = await Usuario.findOne({ where: { correoElectronico: correoElectronico } });


    // Validación de edad del usuario

    if (!birthdate) {
      return response.render("auth/register.pug", {
        pagina: "Creando nueva cuenta",
        showHeader: true,
        errors: [{ msg: "Fecha de nacimiento requerida." }],
        user: {
          name: request.body.nombre,
          email: request.body.correoElectronico
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
          name: request.body.nombre,
          email: request.body.correoElectronico
        }
      });
    }
    else  //else de mayoria de edad
    {
      if (userExists) {
        return response.render("auth/register.pug", {
          pagina: "Creando nueva cuenta",
          showHeader: true,
          errors: [{ msg: `El usuario con correo ${correoElectronico} ya esta registrado, intenta con otro correo` }],
          user: {
            name: request.body.nombre,
            email: request.body.correoElectronico
          }
        });
      }

      else { // si el usuario no existe, se crea

        Usuario.create({
          correoElectronico: correoElectronico,
          contrasena: contrasena,
          token: token,
          Persona_ID: lastId
        })
      }
      // Enviar el correo de confirmacion

      emailRegister({ nombre, correoElectronico, token });

      response.render("templates/message.pug", {
        pagina: "Informacion",
        showHeader: true,
        type: "Info",
        notificationTitle: "Usuario creado",
        notificationMessage: `El usuario asociado a: ${correoElectronico} ha sido creado, por favor revisa tu correo electrónico para verificación de cuenta`
      })
    }
  } else {
    // Si hay errores en otras validaciones, muestra los errores
    return response.render("auth/register.pug", {
      pagina: "Creando nueva cuenta",
      showHeader: true,
      errors: resultadoValidacion.array(),
      user: {
        name: request.body.nombre,
        email: request.body.correoElectronico,
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
  const { correoElectronico } = request.body;
  const usuarioExiste = await Usuario.findOne({ where: { correoElectronico } });
  // Crear el token para cambiar la contraseña
  if (resultado.isEmpty()) {
    // Validar que el correo exista
    if (!usuarioExiste) {
      // Página de error
      console.log(`El usuario con correo ${correoElectronico} no existe`);
      response.render('templates/message.pug', {
        pagina: "Recuperar contraseña",
        notificationTitle: `Error Email not Found`,
        notificationMessage: "The token is invalid",
        type: "Error",
      });
    } else {
      //  Crear el token para cambiar la contraseña
      const tokenPassword = generateToken();
      usuarioExiste.token = tokenPassword;
      usuarioExiste.save();
      //  Enviar correo de acceso al cambio de contraseña
      correoRestaurarContrasena({
        correoElectronico,
        tokenPassword,
      });
      console.log(`El usuario con correo ${correoElectronico} existe`);
      response.render('templates/message.pug', {
        pagina: "Recuperar contraseña",
        notificationTitle: `Email Found`,
        notificationMessage: "The token is invalid",
        type: "Info",
      });
    }
  } else {
    return response.render("auth/forgot-password.pug", {
      pagina: "Recuperar contraseña",
      showHeader: true,
      errors: resultado.array(),
      usuario: {
        correoElectronico: request.body.correoElectronico,
      },
    });
  }
}

const cambiarContrasena = async (request, response) => {
  const { tokenPassword } = request.params;

  // Verify if token already exists
  let userToken = await Usuario.findOne({ where: { token: tokenPassword } });
  //  Paginas de respuesta
  if (!userToken) {
    console.log(`This token is invalid `);
    response.render('templates/message.pug', {
      pagina: "Error in Validation Process",
      notificationTitle: "The token is invalid ",
      notificationMessage: "The token is invalid ",
      type: "warning"
    })
  } else {
    response.render("auth/cambiar-contrasena.pug", {
      pagina: `Cambiar contraseña`,
      tokenPassword: tokenPassword
    });
  }
}


const actualizarContrasena = async (req, res) => {
  const { tokenPassword } = req.params;
  const { nuevaContrasena } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedContrasena = await bcrypt.hash(nuevaContrasena, salt);

  // Verify if token already exists
  let userToken = await Usuario.findOne({ where: { token: tokenPassword } });
  if (!userToken) {
    console.log(`This token is invalid `);
    res.render('templates/message.pug', {
      page: "Error in Validation Process",
      notificationTitle: "The token is invalid ",
      notificationMessage: "The token is invalid ",
      type: "Warning"
    })
  } else {
    console.log(`Intentando actualizar la contraseña en la bd`);
    userToken.token = null;
    userToken.contrasena = hashedContrasena;
    userToken.save();
    res.render('templates/message.pug', {
      page: "Error in Validation Process",
      notificationTitle: "Change Password Success ",
      notificationMessage: "The token is invalid ",
      type: "Info"
    })
  }
}
// Authenticate User
const autenticarUsuario = async (request, response) => {

  // Validar los datos del formulario
  await check('correoElectronico').notEmpty().withMessage('Email field is required').isEmail().withMessage('The Email field should be an Email (user@domain.ext) and not empty').run(request);
  await check('contrasena').notEmpty().withMessage('contrasena field is required').isLength({
    min: 8,
    max: 20
  }).withMessage('The contrasena is formed between 8 and 20 characters.').run(request);

  // Desestructurar los datos del body (formulario)
  const { correoElectronico, contrasena } = request.body;

  let result = validationResult(request);

  console.log(`El usuario: ${correoElectronico} está intentando autenticarse.`);

  if (result.isEmpty()) {
    // Validar que exista el correo electrónico
    const userExists = await Usuario.findOne({ where: { correoElectronico } });
    console.log(userExists)
    // Validar que el correo exista
    if (!userExists) {
      // Página de error
      response.render('templates/message.pug', {
        pagina: "Error al iniciar sesion",
        notificationTitle: `Error Email not Found`,
        notificationMessage: `The user with email: ${correoElectronico} do not exist.`,
        type: "Error"
      })
    } else {
      //  Validar que el usuario esté validado
      if (!userExists.verificado) {
        console.log(`El usuario con correo ${correoElectronico}`);
        response.render('templates/message.pug', {
          pagina: "Error in login",
          notificationTitle: ` Account is not validated `,
          notificationMessage: `The user associated to the email: ${correoElectronico} is not verified, please check your email.`,
          type: "Warning"
        })

      } else {
        //  Validar la contraseña ingresada con la asignada al correo electrónico (usuario)
        if (userExists.verifyPassword(contrasena)) {
          //console.log(nombre)
          //let usuarioNombre = await Persona.findOne({ where: { nombre } });
          const expirationTime = 15 * 60 * 1000; // 15 minutos en milisegundos

          //  Generar el Token de Acceso (JWT)
          const token = generateJwt(userExists.id);
          console.log(`JWT generado es: ${token}`);
          response.cookie('_token', token, { maxAge: expirationTime, httpOnly: true, secure: false }).redirect('/');
        } else {
          response.render("auth/login.pug", {
            pagina: `Inicar Sesion`,

            errors: [{
              msg: "The email or password doesn't match."
            }],
            //! Sending params to pug 
            usuario: {
              correoElectronico: request.body.correoElectronico
            }
          });
        }
      }
    }
  } else {
    return response.render("auth/login.pug", {
      pagina: "Iniciar Sesion",
      showHeader: true,
      errors: result.array(),
      //! Sending params to pug 
      usuario: {
        correoElectronico: request.body.correoElectronico
      }
    });
  }
}

const cerrarSesion = (req, res) => {
  res.clearCookie('_token');
  res.redirect('/login'); // O redirige a la página principal u otra página de tu elección
};



export {
  formularioLogin,
  formularioRegistro,
  formularioOlvidoContra,
  insertarUsuario,
  confirmarCuenta,
  restaurarContrasena,
  cambiarContrasena,
  actualizarContrasena,
  autenticarUsuario,
  cerrarSesion
}
