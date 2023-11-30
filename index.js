import Sequelize from 'sequelize';
import session from 'express-session'; // Agregado: importar express-session
import passport from 'passport';
import './models/asociaciones.js'
import { DataTypes } from 'sequelize';
import express from "express";
import generalRoutes from './routes/generalRoutes.js';
import userRoutes from './routes/userRoutes.js';
import db from './config/db.js';// Instancuamos el modulo express de la libreria para definir el servidor que atendera las peticiones 
import Usuario from "./models/Usuario.js";
import TbbAsiento from "./models/asiento.js";
import TbbAutobus from "./models/autobus.js";
import TbbEmpleado from "./models/empleado.js";
import TbbItinerario from "./models/itinerario.js";
import Persona from "./models/Persona.js";
import TbbReservacion from "./models/resevacion.js";
import TbbRuta from "./models/ruta.js";
import Ubicacion from './models/ubicacion.js';
import path from "path";
import Viaje from './models/viaje.js';
import viajesRoutes from './routes/viajesRoutes.js'
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const app = express()

// Implementacion de la bd atravez de un trycatch
try {
  await db.authenticate();
  await db.sync({});
  console.log("Conexion a la Base de Datos exitosa");

  Persona.findAll({
    include: [{
      model: TbbEmpleado,

    }],
  })

  Persona.findAll({
    include: [{
      model: TbbEmpleado,

    }],
  })



} catch (error) {
  console.log(error);
}

//Habilitando PUG
//SET es para agregar configuracion 
app.set('view engine', 'pug')
app.set('views', './views')

app.use("/public", express.static(path.join('public')));

//Definimos la carpeta para los recursos Public
app.use(express.static('public'))
//Permitimos la lectura de datos atraves de los elementos HTML
app.use(express.urlencoded({ extended: false }))


// Configurar express-session
app.use(session({
  secret: process.env.CLIENTE_SECRETO, // Cambia esto con una clave segura
  resave: false,
  saveUninitialized: false,
}));

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

const port = 3000; //Definimos el puerto 64400 puertos mtb 1024 - 50
app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`)
});
// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/', generalRoutes)
app.use('/user', userRoutes)
app.use('/viajes', viajesRoutes)

app.get('/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
    var google = require('googleapis').google;
var OAuth2 = google.auth.OAuth2;

var oauth2Client = new OAuth2();
oauth2Client.setCredentials({access_token: 'https://www.googleapis.com/oauth2/v1/certs'});

var oauth2 = google.oauth2({
  auth: oauth2Client,
  version: 'v2'
});

oauth2.userinfo.get(
  function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  }
);

  }
);

app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.redirect('/');
  }
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
