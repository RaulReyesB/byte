import express, {Router} from 'express'

const router = express.Router();

router.get("/")
router.get("/register")
router.get("/forgot-password",)
router.post("/register")

router.get("/login/confirm/:token")

router.post("/login/forgot-password")

export default router;