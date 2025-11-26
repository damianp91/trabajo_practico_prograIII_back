import { Router } from "express";
const router = Router();
import { vistaProductos } from "../controllers/view.controllers.js";
// import { requireLogin } from "../middlewares/middlewares.js";

// Rutas de las vistas
router.get("/", vistaProductos);

router.get("/consultar", (req, res) => {
    res.render("getAll");
});

export default router;
