import express, {Router} from 'express'
import { viajes } from '../controller/viajesController.js';

const router = express.Router();

router.get("/", viajes);

export default router;