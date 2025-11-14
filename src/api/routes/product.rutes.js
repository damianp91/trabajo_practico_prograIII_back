// Usamos express para manejar nuestras rutas
import { Router } from "express";
const router = Router();

// Importacion de middlewares
import { validateId } from "../middlewares/middlewares.js";
import { getAllProducts, removeProduct, createProduct, updateProduct } from "../controllers/product.controllers.js";

router.get("/", getAllProducts);
router.post("/", createProduct);
router.put("/", updateProduct);
router.delete("/:id", validateId, removeProduct);

export default router;
