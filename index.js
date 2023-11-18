import express from "express";
import generalRoutes from './routes/generalRoutes.js';
import userRoutes from './routes/userRoutes.js';
import db from './config/db.js';// Instancuamos el modulo express de la libreria para definir el servidor que atendera las peticiones 
import User from "./models/User.js";
import TbbAsiento from "./models/asiento.js";
import Tbbautobus from "./models/autobus.js";
import Tbbempleado from "./models/empleado.js";
import Tbbitinerario from "./models/itinerario.js";
import Tbbpersona from "./models/persona.js";
import Tbbreservacion from "./models/resevacion.js";
import Tbbruta from "./models/ruta.js";
import TbbUbicacion from "./models/ubicacion.js";
import path from "path";

const app = express()

// Implementacion de la bd atravez de un trycatch
try {
  await db.authenticate();
  await db.sync({});
  console.log("Conexion a la Base de Datos exitosa");
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
app.use('/user', userRoutes)

