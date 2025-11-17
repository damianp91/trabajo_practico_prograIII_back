// Usamos express para manejar nuestras rutas
import { Router } from "express";
const router = Router();

// Importacion de middlewares
import { validateId, validatePrice } from "../middlewares/middlewares.js";
import {
  getAllProducts,
  removeProduct,
  createProduct,
  updateProduct,
  getProductById
} from "../controllers/product.controllers.js";

router.get("/", getAllProducts);
router.get("/:id", validateId, getProductById);
router.post("/", validatePrice, createProduct);
router.put("/", validatePrice, updateProduct);
router.delete("/:id", validateId, removeProduct);

export default router;
