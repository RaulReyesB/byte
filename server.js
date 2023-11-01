import { Express, request, response } from "express"
import dotenv from "dotenv"


dotenv.config({path: '.env'})

const app = express();

const port = 3000


app.set('view engine', 'pug')
app.use('views', '/views')

app.use(express.static('./public'))
app.use(express.urlencoded({extended:false}))

app.listen(port,(request, response)=> console.log(`El servidor web ha iniciado y esta esperando solicitudes \n Se encuentra escuchando a traves del puerto ${port}`))

app.use('/', generalRoutes)
app.use('/login', userRoutes)