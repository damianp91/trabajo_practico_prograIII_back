// Usamos express para manejar nuestras rutas
import { Router } from "express";
const router = Router();

// Importacion de middlewares
import {
  validateId,
  validatePrice,
  validateCategory 
} from "../middlewares/middlewares.js";
import {
  getAllProducts,
  removeProduct,
  createProduct,
  updateProduct,
  getProductById,
  getProductByCategory
} from "../controllers/product.controllers.js";

router.get("/", getAllProducts);
router.get("/:categoria/categoria", validateCategory, getProductByCategory);
router.get("/:id/producto", validateId, getProductById);
router.post("/:id/crear", validatePrice, createProduct);
router.put("/:precio/actualizar", validatePrice, updateProduct);
router.delete("/:id/eliminar", validateId, removeProduct);

export default router;
