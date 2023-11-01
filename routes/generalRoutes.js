import { Express } from "express";

const router = express.Router();

router.get('/', (request, response) => response.render("./layout/index.pug", {page:"Home"}))

export default router;