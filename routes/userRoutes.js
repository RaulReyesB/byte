import express, {Router} from 'express'
import { formularioLogin,formularioOlvidoContra,formularioRegistro } from '../controller/userControllers.js';

const router = express.Router();

router.get("/", formularioLogin);
router.get("/register", formularioRegistro);
router.get("/forgot-password",formularioOlvidoContra);
router.get("/pantallaInicio")

export default router;