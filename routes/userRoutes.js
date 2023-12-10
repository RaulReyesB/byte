import express, {Router} from 'express'
import passport from 'passport';
import { formularioLogin,formularioOlvidoContra,formularioRegistro, insertarUsuario, confirmarCuenta, restaurarContrasena,cambiarContrasena, actualizarContrasena, autenticarUsuario, cerrarSesion} from '../controller/userControllers.js';

const router = express.Router();

router.get("/login", formularioLogin);
router.get("/register", formularioRegistro);
router.get("/forgot-password",formularioOlvidoContra);

router.post("/register", insertarUsuario)

router.get("/confirm/:token", confirmarCuenta)

router.post("/forgot-password", restaurarContrasena)

router.get("/cambiar-contrasena/:tokenPassword", cambiarContrasena);
router.post("/update-password/:tokenPassword", actualizarContrasena);

router.post("/login", autenticarUsuario)

// Authenticate
router.post('/', /*authenticateUser*/);

router.get('/', /*homePage*/);

//Cerrar Sesion
router.get('/', cerrarSesion);


export default router;