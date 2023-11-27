//importar la libreria de Express para activar la comunicacionvia protocolo HTTP
import express, { response } from 'express'

// Instancuamos el modulo express de la libreria para definir el servidor que atendera las peticiones 
const router = express.Router();

router.get('/', (request, response) => response.render("./auth/Inicio", {pagina:"Inicio",showHeader:true, showFooter:true}))
router.get('/horarios', (request, response) => response.render("./auth/horarios", {pagina:"horarios",showHeader:true, showFooter:true}))
router.get('/PreciosIda', (request, response) => response.render("./auth/PreciosIda", {pagina:"PreciosIda",showHeader:true, showFooter:true}))
export default router;