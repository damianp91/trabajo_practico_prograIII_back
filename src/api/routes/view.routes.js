import { Router } from "express";
const router = Router();
import { vistaProductos, loginAcceso, cerrarSesion } from "../controllers/view.controllers.js";
//agrego este middleware para que si el usuario no esta logeado no pueda acceder a la vista
import { requireLogin } from "../middlewares/middlewares.js";

// Rutas de las vistas
router.get("/", requireLogin, vistaProductos);

router.get("/consultar", requireLogin,(req, res) => {
  res.render("getById", {
    title: "Consultar producto",
    about: "Consultar producto por id"
  });
})

router.get("/modificar", requireLogin, (req, res) => {
  res.render("update", {
    title: "Modificar producto",
    about: "Actualizar el producto"
  });
});

router.get("/crear", requireLogin, (req, res) => {
  res.render("create", {
    title: "Crear",
    about: "Crear producto"
  });
});

router.get("/login", (req, res) => {
  res.render("login", {
    title: "Login"
  });
})

router.post("/login", loginAcceso);

router.post("/logout", cerrarSesion);

router.get("/eliminar", (req, res) => {
  res.render("delete", {
    title: "Borrar"
  });
});


export default router;
