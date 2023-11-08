import express from "express";
import generalRoutes from './routes/generalRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Instancuamos el modulo express de la libreria para definir el servidor que atendera las peticiones 
const app = express()

//Habilitando PUG
//SET es para agregar configuracion 
app.set('view engine', 'pug')
app.set('views', './views')

//Definimos la carpeta para los recursos Public
app.use(express.static('public'))
//Permitimos la lectura de datos atraves de los elementos HTML
app.use(express.urlencoded({extended:false}))

const port = 3000; //Definimos el puerto 64400 puertos mtb 1024 - 50
app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`)
});

app.use('/', generalRoutes)
app.use('/login', userRoutes)

