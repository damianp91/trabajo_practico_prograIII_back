import { Router } from "express";
const router = Router();
import { vistaProductos } from "../controllers/view.controllers.js";
// import { requireLogin } from "../middlewares/middlewares.js";

router.get("/consultar", (req, res) => {
    res.render("getById");
});

router.get("/modificar", (req, res) => {
    res.render("update");
});

router.get("/crear", (req, res) => {
    res.render("create");
});

router.get("/eliminar", (req, res) => {
    res.render("delete");
});

// Rutas de las vistas
router.get("/", vistaProductos);

export default router;
