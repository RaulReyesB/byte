import express, {Router} from 'express'
import { formularioLogin,formularioOlvidoContra,formularioRegistro, tiket } from '../controller/userControllers.js';

const router = express.Router();

router.get("/login", formularioLogin);
router.get("/register", formularioRegistro);
router.get("/forgot-password",formularioOlvidoContra);
router.get("/ticket", tiket)
router.get('/viajes')
router.get('/horarios')
router.get('/PreciosIda')
export default router;