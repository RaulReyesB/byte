import express, {Router} from 'express'
import passport from 'passport';
import { formularioLogin,formularioOlvidoContra,formularioRegistro, insertarUsuario, confirmarCuenta, restaurarContrasena} from '../controller/userControllers.js';

const router = express.Router();

router.get("/login", formularioLogin);
router.get("/register", formularioRegistro);
router.get("/forgot-password",formularioOlvidoContra);
router.post("/register", insertarUsuario)
router.get("/confirm/:token", confirmarCuenta)
router.post("/user/forgot-password", restaurarContrasena)

export default router;