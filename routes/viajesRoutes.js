import express, {Router} from 'express'
import { viajes } from '../controller/viajesController.js';

const router = express.Router();

router.get("/", viajes );
router.get('/horarios')
router.get('/PreciosIda')
export default router;