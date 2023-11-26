import express, {Router} from 'express'
import passport from 'passport';
import { formularioLogin,formularioOlvidoContra,formularioRegistro, tiket, insertarUsuario} from '../controller/userControllers.js';

const router = express.Router();

router.get("/login", formularioLogin);
router.get("/register", formularioRegistro);
router.get("/forgot-password",formularioOlvidoContra);
router.get("/ticket", tiket)
router.post("/register", insertarUsuario)



export default router;