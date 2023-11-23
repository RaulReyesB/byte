import Sequelize from 'sequelize';
import './models/asociaciones.js'
import { DataTypes } from 'sequelize';
import express from "express";
import generalRoutes from './routes/generalRoutes.js';
import userRoutes from './routes/userRoutes.js';
import db from './config/db.js';// Instancuamos el modulo express de la libreria para definir el servidor que atendera las peticiones 
import User from "./models/User.js";
import TbbAsiento from "./models/asiento.js";
import TbbAutobus from "./models/autobus.js";
import TbbEmpleado from "./models/empleado.js";
import TbbItinerario from "./models/itinerario.js";
import TbbPersona from "./models/persona.js";
import TbbReservacion from "./models/resevacion.js";
import TbbRuta from "./models/ruta.js";
import TbbUbicacion from "./models/ubicacion.js";
<<<<<<< HEAD
import TbbViajes from './models/viajes.js';


=======
import path from "path";
import viajesRoutes from './routes/viajesRoutes.js'
>>>>>>> f5aae8beaf5ba3bf0e538a86aa314839b7d7c0f5

const app = express()

// Implementacion de la bd atravez de un trycatch
try {
  await db.authenticate();
  await db.sync({});
<<<<<<< HEAD
    console.log("Conexion a la Base de Datos exitosa");
  



    TbbPersona.findAll({
      include: [{
        model: TbbEmpleado,
       
      }],
    })
      .then(result => {
        console.log('conexion de tablas exitosa')
        console.log(result);
      })
  
      .catch(error => {
        console.error('Error al realizar la consulta:', error);
      });






     
=======
  console.log("Conexion a la Base de Datos exitosa");
>>>>>>> f5aae8beaf5ba3bf0e538a86aa314839b7d7c0f5
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

const port = 3000; //Definimos el puerto 64400 puertos mtb 1024 - 50
app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`)
});

app.use('/', generalRoutes)
<<<<<<< HEAD
app.use('/login', userRoutes)
=======
app.use('/user', userRoutes)
app.use('/viajes', viajesRoutes)

>>>>>>> f5aae8beaf5ba3bf0e538a86aa314839b7d7c0f5
